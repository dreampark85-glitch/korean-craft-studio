"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  panel: ReactNode;
}

interface TabsProps {
  tabs: readonly TabItem[];
  ariaLabel: string;
}

/**
 * WAI-ARIA Tabs (자동 활성화). roving tabindex, ←/→(순환)/Home/End 지원.
 * 모든 패널을 마운트하고 비활성 패널은 hidden으로 두어 aria-controls 대상이 항상 존재한다.
 */
export function Tabs({ tabs, ariaLabel }: TabsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabDomId = (id: string) => `${baseId}-tab-${id}`;
  const panelDomId = (id: string) => `${baseId}-panel-${id}`;

  function activate(index: number) {
    const next = tabs[index];
    if (!next) return;
    setActiveId(next.id);
    tabRefs.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      activate(index === last ? 0 : index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      activate(index === 0 ? last : index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      activate(0);
    } else if (event.key === "End") {
      event.preventDefault();
      activate(last);
    }
  }

  return (
    <div>
      <div className="sticky top-0 z-20 border-b border-line bg-paper">
        <div role="tablist" aria-label={ariaLabel} className="mx-auto flex max-w-6xl px-4 sm:px-6">
          {tabs.map((tab, index) => {
            const selected = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={tabDomId(tab.id)}
                aria-selected={selected}
                aria-controls={panelDomId(tab.id)}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`min-h-12 flex-1 border-b-4 px-3 py-3 text-base sm:flex-none sm:px-8 sm:text-lg ${
                  selected
                    ? "border-accent font-bold text-accent"
                    : "border-transparent font-medium text-muted hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={panelDomId(tab.id)}
          aria-labelledby={tabDomId(tab.id)}
          hidden={tab.id !== activeId}
        >
          {tab.panel}
        </div>
      ))}
    </div>
  );
}
