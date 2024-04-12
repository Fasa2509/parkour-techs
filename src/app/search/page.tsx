import { Navbar } from "@/components/Navbar";
import { SearchWorker } from "@/components/SearchWorker";

export default function SearchPage() {

    return (
        <section className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 pb-8">
            <Navbar />
            <SearchWorker />
        </section>
    )
};
