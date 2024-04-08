
import { Navbar } from "@/components/Navbar";
import { WorkersInfo } from "@/components/WorkersInfo";
import { getUserAuth } from "@/lib/auth/utils";
import { WorkerProvider } from "@/lib/context/WorkerProvider";
import { backGetWorkers } from "@/lib/db/methods/dbBackWorker";

export default async function ManagementPage() {
    const workers = await backGetWorkers();

    return (
        <section className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 pb-8">
            <Navbar />
            <WorkerProvider>
                <WorkersInfo workers={workers || []} />
            </WorkerProvider>
        </section>
    )
}