import { useId, type ReactNode } from "react";

export interface FieldControlProps {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "aria-required"?: true;
}

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  /** render prop: 반환된 controlProps를 input/select/textarea에 그대로 펼쳐 넣는다. */
  children: (controlProps: FieldControlProps) => ReactNode;
}

/** label–control 연결, 힌트·오류 문구를 aria-describedby로 연결한다. */
export function FormField({ label, required, hint, error, children }: FormFieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ");

  const controlProps: FieldControlProps = { id };
  if (describedBy) controlProps["aria-describedby"] = describedBy;
  if (error) controlProps["aria-invalid"] = true;
  if (required) controlProps["aria-required"] = true;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-base font-semibold text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-sm font-normal text-muted">(필수)</span>
        ) : (
          <span className="ml-1 text-sm font-normal text-muted">(선택)</span>
        )}
      </label>
      {children(controlProps)}
      {hint ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-semibold text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** 제출 실패 후 첫 번째 오류 필드(aria-invalid="true")로 포커스를 옮긴다. 오류가 렌더된 뒤(useEffect)에 호출한다. */
export function focusFirstInvalid(form: HTMLFormElement | null): void {
  form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
}
