import type { CraftClass } from "@/types";

export const classes: CraftClass[] = [
  {
    id: "class-ceramic-bowl",
    name: "도자기 만들기",
    description:
      "물레 위에서 흙을 빚어 나만의 그릇을 만들어 보는 체험입니다. 초벌 전 단계까지 함께하며 처음 하시는 분도 편안하게 따라올 수 있어요.",
    price: 65000,
    durationMinutes: 150,
    maxParticipants: 6,
    image: "/images/classes/ceramic-bowl.svg",
    imageAlt: "물레 위에서 두 손으로 흙 그릇의 모양을 잡는 모습을 단순하게 그린 일러스트",
  },
  {
    id: "class-bojagi",
    name: "보자기 만들기",
    description:
      "조각 천을 이어 붙여 작은 보자기를 만들고, 물건을 감싸는 매듭법까지 배웁니다. 완성한 보자기는 가져가실 수 있습니다.",
    price: 38000,
    durationMinutes: 90,
    maxParticipants: 8,
    image: "/images/classes/bojagi.svg",
    imageAlt: "색이 다른 천 조각을 이어 붙인 보자기가 매듭으로 묶인 모습을 단순하게 그린 일러스트",
  },
  {
    id: "class-woodcraft-coaster",
    name: "목공예 코스터 만들기",
    description:
      "나무판을 다듬고 사포질한 뒤 결을 살려 오일로 마감하는 코스터 만들기입니다. 공구 사용법은 현장에서 차근차근 안내해 드립니다.",
    price: 48000,
    durationMinutes: 120,
    maxParticipants: 4,
    image: "/images/classes/woodcraft-coaster.svg",
    imageAlt: "나무 코스터 위에 조각칼과 사포가 놓여 있는 모습을 단순하게 그린 일러스트",
  },
];
