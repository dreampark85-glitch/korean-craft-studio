"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { crafts } from "@/mocks/crafts";
import { MOCK_FAILURE_PHONE, ORDER_QUANTITY_MAX, ORDER_QUANTITY_MIN } from "@/lib/constants";
import { submitOrderInquiry } from "@/lib/mock-api";
import { validateOrder, type FieldErrors, type OrderField, type OrderFormValues } from "@/lib/validation";
import { useMockSubmit } from "@/hooks/useMockSubmit";
import { Modal } from "@/components/ui/Modal";
import { FormField, focusFirstInvalid } from "@/components/ui/FormField";
import { SubmissionSuccess, SubmitStatus } from "@/components/ui/SubmitStatus";
import { buttonPrimary, controlClass } from "@/components/ui/styles";
import { PracticeNotice } from "@/components/PracticeNotice";

interface OrderInquiryDialogProps {
  open: boolean;
  craftId: string | null;
  onClose: () => void;
}

const CRAFT_IDS = crafts.map((craft) => craft.id);

export function OrderInquiryDialog({ open, craftId, onClose }: OrderInquiryDialogProps) {
  const noticeId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<OrderFormValues>({
    name: "",
    phone: "",
    craftId: craftId ?? "",
    quantity: String(ORDER_QUANTITY_MIN),
    request: "",
  });
  const [errors, setErrors] = useState<FieldErrors<OrderField>>({});
  const [attempt, setAttempt] = useState(0);
  const { status, result, run, reset } = useMockSubmit(submitOrderInquiry);
  const loading = status === "loading";

  useEffect(() => {
    if (attempt > 0) focusFirstInvalid(formRef.current);
  }, [attempt]);

  function handleClose() {
    reset();
    onClose();
  }

  function update(field: OrderField, value: string) {
    if (loading) return;
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const nextErrors = validateOrder(values, CRAFT_IDS);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      reset();
      setAttempt((prev) => prev + 1);
      return;
    }
    void run({
      name: values.name.trim(),
      phone: values.phone.trim(),
      craftId: values.craftId,
      quantity: Number(values.quantity),
      request: values.request.trim(),
    });
  }

  const submitLabel = loading ? "접수 중…" : status === "error" ? "다시 보내기" : "문의 보내기";
  const succeeded = status === "success" && result && result.success;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="주문 문의하기"
      describedById={succeeded ? undefined : noticeId}
    >
      {status === "success" && result && result.success ? (
        <SubmissionSuccess title="주문 문의가 접수되었습니다" result={result} onClose={handleClose} />
      ) : (
        <form ref={formRef} noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PracticeNotice variant="inline" id={noticeId} />
          <FormField label="이름" required error={errors.name}>
            {(p) => (
              <input
                {...p}
                type="text"
                autoComplete="off"
                readOnly={loading}
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                className={controlClass}
              />
            )}
          </FormField>
          <FormField
            label="연락처"
            required
            error={errors.phone}
            hint={`예시: 010-1234-5678 / 오류 테스트: ${MOCK_FAILURE_PHONE} — 모두 가상 번호입니다`}
          >
            {(p) => (
              <input
                {...p}
                type="tel"
                inputMode="tel"
                autoComplete="off"
                readOnly={loading}
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={controlClass}
              />
            )}
          </FormField>
          <FormField label="상품" required error={errors.craftId}>
            {(p) => (
              <select
                {...p}
                autoComplete="off"
                disabled={loading}
                value={values.craftId}
                onChange={(e) => update("craftId", e.target.value)}
                className={controlClass}
              >
                <option value="">상품을 선택해 주세요</option>
                {crafts.map((craft) => (
                  <option key={craft.id} value={craft.id}>
                    {craft.name} ({craft.category})
                  </option>
                ))}
              </select>
            )}
          </FormField>
          <FormField
            label="수량"
            required
            error={errors.quantity}
            hint={`${ORDER_QUANTITY_MIN}~${ORDER_QUANTITY_MAX}개까지 입력할 수 있습니다.`}
          >
            {(p) => (
              <input
                {...p}
                type="number"
                inputMode="numeric"
                autoComplete="off"
                min={ORDER_QUANTITY_MIN}
                max={ORDER_QUANTITY_MAX}
                readOnly={loading}
                value={values.quantity}
                onChange={(e) => update("quantity", e.target.value)}
                className={controlClass}
              />
            )}
          </FormField>
          <FormField label="요청사항" error={errors.request} hint="500자 이내로 적어 주세요.">
            {(p) => (
              <textarea
                {...p}
                rows={4}
                autoComplete="off"
                readOnly={loading}
                value={values.request}
                onChange={(e) => update("request", e.target.value)}
                className={controlClass}
              />
            )}
          </FormField>
          <SubmitStatus status={status} result={result} />
          <div>
            <button type="submit" aria-disabled={loading ? "true" : undefined} className={buttonPrimary}>
              {submitLabel}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
