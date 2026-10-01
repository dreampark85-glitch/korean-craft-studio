"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { classes } from "@/mocks/classes";
import { submitClassApplication } from "@/lib/mock-api";
import { MOCK_FAILURE_PHONE } from "@/lib/constants";
import { validateClassApplication, type ClassField, type ClassFormValues, type FieldErrors } from "@/lib/validation";
import { useMockSubmit } from "@/hooks/useMockSubmit";
import { Modal } from "@/components/ui/Modal";
import { FormField, focusFirstInvalid } from "@/components/ui/FormField";
import { SubmissionSuccess, SubmitStatus } from "@/components/ui/SubmitStatus";
import { buttonPrimary, controlClass } from "@/components/ui/styles";
import { PracticeNotice } from "@/components/PracticeNotice";

interface ClassApplyDialogProps {
  open: boolean;
  classId: string | null;
  today: string;
  onClose: () => void;
}

export function ClassApplyDialog({ open, classId, today, onClose }: ClassApplyDialogProps) {
  const noticeId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ClassFormValues>({
    name: "",
    phone: "",
    classId: classId ?? "",
    desiredDate: "",
    participants: "1",
    request: "",
  });
  const [errors, setErrors] = useState<FieldErrors<ClassField>>({});
  const [attempt, setAttempt] = useState(0);
  const { status, result, run, reset } = useMockSubmit(submitClassApplication);

  useEffect(() => {
    if (attempt > 0) focusFirstInvalid(formRef.current);
  }, [attempt]);

  const loading = status === "loading";
  const selected = classes.find((c) => c.id === values.classId);

  function update(field: ClassField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function changeClass(nextClassId: string) {
    const max = classes.find((c) => c.id === nextClassId)?.maxParticipants;
    setValues((prev) => {
      const count = Number(prev.participants);
      const clamp = max !== undefined && prev.participants.trim() !== "" && Number.isInteger(count) && count > max;
      return { ...prev, classId: nextClassId, participants: clamp ? String(max) : prev.participants };
    });
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    const nextErrors = validateClassApplication(values, classes);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      reset();
      setAttempt((n) => n + 1);
      return;
    }
    void run({
      name: values.name.trim(),
      phone: values.phone.trim(),
      classId: values.classId,
      desiredDate: values.desiredDate,
      participants: Number(values.participants),
      request: values.request.trim(),
    });
  }

  const succeeded = status === "success" && result && result.success;

  return (
    <Modal open={open} onClose={handleClose} title="클래스 신청" describedById={succeeded ? undefined : noticeId}>
      {succeeded ? (
        <SubmissionSuccess title="클래스 신청이 접수되었습니다" result={result} onClose={handleClose} />
      ) : (
        <form ref={formRef} noValidate autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PracticeNotice variant="inline" id={noticeId} />

          <FormField label="이름" required error={errors.name}>
            {(p) => (
              <input
                {...p}
                type="text"
                name="name"
                autoComplete="off"
                value={values.name}
                readOnly={loading}
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
                name="phone"
                autoComplete="off"
                value={values.phone}
                readOnly={loading}
                onChange={(e) => update("phone", e.target.value)}
                className={controlClass}
              />
            )}
          </FormField>

          <FormField label="클래스" required error={errors.classId}>
            {(p) => (
              <select
                {...p}
                name="classId"
                value={values.classId}
                disabled={loading}
                onChange={(e) => changeClass(e.target.value)}
                className={controlClass}
              >
                <option value="">클래스를 선택해 주세요</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </FormField>

          <FormField label="희망 날짜" required error={errors.desiredDate}>
            {(p) => (
              <input
                {...p}
                type="date"
                name="desiredDate"
                min={today}
                value={values.desiredDate}
                readOnly={loading}
                onChange={(e) => update("desiredDate", e.target.value)}
                className={controlClass}
              />
            )}
          </FormField>

          <FormField
            label="인원"
            required
            error={errors.participants}
            hint={selected ? `정원 ${selected.maxParticipants}명` : "클래스를 선택하면 정원이 표시됩니다"}
          >
            {(p) => (
              <input
                {...p}
                type="number"
                inputMode="numeric"
                name="participants"
                min={1}
                max={selected?.maxParticipants}
                value={values.participants}
                readOnly={loading}
                onChange={(e) => update("participants", e.target.value)}
                className={controlClass}
              />
            )}
          </FormField>

          <FormField label="요청사항" error={errors.request}>
            {(p) => (
              <textarea
                {...p}
                name="request"
                rows={3}
                autoComplete="off"
                value={values.request}
                readOnly={loading}
                onChange={(e) => update("request", e.target.value)}
                className={controlClass}
              />
            )}
          </FormField>

          <SubmitStatus status={status} result={result} />

          <div>
            <button type="submit" aria-disabled={loading ? "true" : undefined} className={buttonPrimary}>
              {loading ? "접수 중…" : status === "error" ? "다시 보내기" : "신청하기"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
