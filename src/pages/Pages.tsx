import { Suspense, lazy, useEffect, useMemo } from "react";
import { LayoutGroup } from "motion/react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { useShortcuts } from "~/hooks/useShortcuts";
import { usePageScrollStore } from "~/stores/scroll";
import PagePreview from "~/components/Preview/PagePreview";
import PageWrapper from "~/components/PageWrapper";
import NotFound from "~/pages/NotFound";

const About = lazy(() => import("./About"));
const Work = lazy(() => import("./Work"));
const Writing = lazy(() => import("./Writing"));
const Contact = lazy(() => import("./Contact"));
const CaseStudy = lazy(() => import("./CaseStudy"));
const JourneyToEryndor = lazy(() => import("./JourneysEnd"));
const StudioPage = lazy(() => import("./Studio"));

const Page = () => {
  const setScrolled = usePageScrollStore((store) => store.setScrolled);
  const { pathname } = useLocation();
  useShortcuts();

  useEffect(() => {
    setScrolled(false);
  }, [pathname]);

  const layout = () => {
    if (pathname === "/about") {
      return (
        <>
          <PageWrapper pageName="about" initial={false} isCurrent>
            <Suspense
              fallback={<PagePreview key="about" pageName="about" hideAll />}
            >
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
    }
    if (pathname === "/work" || pathname.startsWith("/work/")) {
      return (
        <>
          <PageWrapper pageName="about">
            <PagePreview pageName="about" />
          </PageWrapper>
          <PageWrapper pageName="work" initial={false} isCurrent>
            <Suspense
              fallback={<PagePreview key="work" pageName="work" hideAll />}
            >
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
            <PageWrapper pageName="writing" initial={false} isCurrent>
              <Suspense
                fallback={
                  <PagePreview key="writing" pageName="writing" hideAll />
                }
              >
                <Writing key="writing" />
              </Suspense>
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
            <PageWrapper pageName="contact" initial={false} isCurrent>
              <Suspense
                fallback={
                  <PagePreview key="contact" pageName="contact" hideAll />
                }
              >
                <Contact key="contact" />
              </Suspense>
            </PageWrapper>
          </>
        );
    }
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
  };

  return useMemo(() => <LayoutGroup>{layout()}</LayoutGroup>, [pathname]);
};

const CaseStudyRoute = () => {
  const { id } = useParams<{ id: string }>();
  return id ? <CaseStudy id={id} /> : null;
};

const LorePage = () => {
  return (
    <PageWrapper pageName="journey-to-eryndor" isCurrent>
      <Suspense
        fallback={
          <PagePreview key="journey-to-eryndor" pageName="journey-to-eryndor" hideAll />
        }
      >
        <JourneyToEryndor />
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
        <Route path=":id" element={<CaseStudyRoute />} />
      </Route>
      <Route path="/writing" element={<Page />} />
      <Route path="/contact" element={<Page />} />
      <Route path="/journey-to-eryndor" element={<LorePage />} />
      <Route path="/studio/*" element={
        <Suspense fallback={null}>
          <StudioPage />
        </Suspense>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
