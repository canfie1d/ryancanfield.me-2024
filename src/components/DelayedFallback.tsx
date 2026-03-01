import { ReactNode, useEffect, useState } from "react";

const LOADING_DELAY_MS = 200;

/**
 * Delays rendering children by 200ms. If unmounted before the delay (e.g. content
 * loaded quickly), children are never shown—preventing loader flash on fast loads.
 */
const DelayedFallback = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), LOADING_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return show ? <>{children}</> : null;
};

export default DelayedFallback;
