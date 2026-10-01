/** 공용 Tailwind 클래스 문자열. 색 대비는 globals.css 토큰 기준으로 검증됨. */

// not-[select]: <select>는 항상 :read-only로 매칭되므로 읽기 전용 배경 표시에서 제외한다.
export const controlClass =
  "block w-full min-h-11 rounded-md border border-line-strong bg-surface px-3 py-2 text-base text-ink placeholder:text-muted aria-[invalid=true]:border-error aria-[invalid=true]:border-2 not-[select]:read-only:bg-beige";

export const buttonPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2 text-base font-semibold text-white hover:bg-accent-hover aria-disabled:cursor-not-allowed aria-disabled:bg-accent-hover";
