
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { WorkersInfo } from "@/components/WorkersInfo";
import { getUserAuth } from "@/lib/auth/utils";
import { WorkerProvider } from "@/lib/context/WorkerProvider";
import { backGetWorkers } from "@/lib/db/methods/dbBackWorker";

export default async function ManagementPage() {

    const workers = await backGetWorkers();

    const session = await getUserAuth();

    return (
        <section className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 pb-8">
            <Navbar />
            {/* <Sidebar /> */}
            <WorkerProvider>
                <WorkersInfo session={session!} workers={workers || []} />
            </WorkerProvider>
        </section>
    )
}