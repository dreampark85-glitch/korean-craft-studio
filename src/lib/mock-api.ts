import type { ClassApplication, MockApiResult, OrderInquiry } from "@/types";
import { MOCK_DELAY_MS, MOCK_FAILURE_PHONE } from "./constants";
import { digitsOnly } from "./validation";

/*
 * 실습용 Mock API.
 * - 외부 네트워크 요청, 브라우저 저장소, 서버 기능을 사용하지 않는다.
 * - 약 700ms 지연 후 가짜 결과를 반환한다. 새로고침하면 카운터도 초기화된다.
 */

let receiptSequence = 0;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function nextReceiptNumber(prefix: "ORD" | "CLS"): string {
  receiptSequence += 1;
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  return `ONG-${prefix}-${ymd}-${String(receiptSequence).padStart(4, "0")}`;
}

function isFailurePhone(phone: string): boolean {
  return digitsOnly(phone) === digitsOnly(MOCK_FAILURE_PHONE);
}

async function respond(phone: string, prefix: "ORD" | "CLS", doneMessage: string): Promise<MockApiResult> {
  await wait(MOCK_DELAY_MS);
  if (isFailurePhone(phone)) {
    return {
      success: false,
      message: `실습용 오류입니다. 연락처 ${MOCK_FAILURE_PHONE}는 실패 테스트용 번호입니다. 다른 번호로 다시 시도해 주세요.`,
    };
  }
  return { success: true, receiptNumber: nextReceiptNumber(prefix), message: doneMessage };
}

export function submitOrderInquiry(input: OrderInquiry): Promise<MockApiResult> {
  return respond(
    input.phone,
    "ORD",
    "주문 문의가 접수되었습니다. (실습용: 실제로 전송·저장되지 않았습니다.)",
  );
}

export function submitClassApplication(input: ClassApplication): Promise<MockApiResult> {
  return respond(
    input.phone,
    "CLS",
    "클래스 신청이 접수되었습니다. (실습용: 실제로 전송·저장되지 않았습니다.)",
  );
}
