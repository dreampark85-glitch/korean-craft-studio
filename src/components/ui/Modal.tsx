"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** 설명 요소의 id (예: 실습 안내 문구). aria-describedby로 연결된다. */
  describedById?: string;
  children: ReactNode;
}

const FIRST_CONTROL =
  "[data-autofocus], input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled])";

/**
 * 네이티브 <dialog> 모달.
 * - 항상 렌더하고 open prop으로 열고 닫는다(조건부 렌더 금지: 포커스 복귀가 깨진다).
 * - 열릴 때 첫 입력칸으로 포커스, Esc·배경 클릭·닫기 버튼으로 닫힘, 닫히면 열기 직전 요소로 포커스 복귀.
 */
export function Modal({ open, onClose, title, describedById, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const pressedOnBackdrop = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      dialog.showModal();
      const target = dialog.querySelector<HTMLElement>(FIRST_CONTROL) ?? dialog.querySelector<HTMLElement>("button");
      target?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={describedById}
      onClose={() => {
        openerRef.current?.focus();
        openerRef.current = null;
        if (open) onClose();
      }}
      onPointerDown={(event) => {
        pressedOnBackdrop.current = event.target === dialogRef.current;
      }}
      onClick={(event) => {
        // 입력칸에서 드래그를 시작해 배경에서 놓은 경우는 닫지 않는다(누름·뗌 모두 배경일 때만 닫힘).
        const closeByBackdrop = event.target === dialogRef.current && pressedOnBackdrop.current;
        pressedOnBackdrop.current = false;
        if (closeByBackdrop) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[min(calc(100%-2rem),40rem)] overflow-y-auto rounded-lg border border-line bg-surface p-0 text-ink shadow-xl backdrop:bg-ink/60"
    >
      <div className="flex flex-col gap-5 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="font-serif text-2xl font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface text-xl text-ink hover:bg-beige"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
