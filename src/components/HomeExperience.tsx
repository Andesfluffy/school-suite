"use client";

import { useMemo } from "react";
import QuickLinks from "@/components/QuickLinks";
import DashboardOverview from "@/components/DashboardOverview";
import HomeWelcome from "@/components/HomeWelcome";
import { useAuth } from "@/components/AuthProvider";
import LandingShowcase from "@/components/LandingShowcase";

export default function HomeExperience() {
  const { status, user } = useAuth();

  const loading = useMemo(
    () => status === "initializing" || status === "authenticating",
    [status],
  );

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/20 border-t-white" aria-hidden />
          <span>{status === "authenticating" ? "Connecting to Google Workspace…" : "Confirming school access…"}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LandingShowcase />;
  }

  return (
    <div className="space-y-12">
      <HomeWelcome />
      <QuickLinks />
      <div className="gradient-line animate" />
      <DashboardOverview />
    </div>
  );
}
