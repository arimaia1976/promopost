import type { MenuItem } from "@/types/content";

type Props = {
  id: string;
  className: string;
  items: MenuItem[];
  current: string;
  /** Lista do menu suspenso: links fora da tabulação enquanto fechado. */
  dropdown?: boolean;
  open?: boolean;
};

export function isCurrent(href: string, current: string) {
  const norm = (s: string) => (s.endsWith("/") ? s : s + "/");
  return norm(href) === norm(current);
}

export function MenuList({
  id,
  className,
  items,
  current,
  dropdown,
  open,
}: Props) {
  return (
    <ul id={id} className={className}>
      {items.map((item) => {
        const active = isCurrent(item.href, current);
        return (
          <li
            key={item.href}
            className={active ? "menu-item current-menu-item" : "menu-item"}
          >
            <a
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "elementor-item elementor-item-active"
                  : "elementor-item"
              }
              tabIndex={dropdown && !open ? -1 : undefined}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
