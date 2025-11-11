"use client";
import { useEffect, useState } from "react";

// 6 для ≥1440, 4 для <1440 (планшет/мобайл)
export function useResponsivePerPage() {
  const [perPage, setPerPage] = useState<4 | 6>(6);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1440px)");

    const compute = () => setPerPage(mqDesktop.matches ? 6 : 4);
    compute();

    mqDesktop.addEventListener("change", compute);
    return () => mqDesktop.removeEventListener("change", compute);
  }, []);

  return perPage;
}