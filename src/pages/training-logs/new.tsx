import { useState } from "react";
import { useRouter } from "next/router";
import SharedLayout from "@/components/layout/SharedLayout";
import TrainingLogForm, { type TrainingLogFormValues } from "@/components/training-logs/TrainingLogForm";
import { useRequireCurrentUser } from "@/hooks/useRequireCurrentUser";
import { createTrainingLog } from "@/lib/api/trainingLogs";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { routes } from "@/lib/routes";

export default function NewTrainingLogPage() {
  const router = useRouter();
  const currentUser = useRequireCurrentUser();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentUser) {
    return null;
  }

  const handleSubmit = async (values: TrainingLogFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await createTrainingLog({
        user: currentUser.userId,
        animal: values.animalId,
        title: values.title,
        description: values.description,
        hours: values.hours,
        date: new Date().toISOString(),
      });
      router.push(routes.trainingLogs);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(routes.trainingLogs);
  };

  return (
    <SharedLayout pageTitle="Training logs">
      <TrainingLogForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
      />
    </SharedLayout>
  );
}
