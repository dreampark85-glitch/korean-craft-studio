import { PracticeNotice } from "@/components/PracticeNotice";

const INFO = [
  { label: "주소", value: "서울특별시 ○○구 가상로 123 (가상)" },
  { label: "운영시간", value: "화–일 10:00–18:00, 월요일 휴무 (가상)" },
  { label: "문의처", value: "02-0000-0000 / hello@example.invalid (가상)" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-beige">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <dl className="grid gap-6 sm:grid-cols-3">
          {INFO.map((item) => (
            <div key={item.label}>
              <dt className="text-sm font-semibold text-ink">
                {item.label} <span className="font-normal text-muted">· 실습용 가상 정보</span>
              </dt>
              <dd className="mt-1 text-sm text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <PracticeNotice variant="inline" />
        </div>
        <p className="mt-6 text-sm text-muted">© 온결 공방 (실습용 프로토타입)</p>
      </div>
    </footer>
  );
}
