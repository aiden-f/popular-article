"use client";

import { useEffect } from "react";

/**
 * 모든 페이지 방문 시 카운트를 +1 올리는 컴포넌트.
 * layout.tsx에 배치하여 전체 페이지에 적용.
 */
export function VisitCounter() {
  useEffect(() => {
    fetch("/api/count/add", { method: "POST" }).catch(() => {
      // 통계 실패는 조용히 무시
    });
  }, []);

  return null;
}
