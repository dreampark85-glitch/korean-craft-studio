import { PRACTICE_NOTICE } from "@/lib/constants";

interface PracticeNoticeProps {
  /** banner: 페이지 상단 상시 안내 / inline: 폼 근처 안내 */
  variant?: "banner" | "inline";
  /** aria-describedby 연결용 id (모달 설명 등) */
  id?: string;
}

export function PracticeNotice({ variant = "banner", id }: PracticeNoticeProps) {
  if (variant === "inline") {
    return (
      <p id={id} role="note" className="rounded-md border border-line bg-beige px-4 py-3 text-sm text-ink">
        {PRACTICE_NOTICE}
      </p>
    );
  }
  return (
    <div role="note" className="border-b border-line bg-beige">
      <p id={id} className="mx-auto max-w-6xl px-4 py-2.5 text-sm text-ink sm:px-6">
        {PRACTICE_NOTICE}
      </p>
    </div>
  );
}
