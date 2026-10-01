import { ClassSection } from "@/components/classes/ClassSection";
import { CraftSection } from "@/components/crafts/CraftSection";
import { Hero } from "@/components/Hero";
import { Tabs, type TabItem } from "@/components/Tabs";

const TABS: readonly TabItem[] = [
  { id: "crafts", label: "공예품 전시·주문", panel: <CraftSection /> },
  { id: "classes", label: "공방 클래스", panel: <ClassSection /> },
];

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
      <Hero />
      <Tabs tabs={TABS} ariaLabel="온결 공방 메뉴" />
    </main>
  );
}
