import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Pages from "./pages/Pages";
import Layout from "./components/Layout";
import PageTitle from "./components/PageTitle";
import ThemeMenu from "./components/ThemeMenu";
import "./styles/globals.scss";

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
