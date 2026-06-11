import Link from "next/link";
import {
  Globe,
  Settings,
  HeadphonesIcon,
  CheckSquare,
  Bot,
  Briefcase,
  ArrowRight,
  Mail,
} from "lucide-react";

const CONTACT_EMAIL = "naveen.freelancehub@gmail.com";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Design & Development",
    description:
      "Custom websites built to perform — from marketing sites to full e-commerce stores.",
    bullets: [
      "React & Next.js web applications",
      "WordPress design and development",
      "Shopify store setup and customization",
      "Performance optimization and SEO basics",
      "Responsive, mobile-first design",
      "Hosting setup and deployment",
    ],
  },
  {
    icon: Settings,
    title: "SaaS Implementation & Setup",
    description:
      "Get your SaaS platforms implemented correctly, configured for your workflows, and adopted by your team.",
    bullets: [
      "Platform onboarding and configuration",
      "Workflow design and process mapping",
      "User setup and permission management",
      "Integration between SaaS tools",
      "Training documentation and SOPs",
      "Go-live support and hypercare",
    ],
  },
  {
    icon: HeadphonesIcon,
    title: "Product & Customer Support",
    description:
      "Technical support operations built on healthcare-grade standards — for SaaS and digital products.",
    bullets: [
      "Tier 1 / Tier 2 support setup",
      "Support documentation and knowledge base",
      "Bug triage and escalation workflows",
      "Customer onboarding processes",
      "Ticketing system setup (Zendesk, Jira, etc.)",
      "Support team training and handoff",
    ],
  },
  {
    icon: CheckSquare,
    title: "QA & Validation",
    description:
      "Thorough quality assurance for web applications, SaaS products, and APIs before you go live.",
    bullets: [
      "Manual functional and regression testing",
      "Test plan and test case creation",
      "API testing with Postman",
      "Bug reporting and defect tracking",
      "UAT coordination and support",
      "Validation documentation (IQ/OQ ready)",
    ],
  },
  {
    icon: Bot,
    title: "Automation & Documentation",
    description:
      "Save time with process automation and clear documentation that your team will actually use.",
    bullets: [
      "Workflow automation (Zapier, Make, etc.)",
      "SOP and process documentation",
      "Technical writing and user guides",
      "Template creation and standardization",
      "Onboarding checklist design",
      "Knowledge base setup",
    ],
  },
  {
    icon: Briefcase,
    title: "Career & Professional Presence",
    description:
      "Build a professional online presence that gets you noticed by recruiters and clients.",
    bullets: [
      "LinkedIn profile optimization",
      "ATS-optimized resume writing",
      "Professional portfolio site",
      "GitHub profile and README setup",
      "Personal branding strategy",
      "Job search document package",
    ],
  },
];

export default function ServicesPage() {
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=FreelanceHub%20Service%20Enquiry`;

  return (
    <div className="bg-[#0f172a] text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-12">
          <div className="h-[400px] w-[600px] rounded-full bg-blue-600/15 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Professional IT Services
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We build, implement, and support — so you can focus on your business.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:border-blue-500/30 transition-all flex flex-col"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600/20 mb-4">
                  <service.icon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 flex-1 mb-6">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  Get a Quote <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing note */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-6 text-center">
            <p className="text-slate-400 text-sm">
              <span className="text-white font-medium">Pricing note: </span>
              All pricing is on request — we scope each project individually to give you an accurate,
              fair quote with no surprises.
            </p>
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
              <Mail size={32} className="text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s talk about your project</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                Describe what you need and we&apos;ll get back to you with a scope and quote. No
                obligation, no hard sell.
              </p>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
              >
                <Mail size={16} />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
