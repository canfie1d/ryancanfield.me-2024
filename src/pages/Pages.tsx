import { lazy } from "react";
import { LayoutGroup } from "framer-motion";
import { Routes, Route, Link } from "react-router-dom";
import ThemeMenu from "../components/ThemeMenu";

const About = lazy(() => import("./About"));
const Work = lazy(() => import("./Work"));
const Writing = lazy(() => import("./Writing"));
const Contact = lazy(() => import("./Contact"));
const FreightWeb = lazy(() => import("./FreightWeb"));
const Xinova = lazy(() => import("./Xinova"));
const Carnival = lazy(() => import("./Carnival"));

const Page = ({ isHome }: { isHome?: boolean }) => {
  return (
    <>
      <LayoutGroup>
        <About key="about" />
        <Work key="work" />
        <Writing key="writing" />
        <Contact key="contact" />
      </LayoutGroup>
      {isHome ? (
        <h1 className="pageTitle">
          Ryan Canfield
          <span>Hands-in-code Engineering Leadership</span>
        </h1>
      ) : (
        <Link to="/" className="pageTitle pageTitleHidden">
          Ryan Canfield
        </Link>
      )}
      <ThemeMenu />
    </>
  );
};

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Page isHome />} />
      <Route path="/about" element={<Page />} />
      <Route path="/work" element={<Page />}>
        <Route path="freightweb" element={<FreightWeb />} />
        <Route path="xinova" element={<Xinova />} />
        <Route path="carnival" element={<Carnival />} />
      </Route>
      <Route path="/writing" element={<Page />} />
      <Route path="/contact" element={<Page />} />
    </Routes>
  );
};

export default Pages;
