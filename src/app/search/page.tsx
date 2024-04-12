import { Navbar } from "@/components/Navbar";
import { SearchWorker } from "@/components/SearchWorker";
import { SidebarMenu } from "@/components/SidebarMenu";
import { getUserAuth } from "@/lib/auth/utils";

export default async function SearchPage() {

    const session = await getUserAuth();

    return (
        <section className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 pb-8 dark:from-green-500 dark:to-green-700">
            <Navbar />
            <SidebarMenu session={session} />
            <SearchWorker />
        </section>
    )
};
