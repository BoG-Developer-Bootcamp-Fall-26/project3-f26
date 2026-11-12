import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import TrainingLogForm from "@/components/TrainingLogForm";
import type { TrainingLog } from "@/utils/types";

export default function EditTrainingLogPage() {
    const router = useRouter();
    const { id } = router.query;
    const [log, setLog] = useState<TrainingLog | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;
        fetch(`/api/training?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setLog(data);
                }
            })
            .catch(() => setError("Could not load this training log"));
    }, [id]);

    return (
        <DashboardLayout>
            <PageHeader title="Edit training log" />
            <div className="p-4 md:p-8">
                {error && <p className="text-red-600">{error}</p>}
                {log && <TrainingLogForm log={log} />}
            </div>
        </DashboardLayout>
    );
}