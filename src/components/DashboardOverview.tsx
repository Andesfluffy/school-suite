"use client";

import { useEffect, useState } from "react";
import FinancialChart from "@/components/FinancialChart";

type OverviewResponse = {
  students: number;
  staff: number;
  financials: { month: string; income: number; expense: number }[];
};

type OverviewState =
  | { status: "loading" }
  | { status: "ready"; data: OverviewResponse }
  | { status: "error"; message: string };

const numberFormatter = new Intl.NumberFormat();

export default function DashboardOverview() {
  const [state, setState] = useState<OverviewState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    async function loadOverview() {
      try {
        const response = await fetch("/api/dashboard/overview", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Unable to load dashboard metrics");
        }
        const json = (await response.json()) as OverviewResponse;
        if (!controller.signal.aborted) {
          setState({ status: "ready", data: json });
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message:
            error instanceof Error ? error.message : "Unexpected error loading dashboard",
        });
      }
    }

    loadOverview();

    return () => {
      controller.abort();
    };
  }, []);

  const chartData = state.status === "ready" ? state.data.financials : [];

  if (state.status === "error") {
    return (
      <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-red-200">
        <p className="font-medium text-red-100">We couldn&apos;t load your school snapshot.</p>
        <p className="mt-1 text-red-200/80">{state.message}. Please refresh to try again.</p>
      </section>
    );
  }

  const students = state.status === "ready" ? state.data.students : undefined;
  const staff = state.status === "ready" ? state.data.staff : undefined;

  return (
    <section className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="card p-5">
        <div className="text-sm text-white/70">Students</div>
        {students === undefined ? (
          <div className="mt-3 h-8 w-24 animate-pulse rounded-full bg-white/10" />
        ) : (
          <div className="text-2xl font-semibold">{numberFormatter.format(students)}</div>
        )}
      </div>
      <div className="card p-5">
        <div className="text-sm text-white/70">Staff</div>
        {staff === undefined ? (
          <div className="mt-3 h-8 w-24 animate-pulse rounded-full bg-white/10" />
        ) : (
          <div className="text-2xl font-semibold">{numberFormatter.format(staff)}</div>
        )}
      </div>
      <div className="card p-5">
        <div className="text-sm text-white/70">Financials (12‑mo)</div>
        <div className="mt-2 h-40">
          {state.status === "ready" ? (
            <FinancialChart data={chartData} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="h-10 w-full animate-pulse rounded-xl bg-white/10" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
