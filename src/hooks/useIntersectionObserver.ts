import { useEffect, useState } from "react";

export const useIntersectionObserver = (
  el?: HTMLDivElement | HTMLPreElement | null
): boolean => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is in view
          setIsVisible(true);
        } else {
          // Element is out of view
          setIsVisible(false);
        }
      });
    });

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [el]);

  return isVisible;
};
