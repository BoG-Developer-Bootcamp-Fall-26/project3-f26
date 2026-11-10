import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormField from "@/components/ui/FormField";
import TextArea from "@/components/ui/TextArea";
import TextInput from "@/components/ui/TextInput";

export interface TrainingLogFormValues {
  title: string;
  animalId: string;
  hours: number;
  description: string;
}

interface TrainingLogFormProps {
  initialValues?: TrainingLogFormValues;
  onSubmit: (values: TrainingLogFormValues) => void;
  onCancel: () => void;
  errorMessage: string | null;
  isSubmitting: boolean;
}

export default function TrainingLogForm({
  initialValues,
  onSubmit,
  onCancel,
  errorMessage,
  isSubmitting,
}: TrainingLogFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [animalId, setAnimalId] = useState(initialValues?.animalId ?? "");
  const [hoursText, setHoursText] = useState(initialValues ? String(initialValues.hours) : "");
  const [description, setDescription] = useState(initialValues?.description ?? "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      title: title.trim(),
      animalId: animalId.trim(),
      hours: Number(hoursText),
      description: description.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <FormField label="Title" htmlFor="title">
        <TextInput
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
      </FormField>

      <FormField label="Animal ID" htmlFor="animalId">
        <TextInput
          id="animalId"
          value={animalId}
          onChange={(event) => setAnimalId(event.target.value)}
          placeholder="Paste the animal's ID"
          required
        />
      </FormField>

      <FormField label="Hours trained" htmlFor="hours">
        <TextInput
          id="hours"
          type="number"
          min={0}
          step={0.5}
          value={hoursText}
          onChange={(event) => setHoursText(event.target.value)}
          placeholder="0"
          required
        />
      </FormField>

      <FormField label="Note" htmlFor="description">
        <TextArea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Note"
          required
        />
      </FormField>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <div className="flex gap-4 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
