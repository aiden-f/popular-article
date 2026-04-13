import { NextResponse } from 'next/server';
import axios from 'axios';
import moment from 'moment';
import crypto from 'crypto';

const ACCESS_KEY = '5ada7b7d-ae97-438f-9b55-6370aef9d3c2';
const SECRET_KEY = 'd89563f7bb95aa155890d76bccdc4ff3ec5c6f63';

function generateHmac(method: string, url: string, secretKey: string, accessKey: string) {
    const parts = url?.split(/\?/);
    const [path, query = ''] = parts;

    const datetime = moment.utc().format('YYMMDD[T]HHmmss[Z]');
    const message = datetime + method + path + query;

    const signature = crypto.createHmac('sha256', secretKey).update(message).digest('hex');

    return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${datetime}, signature=${signature}`;
}

// In-memory cache
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');

    if (!keyword) {
        return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    // Check cache
    const cached = cache.get(keyword);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log('================== 캐시 HIT')
        return NextResponse.json(cached.data);
    }

    console.log('================== 쿠팡 API 호출')

    const limit = 10;
    const subId = 'mongsengWeb';
    const imageSize = '240x240';
    const srpLinkOnly = false;
    const encodeKeyword = encodeURIComponent(keyword);

    const callUrl = `/v2/providers/affiliate_open_api/apis/openapi/products/search?keyword=${encodeKeyword}&limit=${limit}&imageSize=${imageSize}&srpLinkOnly=${srpLinkOnly}&subId=${subId}`;
    const authorization = generateHmac('GET', callUrl, SECRET_KEY, ACCESS_KEY);

    try {
        const response = await axios.request({
            method: 'GET',
            url: `https://api-gateway.coupang.com/${callUrl}`,
            headers: { Authorization: authorization }
        });

        // Update cache
        cache.set(keyword, { data: response.data, timestamp: Date.now() });

        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error(err.response?.data || err.message);
        return NextResponse.json({ error: 'Failed to fetch from Coupang' }, { status: 500 });
    }
}
