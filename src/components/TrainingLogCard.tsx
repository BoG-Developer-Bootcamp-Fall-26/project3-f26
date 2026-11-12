import Image from "next/image";
import Link from "next/link";
import type { TrainingLog } from "@/utils/types";
import editButton from "../../public/images/trainingLogCardEditButton.png";

export default function TrainingLogCard({
    log,
    editLink,
    onDelete,
}: {
    log: TrainingLog;
    editLink?: string;
    onDelete?: () => void;
}) {
    const date = new Date(log.date);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return (
        <div className="flex overflow-hidden rounded-xl bg-white shadow-md">
            <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-navy p-3 text-white sm:w-28">
                <p className="text-4xl font-bold">{day}</p>
                <p className="text-sm">
                    {month} - {year}
                </p>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                    <p className="text-lg font-bold">
                        {log.title}{" "}
                        <span className="font-normal text-gray-500">
                            • {log.hours} {log.hours === 1 ? "hour" : "hours"}
                        </span>
                    </p>
                    <p className="text-sm text-gray-500">
                        {log.user ? log.user.fullName : "Unknown user"} - {log.animal ? log.animal.breed : "Unknown"} -{" "}
                        {log.animal ? log.animal.name : "Unknown animal"}
                    </p>
                    <p className="mt-1 text-sm">{log.description}</p>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center">
                    {onDelete && (
                        <button onClick={onDelete} className="text-sm text-gray-500 hover:text-brand">
                            Delete
                        </button>
                    )}
                    {editLink && (
                        <Link href={editLink}>
                            <Image src={editButton} alt="Edit" className="h-12 w-12" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
