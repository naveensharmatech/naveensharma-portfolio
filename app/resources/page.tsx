"use client";

import { useState } from "react";
import { FileText, CheckSquare, BookOpen, User, Lock, Mail, Download } from "lucide-react";

const CONTACT_EMAIL = "naveen.freelancehub@gmail.com";

const CATEGORIES = ["All", "Templates", "Checklists", "SOPs", "Career Docs"];

const RESOURCES = [
  {
    title: "QA Test Plan Template",
    category: "Checklists",
    description:
      "Complete test plan template for web and mobile apps. Covers scope, test strategy, entry/exit criteria, test cases, and defect reporting sections.",
    icon: CheckSquare,
    format: "XLSX / PDF",
  },
  {
    title: "SaaS Onboarding SOP",
    category: "SOPs",
    description:
      "Step-by-step SaaS implementation checklist covering pre-go-live, data migration, user setup, training, and hypercare phases.",
    icon: BookOpen,
    format: "PDF / DOCX",
  },
  {
    title: "ATS Resume Template",
    category: "Career Docs",
    description:
      "ATS-optimized resume template for tech roles. Clean formatting, keyword-ready sections, and guidance notes for every block.",
    icon: User,
    format: "DOCX",
  },
  {
    title: "API Testing Checklist",
    category: "Checklists",
    description:
      "Postman-ready API validation checklist covering authentication, CRUD operations, status codes, error handling, and edge cases.",
    icon: CheckSquare,
    format: "PDF",
  },
  {
    title: "Website Project Brief Template",
    category: "Templates",
    description:
      "Client brief template for web projects. Covers goals, audience, design preferences, functionality requirements, and timeline.",
    icon: FileText,
    format: "DOCX / PDF",
  },
  {
    title: "LinkedIn Profile Audit Checklist",
    category: "Career Docs",
    description:
      "25-point LinkedIn optimization checklist covering headline, about section, experience entries, skills, recommendations, and profile SEO.",
    icon: User,
    format: "PDF",
  },
];

const CATEGORY_ICON_COLORS: Record<string, string> = {
  Templates: "bg-blue-600/20 text-blue-400",
  Checklists: "bg-green-600/20 text-green-400",
  SOPs: "bg-purple-600/20 text-purple-400",
  "Career Docs": "bg-orange-600/20 text-orange-400",
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  Templates: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Checklists: "bg-green-500/20 text-green-400 border-green-500/30",
  SOPs: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Career Docs": "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? RESOURCES
      : RESOURCES.filter((r) => r.category === activeCategory);

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=Notify%20me%20when%20FreelanceHub%20resources%20are%20available`;

  return (
    <div className="bg-[#0f172a] text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-12">
          <div className="h-[400px] w-[600px] rounded-full bg-blue-600/15 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 mb-6">
            <Download size={12} />
            No email required — download and use
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Free Resources &amp; Templates
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Practical templates, SOPs, checklists, and career documents — built from real
            professional experience.
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

      {/* Resources grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((resource) => (
              <div
                key={resource.title}
                className="border border-white/10 bg-white/[0.03] rounded-2xl p-6 flex flex-col opacity-80 hover:opacity-90 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex items-center justify-center w-11 h-11 rounded-xl ${
                      CATEGORY_ICON_COLORS[resource.category] || "bg-slate-600/20 text-slate-400"
                    }`}
                  >
                    <resource.icon size={20} />
                  </div>
                  <span
                    className={`text-xs rounded-full px-2.5 py-0.5 border font-medium ${
                      CATEGORY_BADGE_COLORS[resource.category] ||
                      "bg-slate-500/20 text-slate-400 border-slate-500/30"
                    }`}
                  >
                    {resource.category}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{resource.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-4 mb-4">
                  <span className="text-xs text-slate-600">Format: {resource.format}</span>
                </div>
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 border border-white/10 text-slate-500 rounded-xl px-4 py-2.5 text-sm font-semibold cursor-not-allowed"
                >
                  <Lock size={14} />
                  Coming Soon
                </button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              No resources in this category yet — check back soon.
            </div>
          )}
        </div>
      </section>

      {/* Notify CTA */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-blue-600/10 p-12 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[500px] rounded-full bg-blue-600/20 blur-[80px]" />
            </div>
            <div className="relative">
              <Mail size={32} className="text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Notify me when resources are available
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                All resources are currently in production. Drop an email to be notified when they
                go live — free to download, no strings attached.
              </p>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
              >
                <Mail size={16} />
                Notify Me When Available
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
