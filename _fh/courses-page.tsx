"use client";

import { useState } from "react";
import {
  BookOpen, Clock, ArrowRight, Mail, Lock,
  CheckCircle, PlayCircle, Star, Users, Search,
  Zap, Shield, TrendingUp,
} from "lucide-react";

const CONTACT_EMAIL = "hello@opility.com";
const CATEGORIES = ["All", "AI & Automation", "QA & Testing", "SaaS", "Web Development", "Career"];

const COURSES = [
  {
    slug: "ai-tools-for-business",
    title: "AI Tools for Business Professionals",
    description: "Learn to leverage ChatGPT, Claude, Notion AI and automation tools to work faster and stay competitive.",
    instructor: "Naveen Sharma",
    level: "Beginner",
    lessons: 12,
    hours: "2.5",
    students: "1,847",
    rating: 4.9,
    badge: "FREE",
    badgeColor: "bg-green-500 text-white",
    category: "AI & Automation",
    available: true,
    gradient: "from-violet-600 via-blue-600 to-blue-800",
    icon: Zap,
    accent: "violet",
    tags: ["ChatGPT", "Claude", "Automation"],
  },
  {
    slug: "qa-testing-zero-to-job-ready",
    title: "QA Testing: Zero to Job-Ready",
    description: "Go from zero to hireable QA tester. Manual testing, Jira, Postman, Agile — everything you need to land your first QA role.",
    instructor: "Naveen Sharma",
    level: "Beginner",
    lessons: 18,
    hours: "4.5",
    students: "3,214",
    rating: 4.8,
    badge: "FREE",
    badgeColor: "bg-blue-500 text-white",
    category: "QA & Testing",
    available: true,
    gradient: "from-blue-600 via-cyan-600 to-teal-700",
    icon: Shield,
    accent: "cyan",
    tags: ["Jira", "Postman", "Agile"],
  },
  {
    slug: "saas-implementation-masterclass",
    title: "SaaS Implementation Masterclass",
    description: "End-to-end SaaS implementation for enterprise clients. Real frameworks from healthcare SaaS. Go-live to hypercare.",
    instructor: "Naveen Sharma",
    level: "Intermediate",
    lessons: 15,
    hours: "3.5",
    students: "982",
    rating: 4.9,
    badge: "FREE",
    badgeColor: "bg-orange-500 text-white",
    category: "SaaS",
    available: true,
    gradient: "from-orange-600 via-amber-600 to-yellow-700",
    icon: TrendingUp,
    accent: "orange",
    tags: ["HIPAA", "Go-Live", "Stakeholders"],
  },
  {
    slug: "",
    title: "Building Your Tech Portfolio",
    description: "Build a standout tech portfolio from scratch. Projects, case studies, GitHub setup, and how to present your work.",
    instructor: "Naveen Sharma",
    level: "Beginner",
    lessons: 10,
    hours: "2",
    students: "—",
    rating: 0,
    badge: "COMING SOON",
    badgeColor: "bg-slate-600 text-slate-200",
    category: "Career",
    available: false,
    gradient: "from-slate-600 via-slate-700 to-slate-800",
    icon: BookOpen,
    accent: "slate",
    tags: ["GitHub", "Portfolio", "Career"],
  },
  {
    slug: "",
    title: "LinkedIn Optimization for Tech",
    description: "Turn your LinkedIn into a lead-generating machine. Profile copy, keyword strategy, content posting, and recruiter outreach.",
    instructor: "Naveen Sharma",
    level: "Beginner",
    lessons: 8,
    hours: "1.5",
    students: "—",
    rating: 0,
    badge: "COMING SOON",
    badgeColor: "bg-slate-600 text-slate-200",
    category: "Career",
    available: false,
    gradient: "from-slate-600 via-slate-700 to-slate-800",
    icon: Users,
    accent: "slate",
    tags: ["LinkedIn", "Personal Brand"],
  },
  {
    slug: "",
    title: "React & Next.js for Beginners",
    description: "Build modern web applications with React and Next.js. Start from the fundamentals and deploy a real app.",
    instructor: "Naveen Sharma",
    level: "Intermediate",
    lessons: 20,
    hours: "6",
    students: "—",
    rating: 0,
    badge: "COMING SOON",
    badgeColor: "bg-slate-600 text-slate-200",
    category: "Web Development",
    available: false,
    gradient: "from-slate-600 via-slate-700 to-slate-800",
    icon: Zap,
    accent: "slate",
    tags: ["React", "Next.js", "TypeScript"],
  },
];

function StarRating({ rating }: { rating: number }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-1">
      <span className="text-amber-400 font-bold text-sm">{rating.toFixed(1)}</span>
      <div className="flex">
        {[1,2,3,4,5].map((i) => (
          <Star key={i} size={12} className={i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"} />
        ))}
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = COURSES.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const mailtoHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=Notify%20me%20about%20new%20Opility%20courses`;
  const available = COURSES.filter((c) => c.available);
  const totalStudents = "6,043";

  return (
    <div className="bg-[#0f172a] text-slate-100 min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#0f172a] py-20 px-4">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 mb-6 font-medium">
            <BookOpen size={12} />
            {available.length} free courses · {totalStudents}+ students enrolled
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            Learn Tech Skills That<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Get You Hired
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Practical courses from a working professional in QA, AI, and SaaS. No fluff — just skills you can use from day one.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/15 rounded-2xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all text-sm"
            />
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-8">
          {[
            { label: "Total Students", value: totalStudents + "+" },
            { label: "Free Courses", value: String(available.length) },
            { label: "Total Lessons", value: "45" },
            { label: "Avg. Rating", value: "4.9 ★" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-white font-bold text-lg">{value}</p>
              <p className="text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pt-8 pb-2">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "border border-white/10 text-slate-400 hover:border-white/25 hover:text-white bg-white/[0.02]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.title}
                  className={`group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
                    course.available
                      ? "border-white/10 bg-[#1e293b] hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                      : "border-white/5 bg-[#161f2e] opacity-70"
                  }`}
                >
                  {/* Thumbnail */}
                  <div className={`relative h-40 bg-gradient-to-br ${course.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-2 right-2 h-24 w-24 rounded-full bg-white/10 blur-xl" />
                      <div className="absolute bottom-0 left-0 h-16 w-32 rounded-full bg-black/20 blur-lg" />
                    </div>
                    <Icon size={48} className="text-white/30 absolute right-6 bottom-4" />
                    <div className="relative text-center px-4">
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {course.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-white/20 text-white rounded-full px-2.5 py-0.5 font-medium backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Badge */}
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg ${course.badgeColor}`}>
                      {course.badge}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-5">
                    <span className="text-xs text-blue-400 font-medium mb-1">{course.category}</span>
                    <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-blue-100 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Instructor */}
                    <p className="text-slate-500 text-xs mb-3">By {course.instructor}</p>

                    {/* Rating + students */}
                    <div className="flex items-center gap-3 mb-3">
                      <StarRating rating={course.rating} />
                      {course.students !== "—" && (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Users size={11} />
                          {course.students} students
                        </span>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pb-4 border-b border-white/5">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {course.hours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={11} />
                        {course.lessons} lessons
                      </span>
                      <span className="capitalize">{course.level}</span>
                    </div>

                    {/* CTA */}
                    {course.available ? (
                      <a
                        href={`/courses/${course.slug}`}
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors shadow-lg shadow-blue-600/20"
                      >
                        Start Learning Free <ArrowRight size={14} />
                      </a>
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
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500">No courses found for &quot;{search}&quot;</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="mt-3 text-blue-400 text-sm hover:underline">Clear filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-10 text-center shadow-2xl shadow-blue-900/50">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-indigo-400/20 blur-2xl" />
            </div>
            <div className="relative">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 mb-5 mx-auto">
                <Mail size={24} className="text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">More Courses Coming</h2>
              <p className="text-blue-100 max-w-md mx-auto mb-7 text-sm leading-relaxed">
                New courses in React, LinkedIn growth, and portfolio building are in production. Get notified first.
              </p>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold rounded-xl px-6 py-3 text-sm transition-all hover:bg-blue-50 shadow-lg"
              >
                <Mail size={16} />
                Notify Me When New Courses Drop
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
