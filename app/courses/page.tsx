"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowRight,
  Mail,
  Lock,
  CheckCircle,
  PlayCircle,
} from "lucide-react";

const CONTACT_EMAIL = "naveen.freelancehub@gmail.com";

const CATEGORIES = ["All", "AI & Automation", "QA & Testing", "Web Development", "SaaS", "Career"];

const COURSES = [
  {
    title: "AI Tools for Business Professionals",
    description:
      "Learn to leverage AI tools to automate tasks, improve productivity, and stay competitive in your industry. Covers ChatGPT, Claude, Notion AI, and more.",
    level: "Beginner",
    lessons: 12,
    badge: "FREE",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    badgeIcon: CheckCircle,
    category: "AI & Automation",
    available: true,
  },
  {
    title: "QA Testing Zero to Job-Ready",
    description:
      "Go from zero to hireable QA tester. Covers manual testing, bug reporting, API testing with Postman, and Agile workflows.",
    level: "Beginner",
    lessons: 18,
    badge: "FREE PREVIEW",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    badgeIcon: PlayCircle,
    category: "QA & Testing",
    available: true,
  },
  {
    title: "SaaS Implementation Masterclass",
    description:
      "Everything you need to implement, onboard, and support SaaS platforms for enterprise clients. Real-world frameworks used in healthcare SaaS.",
    level: "Intermediate",
    lessons: 15,
    badge: "FREE PREVIEW",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    badgeIcon: PlayCircle,
    category: "SaaS",
    available: true,
  },
  {
    title: "Building Your Tech Portfolio",
    description:
      "Build a standout tech portfolio from scratch. Projects, case studies, GitHub setup, and how to present your work to employers and clients.",
    level: "Beginner",
    lessons: 10,
    badge: "COMING SOON",
    badgeColor: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    badgeIcon: Lock,
    category: "Career",
    available: false,
  },
  {
    title: "LinkedIn Optimization for Tech",
    description:
      "Turn your LinkedIn into a lead-generating machine. Covers profile copy, keyword strategy, content posting, and recruiter outreach.",
    level: "Beginner",
    lessons: 8,
    badge: "COMING SOON",
    badgeColor: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    badgeIcon: Lock,
    category: "Career",
    available: false,
  },
  {
    title: "React & Next.js for Beginners",
    description:
      "Build modern web applications with React and Next.js. Start from the fundamentals and work up to deploying a real app on Vercel.",
    level: "Intermediate",
    lessons: 20,
    badge: "COMING SOON",
    badgeColor: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    badgeIcon: Lock,
    category: "Web Development",
    available: false,
  },
];

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? COURSES
      : COURSES.filter((c) => c.category === activeCategory);

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=Notify%20me%20about%20new%20FreelanceHub%20courses`;

  return (
    <div className="bg-[#0f172a] text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-12">
          <div className="h-[400px] w-[600px] rounded-full bg-blue-600/15 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 mb-6">
            <BookOpen size={12} />
            Start free — no credit card needed
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Level Up Your Tech Skills
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Practical courses from a working professional. Start free.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "border border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <div
                key={course.title}
                className={`border border-white/10 bg-white/[0.03] rounded-2xl p-6 flex flex-col transition-all ${
                  course.available ? "hover:border-blue-500/30" : "opacity-70"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs text-slate-500 bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5">
                    {course.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-0.5 border font-semibold ${course.badgeColor}`}
                  >
                    <course.badgeIcon size={10} />
                    {course.badge}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{course.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {course.level}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} />
                    {course.lessons} lessons
                  </span>
                </div>
                {course.available ? (
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
                  >
                    Start Learning <ArrowRight size={14} />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 border border-white/10 text-slate-500 rounded-xl px-4 py-2.5 text-sm font-semibold cursor-not-allowed"
                  >
                    <Lock size={14} />
                    Coming Soon
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon / Email CTA */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-blue-600/10 p-12 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[500px] rounded-full bg-blue-600/20 blur-[80px]" />
            </div>
            <div className="relative">
              <Mail size={32} className="text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">More courses on the way</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                New courses drop regularly covering web dev, AI, career skills, and more. Get
                notified when new courses are available.
              </p>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
              >
                <Mail size={16} />
                Notify Me About New Courses
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
