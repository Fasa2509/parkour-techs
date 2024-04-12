import { MainSection } from "@/components/MainSection";
import { SecondarySection } from "@/components/SecondarySection";
import { SidebarMenu } from "@/components/SidebarMenu";
import { getUserAuth } from "@/lib/auth/utils";


export default async function LandingPage() {
  const session = await getUserAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <SidebarMenu session={session} />
        <MainSection session={session} />
        <SecondarySection />
      </main>
    </div>
  );
};
