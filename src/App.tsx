import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PageScrollProvider } from "./contexts/PageScrollProvider";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { AchievementProvider } from "./contexts/AchievementProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Pages from "./pages/Pages";
import Layout from "./components/Layout/Layout";
import PageTitle from "./components/PageTitle/PageTitle";
import ThemePanel from "./components/ThemePanel";
import "./styles/globals.scss";
import { GameModeProvider } from "./contexts/GameModeProvider";
import { IdentityContextProvider } from "react-netlify-identity";

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
