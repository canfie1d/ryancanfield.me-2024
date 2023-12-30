import { lazy } from "react";
import { LayoutGroup } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { useShortcuts } from "../hooks/useShortcuts";

const About = lazy(() => import("./About"));
const Work = lazy(() => import("./Work"));
const Writing = lazy(() => import("./Writing"));
const Contact = lazy(() => import("./Contact"));
const CaseStudy = lazy(() => import("./CaseStudy"));

const Page = () => {
  useShortcuts();

  return (
    <>
      <LayoutGroup>
        <About key="about" />
        <Work key="work" />
        <Writing key="writing" />
        <Contact key="contact" />
      </LayoutGroup>
    </>
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
    </Routes>
  );
};

export default Pages;
