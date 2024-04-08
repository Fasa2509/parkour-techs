'use client'

import { MainSection } from "@/components/MainSection";
import { SecondarySection } from "@/components/SecondarySection";


export default function LandingPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <MainSection />
        <SecondarySection />
      </main>
    </div>
  );
}
