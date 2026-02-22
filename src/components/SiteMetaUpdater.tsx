import { useEffect } from "react";
import { useSiteSettings } from "~/hooks/useSanityContent";

/**
 * Updates document title and meta tags from Sanity siteSettings.
 * Runs client-side after siteSettings loads.
 */
export default function SiteMetaUpdater() {
  const { data } = useSiteSettings();
  const settings = data as
    | {
        siteTitle?: string;
        metaDescription?: string;
        ogTitle?: string;
        ogDescription?: string;
        ogUrl?: string;
        ogImageUrl?: string;
      }
    | undefined;

  useEffect(() => {
    if (typeof document === "undefined" || !settings) return;

    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    if (settings.metaDescription) setMeta("description", settings.metaDescription);
    if (settings.ogTitle) setMeta("og:title", settings.ogTitle, true);
    if (settings.ogDescription) setMeta("og:description", settings.ogDescription, true);
    if (settings.ogUrl) setMeta("og:url", settings.ogUrl, true);
    if (settings.ogImageUrl) {
      setMeta("og:image", settings.ogImageUrl, true);
    }
  }, [settings]);

  return null;
}
