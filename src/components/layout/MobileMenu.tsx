"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { NavItem } from "@/lib/navigation";
import { Brand } from "./Brand";
import { NavLinks } from "./NavLinks";

type Props = {
  items: readonly NavItem[];
  cv: NavItem | null;
  contact: NavItem;
};

// A native <dialog> opened with showModal() provides the focus trap, Escape to
// close, inert page content and focus return without any extra code.
export function MobileMenu({ items, cv, contact }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  // Close after any navigation, including the browser back button.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="inline-flex size-11 items-center justify-center rounded-control text-fg-strong hover:text-accent md:hidden"
      >
        <Icon name="menu" className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Site menu"
        className="m-0 hidden h-dvh max-h-none w-dvw max-w-none flex-col bg-bg p-0 text-fg backdrop:bg-bg open:flex md:hidden"
      >
        <div className="page-gutter flex h-16 shrink-0 items-center justify-between">
          <Brand />
          <button
            type="button"
            onClick={close}
            className="inline-flex size-11 items-center justify-center rounded-control text-fg-strong hover:text-accent"
          >
            <Icon name="close" className="size-6" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>

        <nav aria-label="Mobile" className="page-gutter flex-1 overflow-y-auto pt-6">
          <NavLinks items={items} variant="stack" onNavigate={close} />
        </nav>

        <div className="page-gutter flex flex-col gap-3 border-t border-line pb-8 pt-6">
          <ButtonLink href={contact.href} size="lg" arrow="right" onClick={close}>
            {contact.label}
          </ButtonLink>
          {cv ? (
            <ButtonLink href={cv.href} size="lg" variant="outline" onClick={close}>
              {cv.label}
            </ButtonLink>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
