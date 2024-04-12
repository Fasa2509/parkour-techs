import { redirect } from "next/navigation";
import { getUserAuth } from "@/lib/auth/utils";

import { Navbar } from "@/components/Navbar";
import { SidebarMenu } from "@/components/SidebarMenu";
import { WorkersInfo } from "@/components/WorkersInfo";
import { WorkerProvider } from "@/lib/context/WorkerProvider";
import { backGetWorkers } from "@/lib/db/methods/dbBackWorker";

export default async function ManagementPage() {

    const workers = await backGetWorkers();

    const session = await getUserAuth();
    console.log({ session })
    if (!session) return redirect("/sign-in");

    return (
        <section className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 pb-8 dark:from-green-500 dark:to-green-700">
            <Navbar />
            <SidebarMenu session={session} />
            <WorkerProvider>
                <WorkersInfo session={session!} workers={workers || []} />
            </WorkerProvider>
        </section>
    )
}