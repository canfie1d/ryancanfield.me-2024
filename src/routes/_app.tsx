import { useEffect } from "react";
import { LayoutGroup } from "motion/react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { useShortcuts } from "~/hooks/useShortcuts";
import { usePageScrollStore } from "~/stores/scroll";
import PageContentArea from "~/components/PageContentArea/PageContentArea";
import PagePreview from "~/components/Preview/PagePreview";
import PageWrapper from "~/components/PageWrapper";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const setScrolled = usePageScrollStore((store) => store.setScrolled);
  const { pathname } = useLocation();
  useShortcuts();

  useEffect(() => {
    setScrolled(false);
  }, [pathname, setScrolled]);

  const renderLayout = () => {
    if (pathname === "/about") {
      return (
        <>
          <PageWrapper
            pageName="about"
            initial={false}
            isCurrent
          >
            <PageContentArea pageName="about" />
          </PageWrapper>
          <PageWrapper pageName="work">
            <PagePreview pageName="work" />
          </PageWrapper>
          <PageWrapper pageName="writing">
            <PagePreview pageName="writing" />
          </PageWrapper>
          <PageWrapper pageName="contact">
            <PagePreview pageName="contact" />
          </PageWrapper>
        </>
      );
    }
    if (pathname === "/work" || pathname.startsWith("/work/")) {
      return (
        <>
          <PageWrapper pageName="about">
            <PagePreview pageName="about" />
          </PageWrapper>
          <PageWrapper
            pageName="work"
            initial={false}
            isCurrent
          >
            <PageContentArea pageName="work" />
          </PageWrapper>
          <PageWrapper pageName="writing">
            <PagePreview pageName="writing" />
          </PageWrapper>
          <PageWrapper pageName="contact">
            <PagePreview pageName="contact" />
          </PageWrapper>
        </>
      );
    }
    if (pathname === "/writing") {
      return (
        <>
          <PageWrapper pageName="about">
            <PagePreview pageName="about" />
          </PageWrapper>
          <PageWrapper pageName="work">
            <PagePreview pageName="work" />
          </PageWrapper>
          <PageWrapper
            pageName="writing"
            initial={false}
            isCurrent
          >
            <PageContentArea pageName="writing" />
          </PageWrapper>
          <PageWrapper pageName="contact">
            <PagePreview pageName="contact" />
          </PageWrapper>
        </>
      );
    }
    if (pathname === "/contact") {
      return (
        <>
          <PageWrapper pageName="about">
            <PagePreview pageName="about" />
          </PageWrapper>
          <PageWrapper pageName="work">
            <PagePreview pageName="work" />
          </PageWrapper>
          <PageWrapper pageName="writing">
            <PagePreview pageName="writing" />
          </PageWrapper>
          <PageWrapper
            pageName="contact"
            initial={false}
            isCurrent
          >
            <PageContentArea pageName="contact" />
          </PageWrapper>
        </>
      );
    }
    if (pathname === "/journey-to-eryndor") {
      return (
        <PageWrapper
          pageName="journey-to-eryndor"
          isCurrent
        >
          <PageContentArea pageName="journey-to-eryndor" />
        </PageWrapper>
      );
    }
    if (pathname === "/6374" || pathname === "/⓺⓷⓻⓸") {
      return <Outlet />;
    }
    // Home: all previews
    return (
      <>
        <PageWrapper
          pageName="about"
          isHome
        >
          <PagePreview pageName="about" />
        </PageWrapper>
        <PageWrapper
          pageName="work"
          isHome
        >
          <PagePreview pageName="work" />
        </PageWrapper>
        <PageWrapper
          pageName="writing"
          isHome
        >
          <PagePreview pageName="writing" />
        </PageWrapper>
        <PageWrapper
          pageName="contact"
          isHome
        >
          <PagePreview pageName="contact" />
        </PageWrapper>
      </>
    );
  };

  return <LayoutGroup>{renderLayout()}</LayoutGroup>;
}
