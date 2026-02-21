import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { IdentityProvider } from "~/contexts/IdentityContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "~/components/ErrorBoundary";
import Pages from "~/pages/Pages";
import PageTitle from "~/components/PageTitle/PageTitle";
import Layout from "./components/Layout";
import { useAchievementStore } from "~/stores/achievements";
import "~/styles/globals.scss";

if (process.env.NODE_ENV !== "production") {
  let { default: axe } = await import("@axe-core/react");
  axe(React, ReactDOM, 2000);
}

const queryClient = new QueryClient();

const AppContent = () => {
  const loadAchievements = useAchievementStore((store) => store.loadAchievements);

  useEffect(() => {
    loadAchievements();
  }, []);

  return (
    <ErrorBoundary>
      <IdentityProvider>
        <Router>
          <Layout>
            <PageTitle />
            <Pages />
          </Layout>
        </Router>
      </IdentityProvider>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

export default App;
