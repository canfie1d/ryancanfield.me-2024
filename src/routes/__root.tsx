import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import React, { useEffect, type ReactNode } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAchievementStore } from "~/stores/achievements";
import { IdentityProvider } from "~/contexts/IdentityContext";
import { AchievementLookupProvider } from "~/providers/AchievementLookupProvider";
import { InventoryItemsProvider } from "~/providers/InventoryItemsProvider";
import ErrorBoundary from "~/components/ErrorBoundary";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle/PageTitle";
import SiteMetaUpdater from "~/components/SiteMetaUpdater";
import "~/styles/globals.scss";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "description",
        content:
          "Seattle-based software engineering leader at ASMBL, specializing in impactful solutions with a focus on equity, accessibility, and sustainability. Beyond the code, interests include skateboarding, woodworking, and creative tinkering.",
      },
      { title: "Ryan Canfield — Seattle-based software engineering leader" },
      { property: "og:title", content: "Ryan Canfield" },
      {
        property: "og:description",
        content:
          "Seattle-based software engineering leader at ASMBL, specializing in impactful solutions with a focus on equity, accessibility, and sustainability.",
      },
      { property: "og:image", content: "https://ryancanfield.me/og-image.png" },
      { property: "og:url", content: "https://ryancanfield.me" },
      { name: "theme-color", content: "#d3d3d3" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      { rel: "preconnect", href: "https://cdn.sanity.io", crossOrigin: "anonymous" },
      // Fonts loaded async in index.html to avoid render-blocking
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const loadAchievements = useAchievementStore((store) => store.loadAchievements);

  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  useEffect(() => {
    if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
      import("@axe-core/react").then(({ default: axe }) => {
        axe(React, ReactDOM, 2000);
      });
    }
  }, []);

  return (
    <RootDocument>
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <IdentityProvider>
              <AchievementLookupProvider>
                <InventoryItemsProvider>
                  <SiteMetaUpdater />
                  <Layout>
                    <PageTitle />
                    <Outlet />
                  </Layout>
                </InventoryItemsProvider>
              </AchievementLookupProvider>
            </IdentityProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </React.StrictMode>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <form
          name="contact"
          data-netlify="{true}"
          netlify-honeypot="bot-field"
          hidden
        >
          <input
            type="text"
            name="name"
            aria-hidden="true"
          />
          <input
            type="email"
            name="email"
            aria-hidden="true"
          />
          <textarea
            name="message"
            aria-hidden="true"
          />
        </form>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
