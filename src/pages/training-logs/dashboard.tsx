import { useEffect, useState } from "react";
import SharedLayout from "@/components/layout/SharedLayout";
import TrainingLogCard from "@/components/training-logs/TrainingLogCard";
import CreateNewLink from "@/components/ui/CreateNewLink";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useRequireCurrentUser } from "@/hooks/useRequireCurrentUser";
import { fetchTrainingLogsForUser } from "@/lib/api/trainingLogs";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { routes } from "@/lib/routes";
import type { TrainingLogWithDetails } from "@/types/models";

export default function TrainingLogsPage() {
  const currentUser = useRequireCurrentUser();
  const userId = currentUser?.userId;

  const [logs, setLogs] = useState<TrainingLogWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function loadLogs(forUserId: string) {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const fetchedLogs = await fetchTrainingLogsForUser(forUserId);
        setLogs(sortNewestFirst(fetchedLogs));
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    loadLogs(userId);
  }, [userId]);

  if (!currentUser) {
    return null;
  }

  const visibleLogs = logs.filter((log) => log.title.toLowerCase().includes(searchText.trim().toLowerCase()));

  return (
    <SharedLayout
      pageTitle="Training logs"
      headerAction={<CreateNewLink href={routes.newTrainingLog} />}
      onSearchChange={setSearchText}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
        {isLoading && <p className="text-sm text-gray-500">Loading training logs...</p>}

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {!isLoading && !errorMessage && visibleLogs.length === 0 && (
          <p className="text-sm text-gray-500">
            {logs.length === 0 ? "No training logs yet. Click \"Create new\" to add one." : "No training logs match your search."}
          </p>
        )}

        {visibleLogs.map((log) => (
          <TrainingLogCard key={log._id} log={log} />
        ))}
      </div>
    </SharedLayout>
  );
}

function sortNewestFirst(logs: TrainingLogWithDetails[]): TrainingLogWithDetails[] {
  return [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
