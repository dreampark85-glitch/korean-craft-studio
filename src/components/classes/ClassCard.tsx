import Image from "next/image";
import type { CraftClass } from "@/types";
import { formatDuration, formatKRW } from "@/lib/format";
import { buttonPrimary } from "@/components/ui/styles";

interface ClassCardProps {
  craftClass: CraftClass;
  onApply: (classId: string) => void;
}

export function ClassCard({ craftClass, onApply }: ClassCardProps) {
  const { id, name, description, price, durationMinutes, maxParticipants, image, imageAlt } = craftClass;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <div className="relative aspect-[4/3] bg-beige">
        <Image
          src={image}
          alt={imageAlt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="font-serif text-xl font-semibold text-ink">{name}</h3>
        <p className="text-base text-ink">{description}</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-base">
          <dt className="text-muted">가격</dt>
          <dd className="font-semibold text-ink">1인 {formatKRW(price)}</dd>
          <dt className="text-muted">소요시간</dt>
          <dd className="text-ink">{formatDuration(durationMinutes)}</dd>
          <dt className="text-muted">정원</dt>
          <dd className="text-ink">최대 {maxParticipants}명</dd>
        </dl>
        <div className="mt-auto pt-2">
          <button
            type="button"
            onClick={() => onApply(id)}
            aria-label={`${name} 신청하기`}
            className={`${buttonPrimary} w-full`}
          >
            신청하기
          </button>
        </div>
      </div>
    </article>
  );
}
