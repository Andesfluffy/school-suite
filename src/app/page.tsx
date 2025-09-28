import QuickLinks from "@/components/QuickLinks";
import DashboardOverview from "@/components/DashboardOverview";
import RequireAuth from "@/components/RequireAuth";
import HomeWelcome from "@/components/HomeWelcome";

export default function Home() {
  return (
    <RequireAuth
      section="school control center"
      blurb="Authenticate with Google Workspace to open the Brand‑Stone home workspace and live operational dashboards."
    >
      <div className="space-y-12">
        <HomeWelcome />
        <QuickLinks />
        <div className="gradient-line animate" />
        <DashboardOverview />
      </div>
    </RequireAuth>
  );
}
