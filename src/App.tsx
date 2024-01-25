import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { PageScrollProvider } from "./contexts/PageScrollProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Pages from "./pages/Pages";
import Layout from "./components/Layout";
import PageTitle from "./components/PageTitle";
import ThemeMenu from "./components/ThemeMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/globals.scss";

if (process.env.NODE_ENV !== "production") {
  let { default: axe } = await import("@axe-core/react");
  axe(React, ReactDOM, 2000);
}

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <PageScrollProvider>
            <Layout>
              <Router>
                <PageTitle />
                <Pages />
                <ThemeMenu />
              </Router>
            </Layout>
          </PageScrollProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
