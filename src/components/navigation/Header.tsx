import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/global/Wordmark";
import { mainNav } from "@/config/navigation";
import { site } from "@/config/site";
import { LeadFormDialog } from "@/components/forms/LeadFormDialog";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Wordmark />
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 text-sm">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{
                className: "text-muted-foreground hover:text-foreground transition-colors",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="sm"
            className="hidden md:inline-flex rounded-full px-5"
            onClick={() => setFormOpen(true)}
          >
            {site.primaryCta.label.replace("Book a ", "Book an ")}
          </Button>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-background transition-[max-height]",
          open ? "max-h-[80vh]" : "max-h-0",
        )}
      >
        <div className="container-x py-6 flex flex-col gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base text-foreground hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.phone.href}
            aria-label={`Call Stonehurst Lane on ${site.phone.display}`}
            className="rounded-md px-3 py-3 text-base text-foreground hover:bg-muted"
          >
            Call {site.phone.display}
          </a>
          <Button
            className="mt-4 rounded-full"
            onClick={() => {
              setOpen(false);
              setFormOpen(true);
            }}
          >
            {site.primaryCta.label}
          </Button>
        </div>
      </div>
      <LeadFormDialog open={formOpen} onOpenChange={setFormOpen} placement="cta-modal" />
    </header>
  );
}
