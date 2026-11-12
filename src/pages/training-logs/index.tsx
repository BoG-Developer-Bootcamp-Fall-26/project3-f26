import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import TrainingLogCard from "@/components/TrainingLogCard";
import { useUser } from "@/hooks/useUser";
import type { TrainingLog } from "@/utils/types";

export default function TrainingLogsPage() {
    const { user } = useUser();
    const [logs, setLogs] = useState<TrainingLog[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;
        fetch(`/api/training?user=${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setLogs(data);
                }
            })
            .catch(() => setError("Could not load training logs"));
    }, [user]);

    return (
        <DashboardLayout>
            <PageHeader title="Training logs" createLink="/training-logs/new" />
            <div className="flex flex-col gap-4 p-4 md:p-8">
                {error && <p className="text-red-600">{error}</p>}
                {logs.length === 0 && <p className="text-gray-500">No training logs to show.</p>}
                {logs.map((log) => (
                    <TrainingLogCard key={log._id} log={log} />
                ))}
            </div>
        </DashboardLayout>
    );
}
