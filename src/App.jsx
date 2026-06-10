import { useState, useEffect } from "react";
import {
  Menu, X, Mail, Github, MapPin, Globe, ArrowRight, CheckCircle2,
  Workflow, Headset, ShieldCheck, FileText, Layers, Database,
  ClipboardCheck, Code2, ExternalLink, Phone, Linkedin, Facebook, ChevronDown,
} from "lucide-react";

/* ─── DATA ───────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "Expertise",    href: "#expertise" },
  { label: "Experience",   href: "#experience" },
  { label: "Case Studies", href: "#casestudies" },
  { label: "Services",     href: "#services" },
  { label: "Projects",     href: "#projects" },
  { label: "FAQ",          href: "#faq" },
  { label: "Contact",      href: "#contact" },
];

const HEADLINES = [
  "SaaS Implementation Specialist",
  "API Validation Expert",
  "QA & UAT Engineer",
  "Product Support Specialist",
  "B2B Technical Contractor",
];

const EXPERTISE = [
  { icon: Layers,         title: "SaaS Implementation",        desc: "End-to-end configuration, system setup, and customer onboarding for SaaS platforms." },
  { icon: Headset,        title: "Product & Technical Support", desc: "Tier 2/3 troubleshooting, escalation management, and customer support operations." },
  { icon: ClipboardCheck, title: "Quality Assurance & UAT",    desc: "Functional, regression, and release validation aligned to structured QA methodology." },
  { icon: Workflow,       title: "Workflow Automation",         desc: "Intake process design, document automation, and data mapping across systems." },
  { icon: Database,       title: "API Validation",              desc: "API testing and validation with Postman across integrated healthcare workflows." },
  { icon: FileText,       title: "Technical Documentation",     desc: "SOPs, process documentation, and QA documentation that teams can rely on." },
  { icon: Globe,          title: "Website Design & Development", desc: "Building and deploying responsive business websites using React, Tailwind CSS, GitHub, Cloudflare Pages, and AI-assisted development tools." },
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
    period: "2021 – 2022",
    context: "Electronics Manufacturing",
    roles: ["Quality Control & Validation Operator"],
    points: [
      "Performed quality control and precision validation within an electronics manufacturing environment.",
      "Followed structured compliance processes and manufacturing QA standards.",
    ],
  },
  {
    company: "Shivam Institute (S.I.V.T)",
    period: "Aug 2012 – Sep 2015",
    context: "Technical Training Centre · Dharamshala",
    roles: ["Founder / Operations Manager"],
    points: [
      "Managed the full operational lifecycle of a technical training centre — scheduling, supplier coordination, staff management, and IT infrastructure.",
      "Oversaw training systems, operational workflows, and day-to-day technical operations.",
    ],
  },
];

const CASE_STUDIES = [
  {
    title: "Healthcare Intake Workflow Configuration",
    tag: "Bolt Healthcare · Case Study",
    challenge: "A healthcare agency using the Bolt Intake App needed complex intake workflows configured and validated before go-live. Misconfigured workflows were causing data gaps in client onboarding pipelines and creating downstream compliance risk.",
    role: "SaaS Implementation & Product Specialist — led end-to-end workflow configuration, UAT planning, and pre-production validation.",
    solution: "Configured system workflows and intake form logic against business and compliance requirements. Ran structured UAT cycles, documented failures, and iterated with engineering until the workflow met production standards.",
    outcome: "Delivered a validated intake configuration that passed UAT, met healthcare compliance expectations, and was successfully promoted to production.",
  },
  {
    title: "Dynamic PDF Mapping & Document Automation",
    tag: "Bolt Healthcare · Case Study",
    challenge: "Dynamic compliance PDFs were failing to compile or dropping critical fields such as Medicaid IDs. Root cause was mismatched API payloads between the intake CRM and the PDF generation engine.",
    role: "SaaS Implementation & Product Specialist — responsible for payload analysis, field re-mapping, and QA validation.",
    solution: "Audited API endpoints, re-mapped nested JSON payload variables to dynamic PDF template fields, and validated data integrity end-to-end.",
    outcome: "Document generation failures significantly reduced, field alignment improved across compliance forms.",
  },
  {
    title: "API Validation & Release Testing",
    tag: "Bolt Healthcare · Case Study",
    challenge: "Schema mismatches — including character truncation and mismatched variable types — were causing PDF compilation errors and data loss in high-volume submissions.",
    role: "QA & API Validation Specialist — designed and executed Postman-based test collections covering standard and negative edge-case scenarios.",
    solution: "Built structured Postman test collections, designed negative test cases, and tracked all defects in Jira through to engineering resolution.",
    outcome: "Key schema mismatches identified and resolved. Test collections became reusable validation assets for subsequent release cycles.",
  },
  {
    title: "HHAeXchange Integration Support",
    tag: "Bolt Healthcare · Case Study",
    challenge: "Ensuring reliable data exchange between Bolt Healthcare and HHAeXchange required ongoing validation and timely issue resolution across multiple rollouts.",
    role: "SaaS Implementation & Technical Support Specialist — managed integration testing and Tier 2/3 escalation.",
    solution: "Executed integration testing, tracked data inconsistencies, and resolved issues through structured escalation. Maintained defect logs in Jira and coordinated fixes in Basecamp.",
    outcome: "Integration reliability maintained across multiple rollouts with improved escalation response time.",
  },
];

const SERVICES = [
  { icon: Code2,       title: "Website Design & Development",  items: ["Portfolio & business website development", "React + Vite responsive web development", "Tailwind CSS design & styling", "GitHub version control & deployment", "Cloudflare Pages hosting & CDN setup", "AI-assisted development with Claude", "Canva, Adobe Express & Firefly design assets", "Domain setup & go-live support"] },
  { icon: Layers,      title: "SaaS Implementation & Setup",  items: ["SaaS implementation support", "Workflow configuration", "System setup", "Data mapping", "Intake process design"] },
  { icon: Headset,     title: "Product & Customer Support",    items: ["Product support", "Technical troubleshooting", "Customer support operations", "Escalation management"] },
  { icon: ShieldCheck, title: "QA & Validation",               items: ["UAT", "Functional testing", "Regression testing", "API validation", "Validation processes"] },
  { icon: FileText,    title: "Automation & Documentation",    items: ["Workflow automation", "Document automation", "Technical documentation", "SOPs & process documentation", "QA documentation"] },
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
    tools: ["Postman", "Jira", "Basecamp", "Notion AI", "GitHub", "Visual Studio Code", "Cloudflare", "Wix", "Solo (Mozilla)", "Lovable", "Manus", "Base44", "Hostinger", "SITE123", "Carrd", "Square", "Squarespace"],
  },
  {
    label: "AI-Assisted Productivity & Development",
    sublabel: "Used to enhance and accelerate professional work",
    tools: ["Gemini Code Assist", "Claude", "Gemini", "Google AI Studio", "GitHub Copilot", "ChatGPT", "Perplexity", "Cursor", "v0", "Gamma"],
  },
  {
    label: "Design & Content",
    sublabel: "Supporting documentation and presentation",
    tools: ["Canva", "Adobe Express", "Adobe Firefly", "Creative Cloud Pro", "Frame.io"],
  },
];

/* ─── COMPONENTS ─────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-white shadow-sm border-b border-gray-100" : "bg-white"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" className="flex items-center gap-3">
          <img
            src="/freelancehub-logo.png"
            alt="FreelanceHub"
            className="h-10 w-auto object-contain"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-gray-900">Naveen Sharma</span>
            <span className="text-xs font-medium text-blue-600">FreelanceHub · IT Services</span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-blue-600">
              {link.label}
            </a>
          ))}
          <a href="#contact"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
            Get in touch
          </a>
        </nav>

        <button onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-gray-100 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}
                className="border-b border-gray-100 py-3 text-sm font-medium text-gray-700 transition hover:text-blue-600">
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="mt-3 mb-2 rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white">
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
    <section id="top" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 text-center">

        {/* LinkedIn cover banner — replaces star badge */}
        <div className="mb-4 w-full overflow-hidden rounded-2xl shadow-sm">
          <img
            src="/linkedin-cover.jpeg"
            alt="FreelanceHub — Naveen Sharma"
            className="w-full h-auto"
          />
        </div>

        {/* Name — primary identity */}
        <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-3 mt-6">
          Naveen Sharma
        </h1>

        {/* FreelanceHub framed as his independent services brand */}
        <p className="text-lg font-medium text-gray-500 sm:text-xl mb-7">
          <span className="font-extrabold text-blue-600">FreelanceHub</span>
          {" "}— SaaS Implementation, B2B Contractor, Product Support &amp; QA Services
        </p>

        {/* All specialties shown at once (no rotating headline) */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
          {HEADLINES.map((h) => (
            <span key={h}
              className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {h}
            </span>
          ))}
        </div>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 mb-10">
          I combine hands-on SaaS implementation, product support, API validation, and quality
          assurance to help organizations deploy, support, and improve business-critical workflows.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-700">
            Work with me <ArrowRight size={18} />
          </a>
          <a href="#services"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 px-8 py-4 text-base font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600">
            View services
          </a>
          <a href="/Naveen Sharma General CV.pdf" download
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 px-8 py-4 text-base font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600">
            Download Resume
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-gray-100 pt-12">
          {[
            { num: "8+", label: "Years Experience" },
            { num: "4+", label: "Years Healthcare SaaS" },
            { num: "Tier 2/3", label: "Technical Support" },
            { num: "B2B", label: "Registered Contractor" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-extrabold text-blue-600">{s.num}</p>
              <p className="mt-1 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const tools = ["Postman", "Jira", "Basecamp", "HHAeXchange", "Postman API", "UAT Testing", "Bolt Healthcare", "GitHub", "Cloudflare"];
  return (
    <div className="border-y border-gray-100 bg-gray-50 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          Core tools & platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {tools.map((t) => (
            <span key={t} className="text-sm font-semibold text-gray-400">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, center }) {
  return (
    <div className={`mb-16 ${center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">{eyebrow}</p>
      )}
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">{title}</h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-gray-600">{description}</p>
      )}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="About" title="The specialist behind FreelanceHub"
              description="I combine hands-on SaaS implementation, product support, API validation, and quality assurance to help organizations deploy, support, and improve business-critical workflows." />
            <p className="text-base leading-relaxed text-gray-600">
              With 8+ years of professional experience, including 4+ years across healthcare SaaS
              platforms, I partner with engineering, QA, and product teams to keep delivery moving
              and dependable — from first configuration through to production release.
            </p>
            <a href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
              Get in touch <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Focus", value: "SaaS Implementation · Support · QA" },
              { label: "Experience", value: "8+ years · 4+ in healthcare SaaS" },
              { label: "Engagement", value: "Full-time · Hybrid · Remote · B2B" },
              { label: "Tooling", value: "Jira · Basecamp · Postman" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{item.label}</p>
                <p className="mt-2 text-sm font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Expertise" center title="Core areas I work in"
          description="The practical capabilities I bring to implementation, support, quality work, and website development." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title}
                className="rounded-2xl border border-gray-100 bg-white p-8 transition hover:shadow-lg hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.desc}</p>
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
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />
        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <div key={exp.company}
              className="rounded-2xl border border-gray-100 bg-white p-8 transition hover:shadow-lg">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">{exp.company}</h3>
                  <p className="mt-1 text-sm font-semibold text-blue-600">{exp.context}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-600">
                  {exp.period}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.roles.map((role) => (
                  <span key={role}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                    {role}
                  </span>
                ))}
              </div>
              <ul className="mt-6 space-y-3">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-500" />
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
    <section id="casestudies" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Case Studies · Bolt Healthcare"
          title="Real-world implementation work"
          description="A closer look at the types of challenges I solved across healthcare SaaS implementation, QA, and API validation. No confidential data is disclosed." />
        <div className="grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 transition hover:shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{cs.tag}</span>
              <h3 className="mt-3 text-lg font-extrabold text-gray-900">{cs.title}</h3>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Challenge", text: cs.challenge, color: "bg-red-50 text-red-700" },
                  { label: "Role",      text: cs.role,      color: "bg-blue-50 text-blue-700" },
                  { label: "Solution",  text: cs.solution,  color: "bg-gray-100 text-gray-700" },
                  { label: "Outcome",   text: cs.outcome,   color: "bg-green-50 text-green-700" },
                ].map(({ label, text, color }) => (
                  <div key={label}>
                    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${color}`}>{label}</span>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{text}</p>
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
    <section id="services" className="bg-blue-600 text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-200">FreelanceHub</p>
          <h2 className="text-4xl font-extrabold tracking-tight">Services for SaaS, healthcare, web & growing teams</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            As a registered independent B2B contractor, I support startups, SaaS companies,
            healthcare platforms, and international clients.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={service.title}
                className={`rounded-2xl bg-blue-700/50 p-8 border border-blue-500/30 ${index === 0 ? "sm:col-span-2" : ""}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-blue-100">
                      <CheckCircle2 size={16} className="shrink-0 text-blue-300" />
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
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Projects" title="Selected work & study"
          description="QA test planning certification projects alongside an academic development project." />
        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <div key={project.title}
                className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 transition hover:shadow-lg hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                  <Icon size={22} />
                </div>
                <span className="mt-6 text-xs font-bold uppercase tracking-widest text-blue-600">{project.tag}</span>
                <h3 className="mt-2 text-base font-extrabold leading-snug text-gray-900">{project.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">{project.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span key={skill}
                      className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
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
    <section className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Tools" center title="Tools I work with"
          description="My core professional tooling spans SaaS implementation, QA, API validation, and technical operations. AI tools enhance productivity — they support the work, not replace the expertise." />
        <div className="space-y-6">
          {TOOL_CATEGORIES.map((cat) => (
            <div key={cat.label} className="rounded-2xl border border-gray-100 bg-white p-8">
              <div className="mb-5">
                <h3 className="text-base font-extrabold text-gray-900">{cat.label}</h3>
                <p className="mt-0.5 text-xs text-gray-400">{cat.sublabel}</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.tools.map((tool) => (
                  <span key={tool}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-600">
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

function BrandVideo() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="mb-8 text-lg font-medium text-gray-600 text-center">
          A short introduction to FreelanceHub and the services Naveen Sharma provides.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold text-gray-700">Brand Introduction</p>
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/XYdqYPwYiY4"
                  title="FreelanceHub — Naveen Sharma"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              </div>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-gray-700">FreelanceHub IT Services</p>
            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-lg">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/4dTadaeUE_A"
                  title="FreelanceHub IT Services"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Contact" center
          title="Let's talk about your implementation, support, or QA needs"
          description="Available for full-time, hybrid, and remote roles, as well as B2B contract engagements through FreelanceHub." />

        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center gap-4">
            <a href="/Naveen Sharma General CV.pdf" target="_blank" rel="noreferrer"
              className="rounded-lg border-2 border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition hover:border-blue-400 hover:text-blue-600">
              View Resume
            </a>
            <a href="/Naveen Sharma General CV.pdf" download
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
              Download Resume (PDF)
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "mailto:naveen.freelancehub@gmail.com", icon: Mail,    label: "Email",    text: "naveen.freelancehub@gmail.com", external: false, link: true  },
              { href: "https://linkedin.com/in/freelancehub", icon: Linkedin, label: "LinkedIn", text: "linkedin.com/in/freelancehub",   external: true,  link: true  },
              { href: "https://github.com/naveensharmatech",  icon: Github,   label: "GitHub",   text: "github.com/naveensharmatech",    external: true,  link: true  },
              { href: "https://www.facebook.com/share/18mJRTbUFF/", icon: Facebook, label: "Facebook", text: "FreelanceHub on Facebook",  external: true,  link: true  },
              { href: "https://naveensharma.net",             icon: Globe,    label: "Website",  text: "naveensharma.net",               external: true,  link: true  },
              { href: "tel:+972587896289",                    icon: Phone,    label: "Phone",    text: "058-789-6289",                   external: false, link: true  },
              { href: null,                                   icon: MapPin,   label: "Location", text: "Be'er Sheva, Israel",            external: false, link: false },
            ].map(({ href, icon: Icon, label, text, external, link }) => {
              const classes = "flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 transition hover:border-blue-300 hover:shadow-md";
              const inner = (
                <>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-400">{label}</p>
                    <p className="truncate text-sm font-bold text-gray-900">{text}</p>
                  </div>
                  {external && <ExternalLink size={13} className="shrink-0 text-gray-300" />}
                </>
              );
              return link ? (
                <a key={label} href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className={classes}>
                  {inner}
                </a>
              ) : (
                <div key={label} className={classes}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const LEGAL_DOCS = {
  privacy: {
    title: "Privacy & Data Policy",
    content: [
      { heading: "Who we are", body: "This website is operated by Naveen Sharma trading as FreelanceHub IT Services, a registered independent B2B contractor based in Be'er Sheva, Israel. Contact: naveen.freelancehub@gmail.com" },
      { heading: "What data we collect", body: "This is a static informational website. We do not operate contact forms, user accounts, or any server-side data collection. If you contact us directly by email or via LinkedIn, we collect only the information you choose to share (name, email, message). That information is used solely to respond to your enquiry." },
      { heading: "Cookies & analytics", body: "This site may load third-party embeds (YouTube videos). YouTube may set cookies when you interact with those players, governed by Google's Privacy Policy. We do not use tracking pixels, advertising cookies, or analytics services ourselves." },
      { heading: "Third-party services", body: "The site is hosted on Cloudflare Pages. Cloudflare may collect standard server logs (IP address, browser type, page requested) for security and performance purposes, governed by Cloudflare's Privacy Policy." },
      { heading: "Your rights (GDPR)", body: "If you are located in the EU/EEA, you have the right to access, rectify, or erase any personal data we hold about you (limited to direct email correspondence). To exercise these rights, contact naveen.freelancehub@gmail.com." },
      { heading: "Changes", body: "This policy may be updated from time to time. The current version is always available on this page. Last updated: June 2026." },
    ],
  },
  legal: {
    title: "Legal Notice",
    content: [
      { heading: "Business details", body: "Naveen Sharma\nTrading as: FreelanceHub IT Services\nRegistered independent B2B contractor\nBe'er Sheva, Israel\nEmail: naveen.freelancehub@gmail.com\nWebsite: naveensharma.net" },
      { heading: "Nature of services", body: "FreelanceHub provides IT services including SaaS implementation, product & technical support, QA & UAT engineering, API validation, workflow automation, technical documentation, and website design & development. All services are provided on a B2B basis." },
      { heading: "Intellectual property", body: "All content on this website — including text, design, and code — is the property of Naveen Sharma (FreelanceHub). Reproduction or reuse without written permission is prohibited." },
      { heading: "Limitation of liability", body: "The information on this site is provided in good faith for general informational purposes. FreelanceHub accepts no liability for decisions made based on website content. Specific service terms are agreed in writing prior to engagement." },
      { heading: "Governing law", body: "This website and all services provided by FreelanceHub are governed by the laws of the State of Israel." },
    ],
  },
  terms: {
    title: "Terms of Service",
    content: [
      { heading: "Scope", body: "These terms govern the use of the naveensharma.net website and apply as a general reference for freelance engagements with FreelanceHub IT Services. Specific project terms are agreed in a separate written contract or statement of work before any engagement begins." },
      { heading: "Services", body: "FreelanceHub provides B2B IT services on a contract basis. All deliverables, timelines, rates, and acceptance criteria are defined in the project agreement. No work begins without a signed or confirmed agreement." },
      { heading: "Payment", body: "Payment terms are specified in each project agreement. Invoices are issued in accordance with the agreed schedule. Late payments may incur interest in accordance with applicable law." },
      { heading: "Confidentiality", body: "FreelanceHub treats all client information as confidential and does not disclose it to third parties without written consent, except as required by law. Clients are expected to treat any proprietary methods, documentation, or tools provided by FreelanceHub as confidential." },
      { heading: "Intellectual property", body: "Upon full payment, clients receive ownership of project-specific deliverables as agreed in writing. FreelanceHub retains the right to reference completed work in portfolio materials unless otherwise agreed." },
      { heading: "Termination", body: "Either party may terminate an engagement with reasonable written notice as specified in the project agreement. Work completed to the termination date will be invoiced accordingly." },
      { heading: "Limitation of liability", body: "FreelanceHub's liability is limited to the value of the fees paid for the specific engagement in which a claim arises. We are not liable for indirect, incidental, or consequential damages." },
      { heading: "Contact", body: "For questions about these terms, contact naveen.freelancehub@gmail.com." },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    content: [
      { heading: "What are cookies?", body: "Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently and to provide information to site owners." },
      { heading: "Cookies we use", body: "This website does not set its own cookies. We do not use analytics, advertising, or tracking cookies." },
      { heading: "Third-party cookies", body: "This site embeds YouTube videos. If you interact with a YouTube player, Google/YouTube may set cookies on your device in accordance with their own Cookie Policy. These are not under our control. You can manage or block them via your browser settings." },
      { heading: "Cloudflare", body: "Our hosting provider Cloudflare may use cookies for security purposes (e.g. bot detection). These are strictly necessary cookies and do not track you for advertising purposes." },
      { heading: "Managing cookies", body: "You can control and delete cookies through your browser settings. Disabling cookies will not affect your ability to use this website, as no functionality depends on our own cookies." },
      { heading: "Contact", body: "For cookie-related queries, contact naveen.freelancehub@gmail.com." },
    ],
  },
};

function LegalModal({ doc, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-extrabold text-gray-900">{doc.title}</h2>
          <button onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 space-y-5">
          {doc.content.map(({ heading, body }) => (
            <div key={heading}>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{heading}</h3>
              <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">{body}</p>
            </div>
          ))}
          <p className="text-xs text-gray-400 pt-2">FreelanceHub IT Services · naveensharma.net</p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const [activeDoc, setActiveDoc] = useState(null);
  return (
    <>
      {activeDoc && <LegalModal doc={LEGAL_DOCS[activeDoc]} onClose={() => setActiveDoc(null)} />}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src="/freelancehub-logo.png"
              alt="FreelanceHub"
              className="h-14 w-auto object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <p className="font-extrabold text-gray-900">Naveen Sharma · FreelanceHub</p>
            <p className="text-sm text-gray-500">SaaS Implementation · Product Support · Quality Assurance</p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-1">
              {[
                { key: "privacy",  label: "Privacy & Data Policy" },
                { key: "legal",    label: "Legal Notice" },
                { key: "terms",    label: "Terms of Service" },
                { key: "cookies",  label: "Cookie Policy" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setActiveDoc(key)}
                  className="text-xs text-gray-400 hover:text-blue-600 transition underline-offset-2 hover:underline">
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400">© 2026 Naveen Sharma (FreelanceHub) All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

const FAQS = [
  {
    q: "What services do you offer?",
    a: "I offer SaaS implementation & workflow configuration, product and technical support (Tier 2/3), QA & UAT engineering, API validation with Postman, workflow automation and technical documentation, and website design & development using React, Tailwind CSS, GitHub, and Cloudflare Pages.",
  },
  {
    q: "Are you available for remote or international work?",
    a: "Yes — I work fully remote and am available for international B2B contracts. I'm based in Be'er Sheva, Israel, and currently work with clients in the USA and beyond. I'm also open to hybrid or on-site roles within Israel.",
  },
  {
    q: "What types of engagements do you take on?",
    a: "I'm available for full-time employment, part-time contracts, and B2B project-based engagements through FreelanceHub — my registered independent contractor business. Both short-term project work and longer-term support arrangements are welcome.",
  },
  {
    q: "What industries have you worked in?",
    a: "My deepest experience is in healthcare SaaS (4+ years at Bolt Healthcare), where I handled intake workflow configuration, API validation, and QA for regulated healthcare platforms. I also have a background in electronics manufacturing QA and technical training operations.",
  },
  {
    q: "How do I get started working with you?",
    a: "The easiest way is to send me an email at naveen.freelancehub@gmail.com or connect on LinkedIn at linkedin.com/in/freelancehub. You can also download my CV from this page. I typically respond within one business day.",
  },
  {
    q: "Can you build a website for my business?",
    a: "Yes — I build professional, responsive business websites using React + Vite and Tailwind CSS, deployed on Cloudflare Pages with GitHub version control. This portfolio site itself is an example of my work. I handle everything from design to go-live, including domain setup.",
  },
  {
    q: "Do you work with tools like Jira, Postman, or Basecamp?",
    a: "These are core to my day-to-day workflow. I use Jira for defect tracking and sprint management, Postman for API validation and test collections, and Basecamp for project coordination. I'm also experienced with Notion AI, GitHub, VS Code, and a range of AI-assisted productivity tools.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="FAQ" center title="Frequently asked questions"
          description="Everything you might want to know before reaching out." />
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-100"
              >
                <span className="text-base font-bold text-gray-900 pr-4">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-blue-600 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm leading-relaxed text-gray-600">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Expertise />
        <Experience />
        <CaseStudies />
        <Services />
        <Projects />
        <Tools />
        <BrandVideo />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
