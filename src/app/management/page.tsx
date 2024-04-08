
import { Navbar } from "@/components/Navbar";
import { columns } from "@/components/column";
import { DataTable } from "@/components/data-table";
import { CreateWorkerForm } from "@/components/forms/CreateWorkerForm";
import { backGetWorkers } from "@/lib/db/methods/dbBackWorker";

export default async function ManagementPage() {
    const workers = await backGetWorkers();

    return (
        <section className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 pb-8">
            <Navbar />
            <div className="mx-2 md:mx-8 lg:mx-10 flex flex-col gap-8">
                <div className="flex-1 flex flex-col md:flex-row gap-6 justify-evenly">
                    <CreateWorkerForm />
                    <div className="bg-white p-4 md:py-6 md:px-8 flex-1 rounded-md max-w-[600px] flex flex-col gap-6 justify-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-center text-sky-500">Lorem Ipsum</h2>
                        <p className="text-neutral-700 md:text-xl lg:text-base xl:text-xl md:text-justify">Quis ipsum sit cillum sunt amet eiusmod. Tempor esse aute esse aliquip. Culpa deserunt officia proident occaecat consequat dolor irure aute ut consequat sunt. Culpa excepteur sunt irure eu dolore ad excepteur magna elit consectetur. Magna fugiat duis nisi sunt. Lorem amet mollit fugiat labore cillum. Sit consequat laboris ex fugiat fugiat.</p>
                        <p className="text-neutral-700 md:text-xl lg:text-base xl:text-xl md:text-justify">Id dolore ut dolor mollit enim dolor. Qui ad adipisicing id et. Commodo occaecat commodo laborum et consectetur tempor veniam in esse sit magna nostrud in. Culpa deserunt officia proident occaecat consequat dolor irure aute ut consequat sunt. Magna fugiat duis nisi sunt.</p>
                    </div>
                </div>
                <div className="bg-white rounded-md">
                    {workers && <DataTable columns={columns} data={workers} />}
                </div>
            </div>
        </section>
    )
}