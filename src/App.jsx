import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Mail, Github, MapPin, Globe, ArrowRight, CheckCircle2,
  Workflow, Headset, ShieldCheck, FileText, Layers, Database,
  ClipboardCheck, Code2, ExternalLink, Phone, Linkedin, Facebook, ChevronDown, Youtube, Briefcase,
  MessageCircle, Send, GraduationCap, Award, ExternalLink as LinkOut, FileDown,
} from "lucide-react";

/* ─── DATA ───────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "About",        href: "#about" },
  { label: "Expertise",    href: "#expertise" },
  { label: "Experience",   href: "#experience" },
  { label: "Case Studies", href: "#casestudies" },
  { label: "Education",    href: "#education" },
  { label: "Projects",     href: "#projects" },
  { label: "FAQ",          href: "#faq" },
  { label: "Contact",      href: "#contact" },
];

const HEADLINES = [
  "Technical Product Operations Engineer",
  "SaaS Implementation Specialist",
  "Systems Configuration Specialist",
  "Workflow Automation Engineer",
  "QA/UAT Analyst",
  "B2B Technical Contractor",
];

const EXPERTISE = [
  { icon: Layers,         title: "Healthcare SaaS Implementation",  desc: "End-to-end implementation and configuration of healthcare SaaS platforms — workflow setup, onboarding, and go-live validation." },
  { icon: Workflow,       title: "Systems & Workflow Configuration", desc: "Intake, caregiver onboarding, case management, and compliance workflow configuration aligned to clinical and operational requirements." },
  { icon: Headset,        title: "Product & Technical Support",     desc: "Platform administration, user provisioning, and issue triage via Basecamp." },
  { icon: ClipboardCheck, title: "QA / UAT & Release Validation",   desc: "Manual UAT and regression testing across product releases. Production readiness validation from configuration to go-live." },
  { icon: Database,       title: "Data Mapping & Field Validation",  desc: "Field-level data mapping, payload validation, and integrity checks across integrated systems (HHAeXchange)." },
  { icon: FileText,       title: "Technical Documentation",         desc: "SOPs, process documentation, QA documentation, and knowledge base content that implementation teams can rely on." },
  { icon: Globe,          title: "Website Design & Development",    desc: "Custom React/Next.js web apps, WordPress business sites, Shopify e-commerce stores, and HTML landing pages." },
  { icon: Briefcase,      title: "Career & Professional Presence",  desc: "ATS-optimised resume writing, LinkedIn profile optimisation, and career portfolio setup for tech professionals." },
];

const EXPERIENCES = [
  {
    company: "Bolt Healthcare",
    period: "Aug 2022 – May 2026",
    context: "Healthcare SaaS",
    roles: [
      "Technical Product Operations Engineer",
    ],
    points: [
      "Engineered and deployed 500+ dynamic intake and form workflows for 25+ healthcare agencies (including Elderwood Health Plan, RCIL, Rising Stars, Able Home Care, Crown HC, White Glove, Age in Place, Magic HC), automating conditional logic and data-binding schemas to ensure accurate form submission.",
      "Architected backend data-mapping schemas and configured field-level validation rules across regulatory forms (I-9, W-4, DOH-5201, WOTC, NHTD, HHA §611.55 competency forms), reducing intake errors and ensuring HIPAA compliance.",
      "Configured dropdown logic, e-signature workflows, and step-based conditional branching for multi-page dynamic files using Bolt's PDF Engine.",
      "Administered multi-tenant SaaS case management system with Super-Admin access, managing user provisioning and HHAeXchange API integration.",
      "Executed UAT and mapping validation tests on production forms; performed root-cause analysis on data-mapping and submission defects.",
      "Coordinated task assignment and issue triage via Basecamp.",
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
    context: "Technical Training Centre · Dharamshala, India",
    roles: ["Founder / Operations Manager"],
    points: [
      "Managed the full operational lifecycle of a technical training centre — scheduling, supplier coordination, staff management, and IT infrastructure.",
      "Oversaw training systems, operational workflows, and day-to-day technical operations.",
    ],
  },
];

const CASE_STUDIES = [
  {
    title: "Healthcare Intake Form Digitization",
    tag: "Bolt Healthcare · Case Study",
    challenge: "Multiple healthcare agencies relied on manual paper-based intake processes, creating delays and compliance risk.",
    role: "Technical Product Operations Engineer — configured dynamic form workflows and conditional logic in Bolt's PDF Engine.",
    solution: "Built 500+ digitized intake and compliance forms (I-9, WOTC, DOH-5201, NHTD, HHA competency forms) with field-level validation and e-signature workflows, mapped to agency-specific data sources.",
    outcome: "Digitized workflows in active production use across 25+ agencies including Elderwood Health Plan, RCIL, and Rising Stars.",
  },
  {
    title: "Multi-Tenant Platform Administration",
    tag: "Bolt Healthcare · Case Study",
    challenge: "Managing user access and workflow configuration across dozens of client agencies on one SaaS platform.",
    role: "Super-Admin platform administrator.",
    solution: "Managed user provisioning, HHAeXchange API integration, and Basecamp-coordinated task workflows across Pending Jobs, Needs Mapping, and Needs Testing stages.",
    outcome: "Ongoing production support and workflow configuration across the full agency base.",
  },
];

const EDUCATION = [
  {
    icon: GraduationCap,
    institution: "Amity University Online",
    degree: "BCA — Bachelor of Computer Applications",
    focus: "Cloud Computing & Security",
    period: "2022 – 2026",
    type: "Degree",
  },
  {
    icon: Award,
    institution: "Smart College",
    degree: "QA Engineering Certification",
    focus: "Web & Mobile Testing",
    period: "Sep 2021",
    type: "Certification",
  },
  {
    icon: Award,
    institution: "Professional Development",
    degree: "Software Testing & Automation Foundation",
    focus: "Test planning, defect lifecycle, automation fundamentals",
    period: "2021",
    type: "Certification",
  },
];

const PROJECTS = [
  {
    icon: ClipboardCheck,
    title: "Warehouse Management System — Software Test Plan",
    tag: "QA Certification Project",
    desc: "Test planning and strategy demonstrating risk analysis, regression and sanity testing, and the full defect lifecycle.",
    skills: ["Test Planning", "Risk Analysis", "Regression Testing", "Defect Lifecycle"],
    file: "/docs/Warehouse-Management-System-Test-Plan.pdf",
    fileLabel: "View test plan (PDF)",
  },
  {
    icon: ClipboardCheck,
    title: "Netflix Subscription — Software Test Plan",
    tag: "QA Certification Project",
    desc: "Structured QA documentation covering methodology, risk assessment, and test execution planning.",
    skills: ["Test Documentation", "QA Methodology", "Risk Assessment", "Test Execution"],
    file: "/docs/Netflix-Subscription-Test-Plan.docx",
    fileLabel: "Download test plan (DOCX)",
  },
  {
    icon: Code2,
    title: "Django Blogging CMS",
    tag: "BCA Graduation Project",
    desc: "A content management system built to demonstrate technical learning — authentication, CRUD operations, category management, and an admin dashboard.",
    skills: ["Python", "Django", "MySQL", "MongoDB", "Bootstrap", "AJAX"],
    file: "/docs/Django-Blogging-CMS-Project.pdf",
    fileLabel: "View project doc (PDF)",
  },
  {
    icon: Globe,
    title: "naveensharma.net — Personal Portfolio",
    tag: "Personal Project",
    desc: "Designed, built, and deployed this professional portfolio site end-to-end — from concept through to domain go-live on Cloudflare Pages.",
    skills: ["React", "Vite", "Tailwind CSS", "GitHub", "Cloudflare Pages"],
  },
  {
    icon: MessageCircle,
    title: "Ella — AI Chat Assistant",
    tag: "Personal Project",
    desc: "Full-stack AI chat assistant — React frontend, Cloudflare Pages serverless backend, Groq AI (Llama 3) integration. Live 24/7 on this site.",
    skills: ["React", "Cloudflare Pages Functions", "Groq API", "Llama 3", "Serverless"],
  },
];

const TOOL_CATEGORIES = [
  {
    label: "SaaS & Technical Operations",
    sublabel: "Core professional tooling used at Bolt Healthcare",
    tools: ["Basecamp", "HHAeXchange", "Zendesk"],
    note: "Certification-trained (not production-used): Jira, Google Cloud Architecture",
  },
  {
    label: "Website Design & Development",
    sublabel: "Tools used to build, deploy, and manage websites",
    tools: ["React", "Vite", "Tailwind CSS", "WordPress", "GitHub", "Visual Studio Code", "Cloudflare Pages", "Hostinger"],
  },
  {
    label: "AI-Assisted Productivity",
    sublabel: "Used to enhance and accelerate professional work",
    tools: ["Claude", "Notion AI", "GitHub Copilot", "Gemini", "Google AI Studio"],
  },
  {
    label: "Design & Content",
    sublabel: "Supporting documentation and presentation",
    tools: ["Canva", "Adobe Express"],
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
            src="/headshot-round.png"
            alt="Naveen Sharma"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-100"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-gray-900">Naveen Sharma</span>
            <span className="text-xs font-medium text-blue-600">Technical Product Operations · SaaS Implementation · Systems Configuration</span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-blue-600">
              {link.label}
            </a>
          ))}
          <a href="https://opility.com" target="_blank" rel="noreferrer"
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700 flex items-center gap-1">
            Opility <LinkOut size={12} />
          </a>
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
            <a href="https://opility.com" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}
              className="border-b border-gray-100 py-3 text-sm font-medium text-blue-600 flex items-center gap-1">
              Opility <LinkOut size={12} />
            </a>
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

        <div className="mb-4 w-full overflow-hidden rounded-2xl shadow-sm">
          <img
            src="/linkedin-cover.jpeg"
            alt="Naveen Sharma — Healthcare SaaS Implementation Specialist"
            className="w-full h-auto"
          />
        </div>

        <h1 className="text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-3 mt-6">
          Naveen Sharma
        </h1>

        <p className="text-lg font-medium text-gray-500 sm:text-xl mb-7">
          Technical Product Operations Engineer
        </p>

        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-2.5">
          {HEADLINES.map((h) => (
            <span key={h}
              className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {h}
            </span>
          ))}
        </div>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 mb-10">
          7+ years of professional experience, including nearly 4 years in healthcare SaaS at Bolt Healthcare.
          Available for full-time, hybrid, and remote employment in SaaS implementation, systems configuration,
          workflow automation, and QA/UAT.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="/Naveen_Sharma_CV.pdf" download
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-blue-700">
            Download CV <ArrowRight size={18} />
          </a>
          <a href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-200 px-8 py-4 text-base font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600">
            Get in touch
          </a>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 border-t border-gray-100 pt-12">
          {[
            { num: "7+",     label: "Years Experience" },
            { num: "~4",     label: "Years Healthcare SaaS" },
            { num: "Tier 2/3", label: "Technical Support" },
            { num: "Remote", label: "Available Globally" },
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
  const tools = ["Basecamp", "HHAeXchange", "Zendesk", "Cloudflare", "GitHub", "VS Code"];
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
            <SectionHeading eyebrow="About" title="Technical Product Operations Engineer" />
            <p className="text-base leading-relaxed text-gray-600">
              I'm Naveen Sharma — a Technical Product Operations Engineer with 7+ years of professional
              experience, including nearly 4 years at Bolt Healthcare engineering SaaS workflow automation,
              systems configuration, and validation testing across a regulated healthcare environment. I
              administered multi-tenant platform infrastructure, configured dynamic form workflows and
              conditional logic for 25+ healthcare agencies, and executed UAT/mapping validation on
              production systems.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              I'm available for full-time, hybrid, and remote roles in SaaS implementation, systems
              configuration, workflow automation, and QA/UAT. I'm also the founder of{" "}
              <a href="https://opility.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">Opility</a>
              {" "}— a registered B2B IT services business.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline">
                Contact me <ArrowRight size={16} />
              </a>
              <span className="text-gray-300">·</span>
              <a href="https://opility.com" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 hover:underline">
                B2B services at Opility <LinkOut size={14} />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 lg:items-start">
            <img
              src="/headshot-round.png"
              alt="Naveen Sharma"
              className="h-52 w-52 rounded-2xl object-cover shadow-lg ring-4 ring-white"
            />
            <div className="grid w-full grid-cols-2 gap-4">
              {[
                { label: "Role focus",   value: "SaaS Implementation · Systems Configuration · Workflow Automation" },
                { label: "Experience",   value: "7+ years · nearly 4 in healthcare SaaS" },
                { label: "Location",     value: "Be'er Sheva, Israel · Remote OK" },
                { label: "Availability", value: "Full-time · Hybrid · Remote" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{item.label}</p>
                  <p className="mt-2 text-sm font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
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
        <SectionHeading eyebrow="Expertise" center title="Core competencies"
          description="The practical skills I bring to healthcare SaaS implementation, systems configuration, quality assurance, and technical support." />
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
          description="A closer look at the challenges I solved across healthcare SaaS implementation, QA, and API validation during my time at Bolt Healthcare. No confidential data is disclosed." />
        <div className="grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 transition hover:shadow-lg">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">{cs.tag}</span>
              <h3 className="mt-3 text-lg font-extrabold text-gray-900">{cs.title}</h3>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Challenge", text: cs.challenge, color: "bg-red-50 text-red-700" },
                  { label: "My Role",   text: cs.role,      color: "bg-blue-50 text-blue-700" },
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

function AvailableFor() {
  const roles = [
    { title: "SaaS Implementation", items: ["Workflow configuration", "Platform setup & administration", "Go-live & hypercare", "Customer onboarding"] },
    { title: "QA & Release Validation", items: ["UAT planning & execution", "Functional & regression testing", "Workflow & mapping validation", "Production readiness"] },
    { title: "Product & Technical Support", items: ["Tier 2/3 support", "Escalation management", "Issue triage & coordination (Basecamp)", "Documentation & SOPs"] },
  ];
  return (
    <section className="bg-blue-600 text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-200">Open to opportunities</p>
          <h2 className="text-3xl font-extrabold tracking-tight">Available for full-time, hybrid &amp; remote roles</h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            I'm actively looking for roles in SaaS implementation, systems configuration,
            workflow automation, and QA/UAT.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          {roles.map((r) => (
            <div key={r.title} className="rounded-2xl bg-blue-700/50 border border-blue-500/30 p-6">
              <h3 className="font-bold text-white mb-4">{r.title}</h3>
              <ul className="space-y-2">
                {r.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-blue-100">
                    <CheckCircle2 size={14} className="shrink-0 text-blue-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-blue-200 text-sm mb-4">
            Looking for B2B services or contracting?{" "}
            <a href="https://opility.com" target="_blank" rel="noreferrer"
              className="text-white font-semibold underline underline-offset-2 hover:text-blue-100">
              Visit Opility →
            </a>
          </p>
          <a href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-50">
            Get in touch <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Education & Certifications" title="Academic background & professional training" />
        <div className="grid gap-5 sm:grid-cols-3">
          {EDUCATION.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.degree}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-8 transition hover:shadow-md">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{item.institution}</p>
                <h3 className="text-base font-extrabold text-gray-900 mb-1">{item.degree}</h3>
                <p className="text-sm text-gray-500 mb-3">{item.focus}</p>
                <p className="text-xs font-semibold text-blue-600">{item.period}</p>
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
    <section id="projects" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Projects" title="Personal projects & study work"
          description="QA certification projects, an academic development build, and personal web projects." />
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
                {project.file && (
                  <a href={project.file} target="_blank" rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:gap-2.5 hover:text-blue-700">
                    <FileDown size={16} />
                    {project.fileLabel || "View document"}
                  </a>
                )}
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
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Tools" center title="Tools I work with"
          description="Core professional tooling across SaaS implementation, systems configuration, and website development." />
        <div className="space-y-6">
          {TOOL_CATEGORIES.map((cat) => (
            <div key={cat.label} className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
              <div className="mb-5">
                <h3 className="text-base font-extrabold text-gray-900">{cat.label}</h3>
                <p className="mt-0.5 text-xs text-gray-400">{cat.sublabel}</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {cat.tools.map((tool) => (
                  <span key={tool}
                    className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:text-blue-600">
                    {tool}
                  </span>
                ))}
              </div>
              {cat.note && (
                <p className="mt-3 text-xs text-gray-400 italic">{cat.note}</p>
              )}
            </div>
          ))}
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
          title="Let's talk"
          description="Available for full-time, hybrid, and remote employment. Based in Be'er Sheva, Israel." />

        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center gap-4">
            <a href="/Naveen_Sharma_CV.pdf" target="_blank" rel="noreferrer"
              className="rounded-lg border-2 border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition hover:border-blue-400 hover:text-blue-600">
              View CV
            </a>
            <a href="/Naveen_Sharma_CV.pdf" download
              className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700">
              Download CV (PDF)
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: "mailto:contact@naveensharma.net",               icon: Mail,     label: "Email",    text: "contact@naveensharma.net",         external: false, link: true  },
              { href: "https://linkedin.com/in/naveensharmatech",       icon: Linkedin, label: "LinkedIn", text: "linkedin.com/in/naveensharmatech",  external: true,  link: true  },
              { href: "tel:+972587896289",                              icon: Phone,    label: "Phone",    text: "058-789-6289",                      external: false, link: true  },
              { href: null,                                             icon: MapPin,   label: "Location", text: "Be'er Sheva, Israel",              external: false, link: false },
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
      { heading: "Who we are", body: "naveensharma.net is the personal professional website of Naveen Sharma, based in Be'er Sheva, Israel. B2B services are provided through Opility (opility.com), a separate registered business. Contact: contact@naveensharma.net" },
      { heading: "What personal data we collect", body: "This is a static informational website. We do not operate contact forms, user accounts, or server-side data collection of any kind.\n\nIf you contact me directly by email, LinkedIn, phone, or any other channel, I collect only the information you choose to provide (name, company, email address, message content). That data is used exclusively to respond to your enquiry and is never sold, rented, or shared with third parties." },
      { heading: "Legal basis for processing (GDPR)", body: "Where applicable, personal data is processed on the basis of legitimate interest (responding to business enquiries) or pre-contractual steps. Data is retained only as long as necessary to fulfil the purpose for which it was provided, or as required by Israeli or EU law." },
      { heading: "Your rights", body: "If you are located in the EU/EEA or Israel, you have the right to:\n• Access the personal data held about you\n• Request correction or erasure of that data\n• Object to processing or request restriction\n• Lodge a complaint with your local data protection authority\n\nTo exercise any of these rights, contact contact@naveensharma.net. I will respond within 30 days." },
      { heading: "Cookies & third-party embeds", body: "This site does not set its own cookies or use tracking pixels, advertising networks, or analytics services. This site may embed YouTube videos. If you interact with a YouTube player, Google may set cookies subject to their Privacy Policy." },
      { heading: "Hosting & infrastructure", body: "This site is hosted on Cloudflare Pages (Cloudflare, Inc., USA). Cloudflare may process standard server request data for security and performance purposes, subject to Cloudflare's Privacy Policy." },
      { heading: "Changes to this policy", body: "This policy may be updated periodically. The current version is always available at naveensharma.net. Last updated: June 2026." },
    ],
  },
  legal: {
    title: "Legal Notice",
    content: [
      { heading: "About this website", body: "naveensharma.net is the personal professional website of Naveen Sharma. It is not the website of Opility. B2B services and client engagements are handled through Opility (opility.com)." },
      { heading: "Personal contact", body: "Naveen Sharma\nBe'er Sheva, Israel\nEmail: contact@naveensharma.net\nPhone: 058-789-6289" },
      { heading: "Business registration", body: "B2B services are provided through Opility, registered as an Authorised Dealer under the Israel Tax Authority.\nRegistration date: 01 April 2025\n\nFor invoicing, contract, and tax purposes, please contact: hello@opility.com" },
      { heading: "Intellectual property", body: "All content on this website — including text, design, code, and branding — is the property of Naveen Sharma. Reproduction or reuse without prior written permission is prohibited." },
      { heading: "Disclaimer", body: "The information on this site is provided for general informational purposes in good faith. Naveen Sharma accepts no liability for decisions made solely based on website content." },
      { heading: "Governing law & jurisdiction", body: "This website is governed by the laws of the State of Israel. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of Be'er Sheva, Israel." },
    ],
  },
  terms: {
    title: "Terms of Service",
    content: [
      { heading: "Scope", body: "These terms apply to B2B engagements handled through Opility (Naveen Sharma, Authorised Dealer, Israel). For full terms, please visit opility.com or contact hello@opility.com." },
      { heading: "Services & rates", body: "Services are provided through Opility at the following standard rates:\n\n• Healthcare SaaS Implementation & Configuration: $50–65 / hour\n• QA Engineering & API Validation: $45–55 / hour\n• Website Design & Development: $55–70 / hour\n• Minimum project engagement: $500\n\nFinal rates are confirmed in a written agreement before work begins." },
      { heading: "Payment terms", body: "Project work: 50% deposit required before work begins for new clients; balance due upon delivery and acceptance.\n\nOngoing retainer / support contracts: invoiced monthly in arrears; payment due within 14 days of invoice date." },
      { heading: "Engagement process", body: "No work begins without a confirmed written agreement. Typical process:\n1. Initial consultation (free, up to 30 minutes)\n2. Proposal & Statement of Work issued\n3. Agreement signed\n4. Deposit invoice paid\n5. Work commences\n6. Delivery, review, and final payment" },
      { heading: "Confidentiality", body: "All client information — business data, systems access, workflows, and communications — is treated as strictly confidential and will not be disclosed to any third party without written consent." },
      { heading: "Contact", body: "For service enquiries: hello@opility.com\nFor support: support@opility.com\nPersonal contact: contact@naveensharma.net" },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    content: [
      { heading: "Overview", body: "This Cookie Policy explains how naveensharma.net uses cookies. In short: this site does not set its own cookies." },
      { heading: "Cookies we set", body: "None. This website does not set any first-party cookies, tracking pixels, fingerprinting scripts, or analytics beacons." },
      { heading: "YouTube embed cookies", body: "This site may include embedded YouTube video players. YouTube (Google LLC) may set cookies on your device when you interact with a video player, subject to Google's Privacy Policy. These are outside our control." },
      { heading: "Cloudflare security cookies", body: "Hosting provider Cloudflare may set strictly necessary cookies (e.g. __cf_bm) for bot detection and security. These do not track you for advertising purposes." },
      { heading: "No analytics or advertising", body: "This website does not use Google Analytics, Facebook Pixel, LinkedIn Insight Tag, Hotjar, or any other analytics or advertising tracking technology." },
      { heading: "Managing cookies", body: "You can control, block, or delete cookies at any time through your browser settings.\n• Chrome: Settings → Privacy & Security → Cookies\n• Firefox: Settings → Privacy & Security\n• Safari: Preferences → Privacy" },
      { heading: "Contact", body: "For cookie or privacy queries: contact@naveensharma.net" },
    ],
  },
};

function LegalBodyText({ text }) {
  return (
    <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">
      {text.split(/(mailto:[^\s]+|https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
        if (/^mailto:/.test(part)) {
          return <a key={i} href={part} className="text-blue-600 hover:underline break-all">{part.replace("mailto:", "")}</a>;
        }
        if (/^https?:\/\//.test(part)) {
          return <a key={i} href={part} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">{part}</a>;
        }
        if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
          return <a key={i} href={`mailto:${part}`} className="text-blue-600 hover:underline">{part}</a>;
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

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
              <LegalBodyText text={body} />
            </div>
          ))}
          <p className="text-xs text-gray-400 pt-2">Naveen Sharma · naveensharma.net</p>
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
              src="/headshot-round.png"
              alt="Naveen Sharma"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-100"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <p className="font-extrabold text-gray-900">Naveen Sharma</p>
            <p className="text-sm text-gray-500">Technical Product Operations · SaaS Implementation · Systems Configuration · Workflow Automation</p>
            <p className="text-xs text-gray-400">
              B2B services & contracting →{" "}
              <a href="https://opility.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">opility.com</a>
            </p>
            <div className="flex items-center justify-center gap-3 mt-1">
              {[
                { href: "https://linkedin.com/in/naveensharmatech",      icon: Linkedin, label: "LinkedIn", bg: "#0A66C2" },
                { href: "https://github.com/naveensharmatech",           icon: Github,   label: "GitHub",   bg: "#181717" },
                { href: "https://www.facebook.com/share/18mJRTbUFF/",   icon: Facebook, label: "Facebook", bg: "#1877F2" },
                { href: "https://youtube.com/@nsfreelance",              icon: Youtube,  label: "YouTube",  bg: "#FF0000" },
                { href: "mailto:contact@naveensharma.net",               icon: Mail,     label: "Email",    bg: "#34A853" },
              ].map(({ href, icon: Icon, label, bg }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  style={{ backgroundColor: bg }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white transition opacity-90 hover:opacity-100 hover:scale-110">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 mt-1">
              {[
                { key: "privacy",  label: "Privacy & Data Policy" },
                { key: "legal",    label: "Legal Notice" },
                { key: "terms",    label: "Terms of Service" },
                { key: "cookies",  label: "Cookie Policy" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setActiveDoc(key)}
                  className="text-xs text-gray-400 hover:text-blue-600 transition underline-offset-2 hover:underline text-center">
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400">© 2026 Naveen Sharma. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

const FAQS = [
  {
    q: "What kind of roles are you looking for?",
    a: "I'm looking for full-time, hybrid, or remote roles in SaaS implementation, systems configuration, workflow automation, and QA/UAT. I'm open to roles in Israel and internationally.",
  },
  {
    q: "What was your role at Bolt Healthcare?",
    a: "I was a Technical Product Operations Engineer, engineering SaaS workflow automation, systems configuration, and validation testing for a healthcare intake platform used by 25+ agencies.",
  },
  {
    q: "Are you available for remote or international work?",
    a: "Yes — I work fully remote and am available for international roles and contracts. I'm based in Be'er Sheva, Israel, and have worked with US-based teams throughout my time at Bolt Healthcare. I'm also open to hybrid or on-site roles within Israel.",
  },
  {
    q: "What industries have you worked in?",
    a: "My deepest experience is in healthcare SaaS — specifically regulated intake and caregiver management platforms at Bolt Healthcare. I also have a background in electronics manufacturing QA (Vishay Intertechnology) and technical training operations (Shivam Institute).",
  },
  {
    q: "Do you work with tools like Jira, Postman, or Basecamp?",
    a: "I coordinated all healthcare SaaS implementation work at Bolt Healthcare through Basecamp. I have certification-level training in Jira but did not use it in production. I've also worked hands-on with HHAeXchange API integration and Zendesk for client support.",
  },
  {
    q: "Can I download your CV?",
    a: "Yes — you can download my CV directly from this page using the 'Download CV' button at the top. You can also contact me at contact@naveensharma.net and I'll send it directly.",
  },
  {
    q: "Do you offer B2B services or contracting?",
    a: "Yes — B2B services including SaaS implementation consulting, QA services, website development, and career services are offered through Opility, my registered IT services business. Visit opility.com or email hello@opility.com for enquiries.",
  },
  {
    q: "How do I get in touch?",
    a: "Email me at contact@naveensharma.net, connect on LinkedIn at linkedin.com/in/naveensharmatech, or call 058-789-6289. I typically respond within one business day.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="FAQ" center title="Frequently asked questions"
          description="Common questions from recruiters and hiring managers." />
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-gray-50"
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

/* ─── ELLA CHAT ──────────────────────────────────────────────── */

function EllaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Hi! I'm Ella, Naveen's AI assistant. Ask me anything about his experience, skills, or availability — I'm happy to help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Sorry, something went wrong. Reach Naveen directly at contact@naveensharma.net" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex w-80 sm:w-96 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
          style={{ height: "500px" }}>
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full overflow-hidden ring-2 ring-white/30">
                <img src="/ella-avatar.png" alt="Ella" className="h-full w-full object-cover object-center" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Ella</p>
                <p className="text-xs text-blue-100">Naveen's AI Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)}
              className="text-white/70 transition hover:text-white" aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-br-sm bg-blue-600 text-white"
                    : "rounded-bl-sm bg-gray-100 text-gray-800"
                }`}>
                  {m.content.split(/(https?:\/\/[^\s]+)/g).map((part, j) => {
                    if (/^https?:\/\//.test(part)) {
                      const url = part.replace(/[.,!?:;)>"'\]]+$/, "");
                      return (
                        <a key={j} href={url} target="_blank" rel="noopener noreferrer"
                          className="block underline break-all cursor-pointer mt-0.5 text-blue-700"
                          style={{ touchAction: "manipulation", WebkitTapHighlightColor: "rgba(0,0,0,0.1)" }}>
                          {url}
                        </a>
                      );
                    }
                    return <span key={j}>{part}</span>;
                  })}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 150, 300].map((delay) => (
                      <span key={delay}
                        className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-gray-100 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask me anything…"
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-white transition hover:bg-blue-700 disabled:opacity-40"
                aria-label="Send message">
                <Send size={16} />
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">AI by Groq · Powered by Opility</p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full bg-blue-600 px-5 py-3.5 text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
        aria-label="Chat with Ella">
        {open ? <X size={20} /> : (
          <div className="h-6 w-6 rounded-full overflow-hidden ring-2 ring-white/40">
            <img src="/ella-avatar.png" alt="Ella" className="h-full w-full object-cover object-top" />
          </div>
        )}
        <span className="text-sm font-semibold">{open ? "Close" : "Ask Ella"}</span>
      </button>
    </div>
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
        <AvailableFor />
        <Education />
        <Projects />
        <Tools />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <EllaChat />
    </div>
  );
}
