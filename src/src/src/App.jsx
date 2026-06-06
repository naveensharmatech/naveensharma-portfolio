import { useState } from "react";
import {
  Menu, X, Mail, Github, MapPin, Globe, ArrowRight, CheckCircle2,
  Workflow, Headset, ShieldCheck, FileText, Layers, Database,
  ClipboardCheck, Code2, ExternalLink, Phone, Linkedin,
} from "lucide-react";

/* ─── DATA ───────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "About",       href: "#about" },
  { label: "Expertise",   href: "#expertise" },
  { label: "Experience",  href: "#experience" },
  { label: "Case Studies",href: "#casestudies" },
  { label: "Services",    href: "#services" },
  { label: "Projects",    href: "#projects" },
  { label: "Contact",     href: "#contact" },
];

const EXPERTISE = [
  { icon: Layers,        title: "SaaS Implementation",       desc: "End-to-end configuration, system setup, and customer onboarding for SaaS platforms." },
  { icon: Headset,       title: "Product & Technical Support",desc: "Tier 2/3 troubleshooting, escalation management, and customer support operations." },
  { icon: ClipboardCheck,title: "Quality Assurance & UAT",   desc: "Functional, regression, and release validation aligned to structured QA methodology." },
  { icon: Workflow,      title: "Workflow Automation",        desc: "Intake process design, document automation, and data mapping across systems." },
  { icon: Database,      title: "API Validation",             desc: "API testing and validation with Postman across integrated healthcare workflows." },
  { icon: FileText,      title: "Technical Documentation",    desc: "SOPs, process documentation, and QA documentation that teams can rely on." },
];

const EXPERIENCES = [
  {
    company: "Bolt Healthcare",
    period: "2022 – 2026",
    context: "Healthcare SaaS",
    roles: ["Technical Support Specialist", "SaaS Operations Specialist", "SaaS Implementation & Product Specialist (QA & Automation)"],
    points: [
      "Implemented and configured SaaS workflows for healthcare intake systems, including dynamic PDF mapping and document automation.",
      "Validated APIs with Postman and performed UAT, functional, and regression testing across product releases.",
      "Provided Tier 2/3 technical support, tracked defects in Jira, and coordinated delivery in Basecamp.",
      "Supported HHAeXchange integrations and carried out data integrity audits and release validation.",
    ],
  },
  {
    company: "Vishay Intertechnology",
    period: "Earlier experience",
    context: "Electronics Manufacturing",
    roles: ["Quality Control & Validation Operator"],
    points: [
      "Performed quality control and precision validation within an electronics manufacturing environment.",
      "Followed structured compliance processes and manufacturing QA standards.",
    ],
  },
];

const CASE_STUDIES = [
  {
    title: "Healthcare Intake Workflow Configuration",
    tag: "Bolt Healthcare · Case Study",
    challenge: "A healthcare agency using the Bolt Intake App needed complex intake workflows configured and validated before go-live. Misconfigured workflows were causing data gaps in client onboarding pipelines and creating downstream compliance risk.",
    role: "SaaS Implementation & Product Specialist — led end-to-end workflow configuration, UAT planning, and pre-production validation.",
    solution: "Configured system workflows and intake form logic against business and compliance requirements. Ran structured UAT cycles, documented failures, and iterated with engineering until the workflow met production standards. Built supporting SOPs to help non-technical intake coordinators operate the system confidently.",
    outcome: "Delivered a validated intake configuration that passed UAT, met healthcare compliance expectations, and was successfully promoted to production with minimal post-launch support tickets.",
  },
  {
    title: "Dynamic PDF Mapping & Document Automation",
    tag: "Bolt Healthcare · Case Study",
    challenge: "Dynamic compliance PDFs — including state billing forms and e-signature packets — were failing to compile or dropping critical fields such as Medicaid IDs and client identifiers. Root cause was mismatched API payloads between the intake CRM and the PDF generation engine.",
    role: "SaaS Implementation & Product Specialist — responsible for payload analysis, field re-mapping, and QA validation of the document generation pipeline.",
    solution: "Audited the API endpoints connecting the intake CRM to the PDF engine. Re-mapped nested JSON payload variables to the precise field coordinates in the dynamic PDF templates. Validated data integrity end-to-end and documented the mapping schema for future reference and team handoff.",
    outcome: "Document generation failures were significantly reduced, field alignment improved across compliance forms, and the mapping schema became a reusable reference for subsequent client onboarding configurations.",
  },
  {
    title: "API Validation & Release Testing",
    tag: "Bolt Healthcare · Case Study",
    challenge: "Multiple API integrations required thorough validation before each production release. Schema mismatches — including character truncation, mismatched variable types, and special character handling — were causing PDF compilation errors and data loss in high-volume submissions.",
    role: "QA & API Validation Specialist — designed and executed Postman-based test collections covering both standard and negative edge-case scenarios.",
    solution: "Built structured Postman test collections to audit data transfers between front-end CRM webhooks and backend systems. Designed negative test cases to expose edge conditions such as oversized text strings, null values, and special characters. Tracked all defects in Jira through to engineering resolution.",
    outcome: "Key schema mismatches were identified and resolved prior to release. The test collections remained as reusable validation assets for subsequent release cycles, reducing regression testing time.",
  },
  {
    title: "HHAeXchange Integration Support",
    tag: "Bolt Healthcare · Case Study",
    challenge: "Ensuring reliable data exchange between the Bolt Healthcare platform and HHAeXchange across multiple rollouts required ongoing validation, timely issue resolution, and clear escalation when integration failures impacted agency operations.",
    role: "SaaS Implementation & Technical Support Specialist — managed integration testing, Tier 2/3 escalation, and client-facing support across release cycles.",
    solution: "Executed integration testing across each release, tracked data inconsistencies between systems, and resolved issues reported by end users through structured escalation. Maintained clear defect logs in Jira and coordinated fixes with engineering in Basecamp.",
    outcome: "Integration reliability was maintained across multiple rollouts. Escalation response time improved through clearer defect documentation and engineering communication protocols established during the engagement.",
  },
];

const SERVICES = [
  { icon: Layers,     title: "SaaS Implementation & Setup",   items: ["SaaS implementation support", "Workflow configuration", "System setup", "Data mapping", "Intake process design"] },
  { icon: Headset,    title: "Product & Customer Support",     items: ["Product support", "Technical troubleshooting", "Customer support operations", "Escalation management"] },
  { icon: ShieldCheck,title: "QA & Validation",                items: ["UAT", "Functional testing", "Regression testing", "API validation", "Validation processes"] },
  { icon: FileText,   title: "Automation & Documentation",     items: ["Workflow automation", "Document automation", "Technical documentation", "SOPs & process documentation", "QA documentation"] },
];

const PROJECTS = [
  {
    icon: ClipboardCheck,
    title: "Warehouse Management System — Software Test Plan",
    tag: "QA Certification Project",
    desc: "Test planning and strategy demonstrating risk analysis, regression and sanity testing, and the full defect lifecycle.",
    skills: ["Test Planning", "Risk Analysis", "Regression Testing", "Defect Lifecycle"],
  },
  {
    icon: ClipboardCheck,
    title: "Netflix Subscription — Software Test Plan",
    tag: "QA Certification Project",
    desc: "Structured QA documentation covering methodology, risk assessment, and test execution planning.",
    skills: ["Test Documentation", "QA Methodology", "Risk Assessment", "Test Execution"],
  },
  {
    icon: Code2,
    title: "Django Blogging CMS",
    tag: "BCA Graduation Project",
    desc: "A content management system built to demonstrate technical learning and development skills — authentication, CRUD operations, category management, and an admin dashboard.",
    skills: ["Python", "Django", "MySQL", "MongoDB", "Bootstrap", "AJAX"],
  },
];

const TOOL_CATEGORIES = [
  {
    label: "SaaS, QA & Technical Operations",
    sublabel: "Core professional tooling",
    emphasis: true,
    tools: ["Postman", "Jira", "Basecamp", "GitHub", "Visual Studio Code", "Cloudflare"],
  },
  {
    label: "AI-Assisted Productivity & Development",
    sublabel: "Used to enhance and accelerate professional work",
    emphasis: false,
    tools: ["Gemini Code Assist", "Claude", "Gemini", "Google AI Studio", "GitHub Copilot", "ChatGPT", "Perplexity"],
  },
  {
    label: "Design & Content",
    sublabel: "Supporting documentation and presentation",
    emphasis: false,
    tools: ["Canva"],
  },
];

/* ─── COMPONENTS ─────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3">
          <img
            src="/freelancehub-logo.png"
            alt="FreelanceHub — Naveen Sharma"
            className="h-10 w-auto object-contain"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-slate-900">Naveen Sharma</span>
            <span className="text-xs font-medium text-blue-700">SaaS Implementation · Support · QA</span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-blue-700">
              {link.label}
            </a>
          ))}
          <a href="#contact"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800">
            Get in touch
          </a>
        </nav>

        <button onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 transition hover:text-blue-700">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="mt-3 mb-2 rounded-lg bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800">
              Get in touch
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-700/60 px-3 py-1 text-xs font-medium text-slate-200">
            <MapPin size={13} /> Be'er Sheva, Israel
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-700/60 px-3 py-1 text-xs font-medium text-slate-200">
            Remote · Hybrid · On-Site
          </span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          SaaS Implementation Specialist • Product Support • QA & API Validation
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">
          I combine hands-on SaaS implementation, product support, API validation, and quality
          assurance to help organizations deploy, support, and improve business-critical workflows.
          I also operate as a registered independent B2B contractor under{" "}
          <span className="font-semibold text-white">FreelanceHub</span>.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
            Work with me <ArrowRight size={16} />
          </a>
          <a href="#services"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700/60">
            View services
          </a>
          <a href="/Naveen_Sharma_CV.pdf" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700/60">
            View Resume
          </a>
          <a href="/Naveen_Sharma_CV.pdf" download
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700/60">
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-12 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>
      )}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="About" title="Professional profile" />
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-lg leading-relaxed text-slate-700">
              I combine hands-on SaaS implementation, product support, API validation, and quality
              assurance to help organizations deploy, support, and improve business-critical workflows.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-slate-700">
              With 8+ years of professional experience, including 4+ years across healthcare SaaS
              platforms, I'm comfortable partnering with engineering, QA, and product teams to keep
              delivery moving and dependable.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">At a glance</h3>
            <dl className="mt-4 space-y-4 text-sm">
              <div><dt className="text-slate-500">Focus</dt><dd className="font-medium text-slate-900">SaaS Implementation · Support · QA</dd></div>
              <div><dt className="text-slate-500">Experience</dt><dd className="font-medium text-slate-900">8+ years · 4+ in healthcare SaaS</dd></div>
              <div><dt className="text-slate-500">Engagement</dt><dd className="font-medium text-slate-900">Full-time · Hybrid · Remote · B2B contract</dd></div>
              <div><dt className="text-slate-500">Tooling</dt><dd className="font-medium text-slate-900">Jira · Basecamp · Postman</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Expertise" title="Core areas I work in"
          description="The practical capabilities I bring to implementation, support, and quality work." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <div className="space-y-8">
          {EXPERIENCES.map((exp) => (
            <div key={exp.company}
              className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:shadow-md">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{exp.company}</h3>
                  <p className="mt-1 text-sm font-medium text-blue-700">{exp.context}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {exp.period}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.roles.map((role) => (
                  <span key={role}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                    {role}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-3">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section id="casestudies" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Case Studies · Bolt Healthcare"
          title="Real-world implementation work"
          description="A closer look at the types of challenges I solved across healthcare SaaS implementation, QA, and API validation. No confidential data is disclosed." />
        <div className="grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">{cs.tag}</span>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{cs.title}</h3>

              <div className="mt-5 space-y-4">
                {[
                  { label: "Challenge", text: cs.challenge, color: "bg-red-50 text-red-700" },
                  { label: "Role",      text: cs.role,      color: "bg-blue-50 text-blue-700" },
                  { label: "Solution",  text: cs.solution,  color: "bg-slate-100 text-slate-700" },
                  { label: "Outcome",   text: cs.outcome,   color: "bg-green-50 text-green-700" },
                ].map(({ label, text, color }) => (
                  <div key={label}>
                    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${color}`}>
                      {label}
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">FreelanceHub</p>
          <h2 className="text-3xl font-bold tracking-tight">Services for SaaS, healthcare & growing teams</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            As a registered independent B2B contractor, I support startups, SaaS companies, healthcare
            platforms, and international and local clients across implementation, support, and quality.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title}
                className="rounded-2xl border border-slate-700 bg-slate-800/60 p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
                <ul className="mt-5 space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Projects" title="Selected work & study"
          description="QA test planning certification projects alongside an academic development project." />
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <div key={project.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Icon size={20} />
                </div>
                <span className="mt-5 text-xs font-semibold uppercase tracking-wide text-blue-700">{project.tag}</span>
                <h3 className="mt-2 text-base font-bold leading-snug text-slate-900">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{project.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span key={skill}
                      className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Tools"
          title="Tools I work with"
          description="My core professional tooling spans SaaS implementation, QA, API validation, and technical operations. AI tools are used to enhance productivity — they support the work, not replace the expertise."
        />
        <div className="space-y-6">
          {TOOL_CATEGORIES.map((cat) => (
            <div key={cat.label}
              className={`rounded-2xl border p-7 ${cat.emphasis
                ? "border-blue-200 bg-white shadow-sm"
                : "border-slate-200 bg-white"}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className={`text-base font-bold ${cat.emphasis ? "text-slate-900" : "text-slate-700"}`}>
                    {cat.label}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500">{cat.sublabel}</p>
                </div>
                {cat.emphasis && (
                  <span className="rounded-full bg-blue-700 px-3 py-1 text-xs font-semibold text-white">
                    Primary
                  </span>
                )}
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {cat.tools.map((tool) => (
                  <span key={tool}
                    className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition ${cat.emphasis
                      ? "border-blue-200 bg-blue-50 text-blue-800"
                      : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-400">Contact</p>
            <h2 className="text-3xl font-bold tracking-tight">
              Let's talk about your implementation, support, or QA needs
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300">
              Available for full-time, hybrid, and remote roles, as well as B2B contract engagements
              through FreelanceHub. I'll reply to serious enquiries promptly.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/Naveen_Sharma_CV.pdf" target="_blank" rel="noreferrer"
                className="rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-slate-700/60">
                View Resume
              </a>
              <a href="/Naveen_Sharma_CV.pdf" download
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500">
                Download Resume (PDF)
              </a>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { href: "mailto:naveen.freelancehub@gmail.com", icon: Mail,    label: "Email",    text: "naveen.freelancehub@gmail.com", external: false },
              { href: "https://linkedin.com/in/freelancehub", icon: Linkedin, label: "LinkedIn", text: "linkedin.com/in/freelancehub",       external: true  },
              { href: "https://github.com/naveensharmatech",  icon: Github,   label: "GitHub",   text: "github.com/naveensharmatech",        external: true  },
              { href: "https://naveensharma.net",             icon: Globe,    label: "Website",  text: "naveensharma.net",                   external: true  },
            ].map(({ href, icon: Icon, label, text, external }) => (
              <a key={label} href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/60 p-5 transition hover:border-blue-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm font-medium">{text}</p>
                </div>
                {external && <ExternalLink size={15} className="ml-auto text-slate-500" />}
              </a>
            ))}

            <a href="tel:+972507896289"
              className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/60 p-5 transition hover:border-blue-500">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Phone</p>
                <p className="text-sm font-medium">058-789-6289</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/60 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-sm font-medium">Be'er Sheva, Israel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Main logo */}
          <div className="flex items-center gap-4">
            <img
              src="/freelancehub-logo.png"
              alt="FreelanceHub"
              className="h-12 w-auto object-contain opacity-90"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>

          <div className="text-center text-sm sm:text-right">
            <p className="font-medium text-slate-300">Naveen Sharma · FreelanceHub</p>
            <p className="mt-1 text-xs">SaaS Implementation · Product Support · Quality Assurance</p>
            <p className="mt-1 text-xs">© {new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>

        {/* Stamp */}
        <div className="mt-8 flex justify-center">
          <img
            src="/freelancehub-stamp.png"
            alt="FreelanceHub — Freelancing Services by Naveen Sharma"
            className="h-24 w-auto object-contain opacity-60"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <CaseStudies />
        <Services />
        <Projects />
        <Tools />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
