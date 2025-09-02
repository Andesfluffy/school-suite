import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import QuickLinks from "@/components/QuickLinks";
import Showcase from "@/components/Showcase";
import DashboardOverview from "@/components/DashboardOverview";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <QuickLinks />
      <div className="mt-10 gradient-line animate" />
      <Showcase />
      <div className="mt-10 gradient-line animate" />
      <DashboardOverview />
      <CTA />
    </div>
  );
}
