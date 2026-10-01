import Image from "next/image";
import type { Craft } from "@/types";
import { formatKRW } from "@/lib/format";
import { buttonPrimary } from "@/components/ui/styles";

interface CraftCardProps {
  craft: Craft;
  onOrder: (craftId: string) => void;
}

export function CraftCard({ craft, onOrder }: CraftCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-surface">
      <div className="relative aspect-[4/3] bg-beige">
        <Image
          src={craft.image}
          alt={craft.imageAlt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm font-semibold text-muted">분류: {craft.category}</p>
        <h3 className="font-serif text-xl font-semibold text-ink">{craft.name}</h3>
        <p className="flex-1 text-base text-ink">{craft.description}</p>
        <p className="text-lg font-bold text-ink">{formatKRW(craft.price)}</p>
        <button
          type="button"
          onClick={() => onOrder(craft.id)}
          aria-label={`${craft.name} 주문 문의하기`}
          className={buttonPrimary}
        >
          주문 문의하기
        </button>
      </div>
    </article>
  );
}
