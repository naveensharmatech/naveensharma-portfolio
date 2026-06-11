import Link from "next/link";
import {
  BookOpen,
  Lightbulb,
  Wrench,
  FolderOpen,
  Globe,
  CheckSquare,
  ArrowRight,
  Star,
  Users,
  Zap,
  Shield,
} from "lucide-react";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Courses",
    description:
      "Practical, project-based courses on AI, QA testing, SaaS, and web development — taught by a working professional.",
    href: "/courses",
    label: "Browse Courses",
  },
  {
    icon: Lightbulb,
    title: "Insights",
    description:
      "Tech tips, AI news, tutorials, and industry commentary to keep you ahead of the curve.",
    href: "/insights",
    label: "Read Insights",
  },
  {
    icon: Wrench,
    title: "AI Tools",
    description:
      "Curated directory of AI tools — tested and reviewed so you know exactly what to use and when.",
    href: "/ai-tools",
    label: "Explore Tools",
  },
  {
    icon: FolderOpen,
    title: "Resources",
    description:
      "Free templates, SOPs, checklists, and career docs. Download and use — no email required.",
    href: "/resources",
    label: "Get Resources",
  },
  {
    icon: Globe,
    title: "Web Services",
    description:
      "Professional website design and development using React, Next.js, WordPress, and Shopify.",
    href: "/services",
    label: "View Services",
  },
  {
    icon: CheckSquare,
    title: "QA & Testing",
    description:
      "Manual and automated QA, API validation, test planning, and bug reporting for your products.",
    href: "/services",
    label: "Learn More",
  },
];

const FEATURED_COURSES = [
  {
    title: "AI Tools for Business Professionals",
    description:
      "Learn to leverage AI tools to automate tasks, improve productivity, and stay competitive in your industry.",
    level: "Beginner",
    lessons: 12,
    badge: "FREE",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    category: "AI & Automation",
  },
  {
    title: "QA Testing Zero to Job-Ready",
    description:
      "Go from zero to hireable QA tester. Covers manual testing, bug reporting, API testing, and Agile workflows.",
    level: "Beginner",
    lessons: 18,
    badge: "FREE PREVIEW",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    category: "QA & Testing",
  },
  {
    title: "SaaS Implementation Masterclass",
    description:
      "Everything you need to implement, onboard, and support SaaS platforms for enterprise clients.",
    level: "Intermediate",
    lessons: 15,
    badge: "FREE PREVIEW",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    category: "SaaS",
  },
];

const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "4+", label: "Years Healthcare SaaS" },
  { value: "99.9%", label: "Uptime" },
  { value: "100%", label: "Free to Start" },
];

const TRUST_POINTS = [
  {
    icon: Star,
    title: "Real-World Experience",
    description:
      "Every course and resource is built from 8+ years of hands-on tech work — not recycled theory from someone who's never done the job.",
  },
  {
    icon: Users,
    title: "Built for Working Professionals",
    description:
      "Whether you're upskilling, career-switching, or running a business — the content here is practical, direct, and immediately useful.",
  },
  {
    icon: Shield,
    title: "Honest & No-Fluff",
    description:
      "No upsells, no paywalled basics. Start free, learn real skills, and only pay when you need professional services.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#0f172a] text-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden py-32 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[700px] rounded-full bg-blue-600/20 blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 mb-8">
            <Zap size={12} />
            All-in-one tech learning &amp; services platform
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Learn. Build. Grow.
            <br />
            <span className="text-blue-400">With FreelanceHub.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
            Practical courses, curated AI tools, free resources, and professional IT services — all
            built by a working tech professional with 8+ years of real-world experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
            >
              Start Learning Free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-slate-200 rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/10 bg-white/[0.02] py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-blue-400">{s.value}</div>
              <div className="text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need in One Place</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              From learning new skills to getting your website built — FreelanceHub covers the full
              spectrum of modern tech needs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <Link
                key={f.title}
                href={f.href}
                className="group border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:border-blue-500/30 transition-all hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600/20 mb-4">
                  <f.icon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-blue-400 group-hover:gap-2 transition-all">
                  {f.label} <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-24 px-4 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Featured Courses</h2>
              <p className="text-slate-400">
                Start learning today — no credit card required.
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden sm:inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              All courses <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_COURSES.map((course) => (
              <div
                key={course.title}
                className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:border-blue-500/30 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-slate-500 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                    {course.category}
                  </span>
                  <span
                    className={`text-xs rounded-full px-2.5 py-0.5 border font-semibold ${course.badgeColor}`}
                  >
                    {course.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span>{course.level}</span>
                  <span>·</span>
                  <span>{course.lessons} lessons</span>
                </div>
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  Start Learning <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all courses <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why FreelanceHub */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built by a Professional, For Professionals
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              FreelanceHub isn&apos;t a content mill. It&apos;s a focused platform built from real
              experience in tech, healthcare SaaS, QA, and web development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRUST_POINTS.map((point) => (
              <div
                key={point.title}
                className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600/20 mb-4">
                  <point.icon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{point.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-blue-600/10 p-12 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[500px] rounded-full bg-blue-600/20 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to level up?</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                Start with free courses, browse the AI tools directory, or get in touch about
                professional services. No pressure, no paywall.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
                >
                  Start Learning Free <ArrowRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-slate-200 rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
