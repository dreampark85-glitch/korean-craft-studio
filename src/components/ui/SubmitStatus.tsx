"use client";

import { useEffect, useRef } from "react";
import type { MockApiResult } from "@/types";
import type { SubmitState } from "@/hooks/useMockSubmit";
import { buttonPrimary } from "./styles";

interface SubmitStatusProps {
  status: SubmitState;
  result: MockApiResult | null;
}

/**
 * loading / error 알림 영역.
 * - 로딩 안내는 항상 DOM에 있는 aria-live 영역의 텍스트만 바꿔 스크린리더가 안정적으로 읽게 한다.
 * - 오류는 role=alert. success는 SubmissionSuccess를 쓴다.
 */
export function SubmitStatus({ status, result }: SubmitStatusProps) {
  const loading = status === "loading";
  return (
    <>
      <p
        role="status"
        aria-live="polite"
        className={loading ? "rounded-md bg-beige px-4 py-3 text-base text-ink" : "sr-only"}
      >
        {loading ? "접수 중입니다… 잠시만 기다려 주세요. (실습용 Mock 응답 대기)" : ""}
      </p>
      {status === "error" && result && !result.success ? <ErrorBanner message={result.message} /> : null}
    </>
  );
}

/** 오류 배너: 작은 화면에서 모달 아래쪽에 있어도 보이도록 나타날 때 화면 안으로 스크롤한다. */
function ErrorBanner({ message }: { message: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ block: "nearest" });
  }, []);
  return (
    <p
      ref={ref}
      role="alert"
      className="rounded-md border-2 border-error bg-surface px-4 py-3 text-base font-semibold text-error"
    >
      {message}
    </p>
  );
}

interface SubmissionSuccessProps {
  title: string;
  result: Extract<MockApiResult, { success: true }>;
  onClose: () => void;
}

/** 성공 화면: 마운트되면 제목으로 포커스를 이동해 결과를 알리고 접수번호를 보여준다. */
export function SubmissionSuccess({ title, result, onClose }: SubmissionSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h3 ref={headingRef} tabIndex={-1} className="font-serif text-xl font-semibold text-success">
        {title}
      </h3>
      <p className="text-base text-ink">{result.message}</p>
      <p className="rounded-md bg-beige px-4 py-3 text-base text-ink">
        가짜 접수번호: <strong className="font-semibold">{result.receiptNumber}</strong>
      </p>
      <div>
        <button type="button" onClick={onClose} className={buttonPrimary}>
          닫기
        </button>
      </div>
    </div>
  );
}
