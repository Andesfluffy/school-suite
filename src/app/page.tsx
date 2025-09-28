import Hero from "@/components/Hero";
import QuickLinks from "@/components/QuickLinks";
import Showcase from "@/components/Showcase";
import DashboardOverview from "@/components/DashboardOverview";
import CTA from "@/components/CTA";
import DeliveryPlan from "@/components/DeliveryPlan";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <QuickLinks />
      <div className="mt-10 gradient-line animate" />
      <Showcase />
      <DeliveryPlan />
      <div className="mt-10 gradient-line animate" />
      <DashboardOverview />
      <CTA />
    </div>
  );
}
