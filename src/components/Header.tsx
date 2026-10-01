import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:px-6">
        <p className="font-serif text-2xl font-semibold tracking-wide text-ink">{SITE_NAME}</p>
        <p className="text-sm text-muted">한결같은 손길의 한국 전통 공예</p>
      </div>
    </header>
  );
}
