import { ORDER_QUANTITY_MAX, ORDER_QUANTITY_MIN } from "./constants";

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidName(value: string): boolean {
  const v = value.trim();
  return v.length >= 1 && v.length <= 20;
}

/** 휴대전화 010/011/016/017/018/019, 하이픈은 선택. 숫자·하이픈 외 문자가 섞이면 거부한다. */
export function isValidPhone(value: string): boolean {
  return /^01[016789]-?\d{3,4}-?\d{4}$/.test(value.trim());
}

export function isValidRequest(value: string): boolean {
  return value.trim().length <= 500;
}

export function isIntegerInRange(value: number, min: number, max: number): boolean {
  return Number.isInteger(value) && value >= min && value <= max;
}

/** 오늘(로컬 기준) YYYY-MM-DD */
export function todayString(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** YYYY-MM-DD 형식이면서 실제 존재하는 날짜인지 */
export function isValidDateString(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

/** 오늘 포함 이후 날짜면 true (과거 날짜 금지) */
export function isTodayOrFuture(value: string, now: Date = new Date()): boolean {
  return isValidDateString(value) && value >= todayString(now);
}

export interface OrderFormValues {
  name: string;
  phone: string;
  craftId: string;
  quantity: string;
  request: string;
}
export type OrderField = keyof OrderFormValues;

export function validateOrder(
  values: OrderFormValues,
  knownCraftIds: readonly string[],
): FieldErrors<OrderField> {
  const errors: FieldErrors<OrderField> = {};
  if (!isValidName(values.name)) errors.name = "이름을 1~20자로 입력해 주세요.";
  if (!isValidPhone(values.phone)) errors.phone = "연락처를 010-1234-5678 형식으로 입력해 주세요.";
  if (!knownCraftIds.includes(values.craftId)) errors.craftId = "상품을 선택해 주세요.";
  const quantity = Number(values.quantity);
  if (values.quantity.trim() === "" || !isIntegerInRange(quantity, ORDER_QUANTITY_MIN, ORDER_QUANTITY_MAX)) {
    errors.quantity = `수량은 ${ORDER_QUANTITY_MIN}~${ORDER_QUANTITY_MAX} 사이의 정수로 입력해 주세요.`;
  }
  if (!isValidRequest(values.request)) errors.request = "요청사항은 500자 이내로 입력해 주세요.";
  return errors;
}

export interface ClassFormValues {
  name: string;
  phone: string;
  classId: string;
  desiredDate: string;
  participants: string;
  request: string;
}
export type ClassField = keyof ClassFormValues;

export function validateClassApplication(
  values: ClassFormValues,
  classes: ReadonlyArray<{ id: string; maxParticipants: number }>,
  now: Date = new Date(),
): FieldErrors<ClassField> {
  const errors: FieldErrors<ClassField> = {};
  if (!isValidName(values.name)) errors.name = "이름을 1~20자로 입력해 주세요.";
  if (!isValidPhone(values.phone)) errors.phone = "연락처를 010-1234-5678 형식으로 입력해 주세요.";
  const selected = classes.find((c) => c.id === values.classId);
  if (!selected) errors.classId = "클래스를 선택해 주세요.";
  if (values.desiredDate.trim() === "" || !isValidDateString(values.desiredDate)) {
    errors.desiredDate = "희망 날짜를 선택해 주세요.";
  } else if (!isTodayOrFuture(values.desiredDate, now)) {
    errors.desiredDate = "오늘 이후의 날짜를 선택해 주세요. 과거 날짜는 신청할 수 없습니다.";
  }
  const participants = Number(values.participants);
  const max = selected?.maxParticipants ?? 1;
  if (values.participants.trim() === "" || !isIntegerInRange(participants, 1, max)) {
    errors.participants = selected
      ? `인원은 1~${max}명 사이의 정수로 입력해 주세요. (정원 ${max}명)`
      : "클래스를 먼저 선택한 뒤 인원을 입력해 주세요.";
  }
  if (!isValidRequest(values.request)) errors.request = "요청사항은 500자 이내로 입력해 주세요.";
  return errors;
}
