"use client";

import { useEffect, useRef } from "react";

export default function ScrollWrapper({ children }: { children: React.ReactNode }) {
  const scrolledRef = useRef(false);

  useEffect(() => {
    if (!scrolledRef.current) {
      scrolledRef.current = true;

      // Disable scroll restoration
      if (window.history.scrollRestoration) {
        window.history.scrollRestoration = "manual";
      }

      // Force scroll to top multiple times
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      scrollToTop();

      // Keep trying for a short period
      const intervals = [50, 100, 200, 300];
      intervals.forEach(delay => {
        setTimeout(scrollToTop, delay);
      });
    }
  }, []);

  return <>{children}</>;
}
