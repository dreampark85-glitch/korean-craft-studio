"use client";

import { useState } from "react";
import { classes } from "@/mocks/classes";
import { todayString } from "@/lib/validation";
import { ClassCard } from "./ClassCard";
import { ClassApplyDialog } from "./ClassApplyDialog";

interface DialogState {
  open: boolean;
  classId: string | null;
  key: number;
  today: string;
}

const NOTICE_ITEMS = [
  "준비물: 편한 복장과 앞치마를 챙겨 주세요. 도구와 재료는 공방에서 준비합니다.",
  "시간 안내: 시작 10분 전까지 도착해 주세요. 지각 시 체험 시간이 줄어들 수 있습니다.",
  "일정 변경: 체험 3일 전까지 날짜 변경이 가능합니다.",
  "취소·환불: 체험 3일 전까지는 전액 환불, 이후에는 환불이 어렵습니다.",
];

export function ClassSection() {
  const [dialog, setDialog] = useState<DialogState>({ open: false, classId: null, key: 0, today: "" });

  function openDialog(classId: string) {
    setDialog((prev) => ({ open: true, classId, key: prev.key + 1, today: todayString() }));
  }

  function closeDialog() {
    setDialog((prev) => ({ ...prev, open: false }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h2 className="font-serif text-3xl font-semibold text-ink">공방 클래스</h2>
      <p className="mt-3 max-w-2xl text-base text-ink">
        온결 공방이 직접 운영하는 소규모 체험 클래스입니다. 흙을 빚고, 천을 잇고, 나무를 다듬는 시간 속에서 손끝의 온기가 담긴 나만의 작품을 만들어 보세요. 처음 오시는 분도 부담 없이 참여하실 수 있습니다.
      </p>

      <section aria-labelledby="class-notice-title" className="mt-6 rounded-lg border border-line bg-beige p-5">
        <h3 id="class-notice-title" className="text-lg font-semibold text-ink">
          준비물·취소 안내 (실습용 가상 안내)
        </h3>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base text-ink">
          {NOTICE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink">
          위 안내는 모두 가상의 내용입니다. 이 사이트에서는 실제 신청이나 결제가 이루어지지 않습니다.
        </p>
      </section>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((craftClass) => (
          <ClassCard key={craftClass.id} craftClass={craftClass} onApply={openDialog} />
        ))}
      </div>

      <ClassApplyDialog
        key={dialog.key}
        open={dialog.open}
        classId={dialog.classId}
        today={dialog.today}
        onClose={closeDialog}
      />
    </div>
  );
}
