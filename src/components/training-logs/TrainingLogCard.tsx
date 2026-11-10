import Image from "next/image";
import Link from "next/link";
import { formatDayOfMonth, formatMonthAndYear } from "@/lib/formatDate";
import { routes } from "@/lib/routes";
import type { TrainingLogWithDetails } from "@/types/models";
import editIcon from "../../../public/images/trainingLogCardEditButton.png";

interface TrainingLogCardProps {
  log: TrainingLogWithDetails;
}

export default function TrainingLogCard({ log }: TrainingLogCardProps) {
  return (
    <article className="flex overflow-hidden rounded-lg bg-white shadow-md">
      <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-1 bg-brand-navy px-2 py-4 text-white">
        <span className="text-3xl font-bold leading-none">{formatDayOfMonth(log.date)}</span>
        <span className="text-sm">{formatMonthAndYear(log.date)}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1 px-5 py-4">
        <p className="flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">{log.title}</span>
          <span className="text-sm text-gray-500">• {log.hours} hours</span>
        </p>
        <p className="text-sm text-gray-500">
          {log.user.fullName} - {log.animal.breed} - {log.animal.name}
        </p>
        <p className="mt-1 text-sm text-gray-900">{log.description}</p>
      </div>

      <div className="flex shrink-0 items-center pr-5">
        <Link href={routes.editTrainingLog(log._id)} aria-label={`Edit ${log.title}`}>
          <Image src={editIcon} alt="" width={40} height={40} />
        </Link>
      </div>
    </article>
  );
}
