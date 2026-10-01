import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-14 md:py-20">
        <div>
          <p className="text-sm font-medium tracking-widest text-accent">KOREAN CRAFT STUDIO</p>
          <h1 id="hero-title" className="mt-4 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {SITE_NAME}
          </h1>
          <p className="mt-6 text-base leading-8 text-ink sm:text-lg">
            도자기, 나전칠기, 보자기, 목공예. 오랜 시간 이어 온 우리 공예의 결을 오늘의 일상에 어울리는 모습으로 다시
            빚습니다.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            차분한 색과 단정한 선으로 만든 작품을 둘러보고, 공방에서 직접 손으로 배우는 시간을 만나 보세요.
          </p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-line bg-beige">
          <Image
            src="/images/hero.svg"
            alt="청자빛 화병과 접힌 보자기, 나무 쟁반이 놓인 고요한 공예 정물"
            fill
            unoptimized
            priority
            sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
