"use client";

import { useState } from "react";
import { crafts } from "@/mocks/crafts";
import { CraftCard } from "./CraftCard";
import { CraftCategoryFilter, type CraftFilterValue } from "./CraftCategoryFilter";
import { OrderInquiryDialog } from "./OrderInquiryDialog";

interface DialogState {
  open: boolean;
  craftId: string | null;
  key: number;
}

const GUIDE_ITEMS = [
  "제작 기간: 주문 후 약 2~3주가 걸린다고 가정한 예시입니다.",
  "포장: 오동나무 상자와 보자기로 감싼다고 가정한 예시입니다.",
  "배송: 전국 택배로 보낸다고 가정한 예시이며, 실제 배송은 이루어지지 않습니다.",
  "교환·환불: 수령 후 7일 이내 가능하다고 가정한 예시입니다.",
];

export function CraftSection() {
  const [filter, setFilter] = useState<CraftFilterValue>("전체");
  const [dialog, setDialog] = useState<DialogState>({ open: false, craftId: null, key: 0 });

  const visible = filter === "전체" ? crafts : crafts.filter((craft) => craft.category === filter);

  function handleOrder(craftId: string) {
    setDialog((prev) => ({ open: true, craftId, key: prev.key + 1 }));
  }

  function handleClose() {
    setDialog((prev) => ({ ...prev, open: false }));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h2 className="font-serif text-3xl font-semibold text-ink">공예품 전시·주문</h2>
      <p className="mt-4 max-w-3xl text-base text-ink">
        온결 공방은 흙과 옻칠, 천과 나무의 결을 살려 일상에 놓이는 공예품을 만드는 가상의 공방입니다. 도자기, 나전칠기,
        보자기, 목공예 작품을 둘러보고 마음에 드는 작품은 주문 문의로 남겨 보세요.
      </p>

      <section aria-labelledby="craft-guide-title" className="mt-6 rounded-lg border border-line bg-beige p-5">
        <h3 id="craft-guide-title" className="text-lg font-semibold text-ink">
          제작·배송 안내 (실습용 가상 안내)
        </h3>
        <p className="mt-2 text-base text-ink">
          아래 내용은 모두 지어낸 예시입니다. 실제 제작, 배송, 결제는 이루어지지 않습니다.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-ink">
          {GUIDE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex flex-col gap-3">
        <CraftCategoryFilter value={filter} onChange={setFilter} />
        <p aria-live="polite" className="text-sm text-muted">
          {filter === "전체" ? `전체 공예품 ${visible.length}개 표시 중` : `${filter} ${visible.length}개 표시 중`}
        </p>
      </div>

      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((craft) => (
          <CraftCard key={craft.id} craft={craft} onOrder={handleOrder} />
        ))}
      </div>

      <OrderInquiryDialog key={dialog.key} open={dialog.open} craftId={dialog.craftId} onClose={handleClose} />
    </div>
  );
}
