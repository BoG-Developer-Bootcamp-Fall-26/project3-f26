import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import TrainingLogForm from "@/components/TrainingLogForm";

export default function NewTrainingLogPage() {
    return (
        <DashboardLayout>
            <PageHeader title="Training logs" />
            <div className="p-4 md:p-8">
                <TrainingLogForm />
            </div>
        </DashboardLayout>
    );
}
