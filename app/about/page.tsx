import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  Globe,
  TrendingUp,
  Star,
  Wrench,
  Heart,
  CheckCircle,
  Mail,
  ArrowRight,
  MapPin,
  Briefcase,
} from "lucide-react";
import { Linkedin, Github, Youtube, Facebook } from "@/components/SocialIcons";

const CONTACT_EMAIL = "naveen.freelancehub@gmail.com";

const PILLARS = [
  {
    icon: BookOpen,
    title: "Learn",
    description:
      "Practical courses on AI tools, QA testing, SaaS implementation, web development, and career skills — taught from real experience.",
    href: "/courses",
    cta: "Browse Courses",
  },
  {
    icon: Lightbulb,
    title: "Discover",
    description:
      "Stay sharp with a curated AI tools directory and regular insights covering tech news, tutorials, and industry commentary.",
    href: "/insights",
    cta: "Read Insights",
  },
  {
    icon: Globe,
    title: "Build",
    description:
      "Professional web design and development, SaaS implementation, QA validation, and automation services for growing businesses.",
    href: "/services",
    cta: "View Services",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    description:
      "Career services to help tech professionals land better roles — LinkedIn optimization, ATS resumes, portfolio sites, and more.",
    href: "/services",
    cta: "Career Services",
  },
];

const VALUES = [
  {
    icon: Star,
    title: "Real Experience",
    description:
      "Everything on FreelanceHub comes from lived experience — not aggregated content or recycled theory. 8+ years of doing the work.",
  },
  {
    icon: Wrench,
    title: "Practical Skills",
    description:
      "No fluffy frameworks or academic concepts. Every course, resource, and service is designed to be immediately applicable.",
  },
  {
    icon: Heart,
    title: "Honest Advice",
    description:
      "No upsells. No hidden paywalls. If something is free, it's actually free. Recommendations are based on real-world testing, not affiliate commissions.",
  },
  {
    icon: CheckCircle,
    title: "Quality Work",
    description:
      "Healthcare-grade standards applied to everything — from QA documentation to client websites. If it goes out under the FreelanceHub name, it's done right.",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/naveensharma",
    color: "hover:text-blue-400",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/naveensharma",
    color: "hover:text-slate-200",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://youtube.com/@freelancehub",
    color: "hover:text-red-400",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://facebook.com/freelancehub",
    color: "hover:text-blue-500",
  },
];

export default function AboutPage() {
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=Hello%20from%20FreelanceHub`;

  return (
    <div className="bg-[#0f172a] text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-12">
          <div className="h-[400px] w-[600px] rounded-full bg-blue-600/15 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About FreelanceHub</h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We exist to make professional tech skills accessible and to help businesses implement
            technology that actually works.
          </p>
        </div>
      </section>

      {/* Naveen's Story */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">The story behind FreelanceHub</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  FreelanceHub was built by{" "}
                  <span className="text-white font-medium">Naveen Sharma</span> — a tech
                  professional with 8+ years of experience across web development, QA engineering,
                  SaaS implementation, and product support.
                </p>
                <p>
                  For the past 4+ years, Naveen has worked in healthcare SaaS at{" "}
                  <span className="text-white font-medium">Bolt Healthcare</span>, implementing
                  enterprise software solutions and supporting clinical teams with technology that
                  has to work reliably — no exceptions.
                </p>
                <p>
                  Based in Israel and operating as a registered freelancer (
                  <span className="text-white font-medium">Osek Murshe</span>), Naveen holds a
                  Bachelor&apos;s degree in Computer Applications (BCA) and has spent years bridging
                  the gap between technical teams and business stakeholders.
                </p>
                <p>
                  FreelanceHub IT Services is the professional services arm — for clients who need
                  websites built, SaaS platforms implemented, products QA&apos;d, or automation
                  set up.
                </p>
              </div>
            </div>

            {/* Stats card */}
            <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">8+</div>
                  <div className="text-sm text-slate-400">Years in Tech</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">4+</div>
                  <div className="text-sm text-slate-400">Years Healthcare SaaS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">BCA</div>
                  <div className="text-sm text-slate-400">Degree in CS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">100%</div>
                  <div className="text-sm text-slate-400">Free to Start</div>
                </div>
              </div>
              <div className="space-y-3 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <MapPin size={15} className="text-blue-400 flex-shrink-0" />
                  Based in Israel — serving clients worldwide
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Briefcase size={15} className="text-blue-400 flex-shrink-0" />
                  Bolt Healthcare — Senior SaaS Implementation
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <CheckCircle size={15} className="text-blue-400 flex-shrink-0" />
                  Registered Osek Murshe (Sole Proprietor)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="py-24 px-4 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">What FreelanceHub Offers</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Four pillars — each designed to help professionals and businesses get further, faster.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:border-blue-500/30 transition-all flex flex-col"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600/20 mb-4">
                  <pillar.icon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">{pillar.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                  {pillar.description}
                </p>
                <Link
                  href={pillar.href}
                  className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {pillar.cta} <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              These aren&apos;t platitudes. They&apos;re the operating principles that shape every
              course, resource, and service we produce.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600/20 mb-4">
                  <value.icon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-blue-600/10 p-12 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[500px] rounded-full bg-blue-600/20 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">Say hello</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                Whether it&apos;s a project enquiry, a course question, or just a quick hello —
                reach out directly.
              </p>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors mb-8"
              >
                <Mail size={16} />
                {CONTACT_EMAIL}
              </a>
              <div className="flex items-center justify-center gap-4 mt-6">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`text-slate-500 transition-colors ${social.color}`}
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
