import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { IdentityContextProvider } from "react-netlify-identity";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageScrollProvider } from "./contexts/PageScrollProvider";
import { AchievementProvider } from "./contexts/AchievementProvider";
import { GameModeProvider } from "./contexts/GameModeProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout/Layout";
import Pages from "./pages/Pages";
import PageTitle from "./components/PageTitle/PageTitle";
import "./styles/globals.scss";

if (import.meta.env.NODE_ENV !== "production") {
  let { default: axe } = await import("@axe-core/react");
  axe(React, ReactDOM, 2000);
}

const App = () => {
  const queryClient = new QueryClient();
  const url = "https://ryancanfield.netlify.app";
  return (
    <ErrorBoundary>
      <IdentityContextProvider url={url}>
        <QueryClientProvider client={queryClient}>
          <AchievementProvider>
            <GameModeProvider>
              <ThemeProvider>
                <PageScrollProvider>
                  <Layout>
                    <Router>
                      <PageTitle />
                      <Pages />
                    </Router>
                  </Layout>
                </PageScrollProvider>
              </ThemeProvider>
            </GameModeProvider>
          </AchievementProvider>
        </QueryClientProvider>
      </IdentityContextProvider>
    </ErrorBoundary>
  );
};

export default App;
