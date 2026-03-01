import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

const Contact = lazy(() => import("~/pages/Contact"));

export const Route = createFileRoute("/_app/contact")({
  component: Contact,
});
