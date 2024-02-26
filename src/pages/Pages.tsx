import { Suspense, lazy, useEffect } from "react";
import { LayoutGroup } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { useShortcuts } from "../hooks/useShortcuts";
import { usePageScrollContext } from "../contexts/PageScrollProvider";
import PagePreview from "../components/Preview/PagePreview";
import PageWrapper from "../components/PageWrapper";
import NotFound from "./NotFound";

const About = lazy(() => import("./About"));
const Work = lazy(() => import("./Work"));
const Writing = lazy(() => import("./Writing"));
const Contact = lazy(() => import("./Contact"));
const CaseStudy = lazy(() => import("./CaseStudy"));
const JourneysEnd = lazy(() => import("./JourneysEnd"));

const Page = () => {
  const { setScrolled } = usePageScrollContext();
  const { pathname } = useLocation();
  useShortcuts();

  useEffect(() => {
    setScrolled(false);
  }, [pathname]);

  const layout = () => {
    switch (pathname) {
      case "/about":
        return (
          <>
            <PageWrapper pageName="about" initial={false} isCurrent>
              <Suspense fallback={<PagePreview key="about" pageName="about" />}>
                <About key="about" />
              </Suspense>
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
      case "/work":
      case "/work/freightweb":
      case "/work/xinova":
      case "/work/princess":
        return (
          <>
            <PageWrapper pageName="about">
              <PagePreview pageName="about" />
            </PageWrapper>
            <PageWrapper pageName="work" initial={false} isCurrent>
              <Suspense fallback={<PagePreview key="work" pageName="work" />}>
                <Work key="work" />
              </Suspense>
            </PageWrapper>
            <PageWrapper pageName="writing">
              <PagePreview pageName="writing" />
            </PageWrapper>
            <PageWrapper pageName="contact">
              <PagePreview pageName="contact" />
            </PageWrapper>
          </>
        );
      case "/writing":
        return (
          <>
            <PageWrapper pageName="about">
              <PagePreview pageName="about" />
            </PageWrapper>
            <PageWrapper pageName="work">
              <PagePreview pageName="work" />
            </PageWrapper>
            <PageWrapper pageName="writing" initial={false} isCurrent>
              <Suspense
                fallback={<PagePreview key="writing" pageName="writing" />}
              >
                <Writing key="writing" />
              </Suspense>
            </PageWrapper>
            <PageWrapper pageName="contact">
              <PagePreview pageName="contact" />
            </PageWrapper>
          </>
        );
      case "/contact":
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
            <PageWrapper pageName="contact" initial={false} isCurrent>
              <Suspense
                fallback={<PagePreview key="contact" pageName="contact" />}
              >
                <Contact key="contact" />
              </Suspense>
            </PageWrapper>
          </>
        );
      case "/":
      default:
        return (
          <>
            <PageWrapper pageName="about" isHome>
              <PagePreview pageName="about" />
            </PageWrapper>
            <PageWrapper pageName="work" isHome>
              <PagePreview pageName="work" />
            </PageWrapper>
            <PageWrapper pageName="writing" isHome>
              <PagePreview pageName="writing" />
            </PageWrapper>
            <PageWrapper pageName="contact" isHome>
              <PagePreview pageName="contact" />
            </PageWrapper>
          </>
        );
    }
  };

  return <LayoutGroup>{layout()}</LayoutGroup>;
};

const LorePage = () => {
  return (
    <PageWrapper pageName="journeys-end" isCurrent>
      <Suspense
        fallback={<PagePreview key="journeys-end" pageName="journeys-end" />}
      >
        <JourneysEnd />
      </Suspense>
    </PageWrapper>
  );
};

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/about" element={<Page />} />
      <Route path="/work" element={<Page />}>
        <Route
          path="/work/freightweb"
          element={<CaseStudy id="freightweb" />}
        />
        <Route path="/work/xinova" element={<CaseStudy id="xinova" />} />
        <Route path="/work/princess" element={<CaseStudy id="princess" />} />
      </Route>
      <Route path="/writing" element={<Page />} />
      <Route path="/contact" element={<Page />} />
      <Route path="/journeys-end" element={<LorePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
