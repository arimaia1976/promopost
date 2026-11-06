"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconClose, IconMenuBar } from "@/components/icons";
import type { MenuItem } from "@/types/content";
import { MenuList } from "./MenuList";

type Props = {
  /** Id do widget original (mantém o CSS de referência). */
  widgetId: string;
  widgetClass: string;
  items: MenuItem[];
  current: string;
};

/** Menu do topo com botão "hambúrguer" (mesmo comportamento do menu original). */
export function NavMenu({ widgetId, widgetClass, items, current }: Props) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<React.CSSProperties>({});
  const toggleRef = useRef<HTMLDivElement>(null);

  // Menu suspenso ocupa a largura toda da tela, logo abaixo do botão.
  const stretch = useCallback(() => {
    const t = toggleRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    setPos({
      width: `${document.body.clientWidth}px`,
      left: `${-Math.round(r.left)}px`,
      top: `${t.offsetHeight}px`,
    });
  }, []);

  useEffect(() => {
    stretch();
    window.addEventListener("resize", stretch);
    return () => window.removeEventListener("resize", stretch);
  }, [stretch]);

  const toggle = () => {
    stretch();
    setOpen((o) => !o);
  };

  return (
    <div
      className={`elementor-element elementor-element-${widgetId} ${widgetClass}`}
    >
      <div className="elementor-widget-container">
        <nav
          aria-label="Menu"
          className="elementor-nav-menu--main elementor-nav-menu__container elementor-nav-menu--layout-horizontal e--pointer-background e--animation-fade"
        >
          <MenuList
            id={`menu-1-${widgetId}`}
            className="elementor-nav-menu"
            items={items}
            current={current}
          />
        </nav>
        <div
          ref={toggleRef}
          className={
            open
              ? "elementor-menu-toggle elementor-active"
              : "elementor-menu-toggle"
          }
          role="button"
          tabIndex={0}
          aria-label="Menu Toggle"
          aria-expanded={open}
          onClick={toggle}
          onKeyUp={(e) => (e.key === "Enter" || e.key === " ") && toggle()}
        >
          <IconMenuBar
            aria-hidden="true"
            role="presentation"
            className="elementor-menu-toggle__icon--open e-font-icon-svg e-eicon-menu-bar"
          />
          <IconClose
            aria-hidden="true"
            role="presentation"
            className="elementor-menu-toggle__icon--close e-font-icon-svg e-eicon-close"
          />
          <span className="elementor-screen-only">Menu</span>
        </div>
        <nav
          className="elementor-nav-menu--dropdown elementor-nav-menu__container"
          aria-hidden={!open}
          style={
            open ? { ...pos, ["--menu-height" as string]: "1000vmax" } : pos
          }
        >
          <MenuList
            id={`menu-2-${widgetId}`}
            className="elementor-nav-menu"
            items={items}
            current={current}
            dropdown
            open={open}
          />
        </nav>
      </div>
    </div>
  );
}
