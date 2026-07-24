import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/global/Wordmark";
import { footerNav } from "@/config/navigation";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="section-ink mt-24">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Wordmark inverse />
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              {site.tagline} Connected growth systems for ambitious service businesses.
            </p>
          </div>
          <FooterColumn title="System" items={footerNav.system} />
          <FooterColumn title="Capabilities" items={footerNav.capabilities} />
          <FooterColumn title="Industries" items={footerNav.industries} />
          <div>
            <FooterColumn title="Company" items={footerNav.company} />
            <div className="mt-8">
              <FooterColumn title="Legal" items={footerNav.legal} />
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <a href={`mailto:${site.contactEmail}`} className="hover:text-bone">{site.contactEmail}</a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: readonly { label: string; to: string }[] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-widest text-bone/70">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="text-muted-foreground hover:text-bone transition-colors">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
