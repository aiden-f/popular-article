import { NextResponse } from 'next/server';
import { GRAPHQL_ENDPOINT } from '@/lib/constants';

/**
 * GraphQL API 호출을 위한 Route Handler 템플릿
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const body = await request.json().catch(() => ({}));

        const keyword = searchParams.get('keyword') || body.keyword;
        console.log('keyword : ', keyword)

        const query = `
            query getPopularSearchCoupangBanners($keyword: String!) {
                getPopularSearchCoupangBanners(keyword: $keyword)
            }
        `;

        const variables = {
            keyword: keyword
        };

        // GraphQL 서버로 요청 전송
        const response = await fetch(GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const result = await response.json();

        // GraphQL 에러 응답 처리
        if (result.errors) {
            return NextResponse.json({
                success: false,
                errors: result.errors
            }, { status: 400 });
        }

        // 성공 응답 반환
        return NextResponse.json({
            success: true,
            data: result.data.getPopularSearchCoupangBanners.data
        });

    } catch (error) {
        console.error('GraphQL Proxy Error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal Server Error'
        }, { status: 500 });
    }
}
