'use client';

import { formatComma } from '@/lib/utils';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import axios from 'axios';

interface CoupangProduct {
  productName: string;
  productImage: string;
  productPrice: number;
  productUrl: string;
}

export const VerticlaSearchCoupangBanner = ({ keyword, condition }: { keyword: string, condition?: string }) => {
  const [banners, setBanners] = useState<CoupangProduct[]>([]);
  const [landingUrl, setLandingUrl] = useState("https://www.coupang.com");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when the banner is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only load once
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchBanners = async () => {
      // Only fetch if keyword exists AND component is visible in viewport
      if (!keyword || !isVisible) return;

      setLoading(true);
      try {
        const response = await axios.get(`/api/coupang/search?keyword=${encodeURIComponent(keyword)}`);
        if (isMounted) {
          if (response.data?.data?.productData) {
            setBanners(response.data.data.productData);
            setLandingUrl(response.data.data.landingUrl || "https://www.coupang.com");
          } else {
            setBanners([]);
          }
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Coupang fetch error:", err);
          setError("데이터를 불러오지 못했습니다.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBanners();
    return () => { isMounted = false; };
  }, [keyword, isVisible]);

  const displayBanners = useMemo(() => {
    if (!banners || banners.length === 0) return [];
    if (!condition) return banners;

    const conditionWords = condition.split(' ').filter(word => word.trim().length > 0);

    return [...banners].sort((a: any, b: any) => {
      const getMatchCount = (productName: string) => {
        if (!productName) return 0;
        return conditionWords.reduce((count, word) => {
          return count + (productName.includes(word) ? 1 : 0);
        }, 0);
      };

      const aCount = getMatchCount(a?.productName);
      const bCount = getMatchCount(b?.productName);

      return bCount - aCount;
    });
  }, [banners, condition]);

  if (!isVisible || loading) {
    return (
      <div ref={containerRef} className="mb-8 w-full">
        <div className="h-6 w-[120px] bg-slate-100 rounded animate-pulse mb-4" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 w-[160px] h-[220px] bg-slate-50 border border-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || banners.length === 0) return null;

  return (
    <div className="mb-8 w-full">
      <div className='flex flex-col items-center justify-between mb-4 gap-3'>
        <div className='flex items-center gap-3'>
          <div className='text-[16px] font-bold text-slate-900'>
            {'실시간 추천 상품'}
          </div>
        </div>
        <a className='flex items-center cursor-pointer group'
          href={landingUrl}
          target='_blank'
          rel="noopener noreferrer"
        >
          <div className="text-gray-500 text-[12px] font-bold rounded transform">
            COUPANG
          </div>
          <span className='text-[12px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors'>{'에서 더보기'}</span>
        </a>
      </div>
      <div className=''>
        <div className="flex flex-wrap gap-4 pb-2">
          {displayBanners?.map((item: any, index: number) => (
            <a
              key={index}
              href={item.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group w-[160px] flex flex-col border border-slate-100 p-4 bg-white rounded-2xl hover:border-indigo-100 hover:bg-slate-50/50 transition-all"
            >
              <div className='flex justify-center items-center bg-slate-50 rounded-xl mb-3 overflow-hidden aspect-square h-[120px] w-full'>
                <img
                  src={item.productImage}
                  alt={item.productName || '광고 배너'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className='text-[13px] font-medium line-clamp-2 mb-2 text-slate-800 min-h-[40px] leading-relaxed'>
                {item.productName}
              </div>
              <div className='mt-auto flex items-end justify-end'>
                <span className='text-[15px] font-bold text-slate-950'>{formatComma(item.productPrice)}</span>
                <span className='text-slate-400 text-[11px] font-medium ml-0.5 mb-0.5 tracking-tight'>{'원'}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
