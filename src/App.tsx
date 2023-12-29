import { BrowserRouter as Router } from "react-router-dom";
import Pages from "./pages/Pages";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/useThemeProvider";
import "./styles/globals.scss";
import React from "react";
import ReactDOM from "react-dom";
import PageTitle from "./components/PageTitle";
import ThemeMenu from "./components/ThemeMenu";

if (process.env.NODE_ENV !== "production") {
  let { default: axe } = await import("@axe-core/react");
  axe(React, ReactDOM, 2000);
}

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Layout>
          <Router>
            <Pages />
            <PageTitle />
            <ThemeMenu />
          </Router>
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
