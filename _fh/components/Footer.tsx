import Link from "next/link";
import { Mail, Linkedin, Github, Youtube, Facebook } from "@/components/SocialIcons";

const nav = {
  Platform: [
    { label: "Courses",   href: "/courses" },
    { label: "Insights",  href: "/insights" },
    { label: "AI Tools",  href: "/ai-tools" },
    { label: "Resources", href: "/resources" },
  ],
  Company: [
    { label: "About",    href: "/about" },
    { label: "Services", href: "/services" },
  ],
};

const social = [
  { icon: Linkedin, href: "https://linkedin.com/in/naveensharmatech",         label: "LinkedIn" },
  { icon: Github,   href: "https://github.com/naveensharmatech",              label: "GitHub" },
  { icon: Youtube,  href: "https://youtube.com/@nsfreelance",                 label: "YouTube" },
  { icon: Facebook, href: "https://www.facebook.com/share/1CywcrZ78z/",       label: "Facebook" },
  { icon: Mail,     href: "https://mail.google.com/mail/?view=cm&fs=1&to=hello@opility.com&su=Hello%20Opility", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0f1e] mt-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/opility-logo.png" alt="Opility" className="h-9 w-9 object-contain" />
              <span className="text-lg font-bold text-cyan-400">
                Opility
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Opility — courses, AI tools, QA testing, SaaS resources, and professional IT services for tech professionals.
            </p>
            <div className="flex gap-3 mt-5">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(nav).map(([section, items]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">{section}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Opility. Registered Authorised Dealer, Israel.</p>
          <p>Built by <a href="https://naveensharma.net" className="hover:text-white transition-colors">Naveen Sharma</a></p>
        </div>
      </div>
    </footer>
  );
}
