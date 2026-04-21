import Link from "next/link";
import {
  getSetting,
  parseLineList,
  parseLinkList,
  type SiteSettingsMap,
} from "@/lib/settings";

export function SiteFooter({ settings }: { settings: SiteSettingsMap }) {
  const footerLinks = parseLinkList(getSetting(settings, "footer_nav_links"));
  const footerLines = parseLineList(getSetting(settings, "footer_contact_lines"));

  return (
    <footer className="border-t border-white/70 bg-slate-950 text-slate-200">
      <div className="container-shell grid gap-8 py-12 sm:py-14 md:grid-cols-2 xl:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            {getSetting(settings, "footer_about_title")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
            {getSetting(settings, "footer_about_description")}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {getSetting(settings, "footer_nav_title")}
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            {footerLinks.map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {getSetting(settings, "footer_contact_title")}
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
            {footerLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell py-4 text-center text-xs text-slate-500 sm:text-left">
          <p>{getSetting(settings, "footer_copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
