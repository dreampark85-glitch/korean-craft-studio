"use client";

import { useCallback, useRef, useState } from "react";
import type { MockApiResult } from "@/types";

export type SubmitState = "idle" | "loading" | "success" | "error";

/**
 * Mock API 제출 상태기계: idle → loading → success | error.
 * - loading 중 중복 호출은 무시한다.
 * - reset() 이후에 도착한 이전 응답은 무시한다(모달을 닫았다 다시 연 경우).
 */
export function useMockSubmit<T>(submit: (input: T) => Promise<MockApiResult>) {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [result, setResult] = useState<MockApiResult | null>(null);
  const requestId = useRef(0);
  const inFlight = useRef(false);

  const run = useCallback(
    async (input: T) => {
      if (inFlight.current) return;
      inFlight.current = true;
      requestId.current += 1;
      const id = requestId.current;
      setStatus("loading");
      setResult(null);
      try {
        const next = await submit(input);
        if (id !== requestId.current) return;
        setResult(next);
        setStatus(next.success ? "success" : "error");
        inFlight.current = false;
      } catch {
        if (id !== requestId.current) return;
        setResult({ success: false, message: "예기치 않은 오류가 발생했습니다. (실습용)" });
        setStatus("error");
        inFlight.current = false;
      }
    },
    [submit],
  );

  const reset = useCallback(() => {
    requestId.current += 1;
    inFlight.current = false;
    setStatus("idle");
    setResult(null);
  }, []);

  return { status, result, run, reset };
}
