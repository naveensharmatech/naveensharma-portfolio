"use client";

import { useState } from "react";
import { Clock, Tag, ArrowRight, Mail, Rss } from "lucide-react";

const CONTACT_EMAIL = "naveen.freelancehub@gmail.com";

const CATEGORIES = ["All", "AI & Tools", "Web Development", "QA & Testing", "Career", "SaaS"];

const ARTICLES = [
  {
    title: "10 AI Tools Every Business Professional Should Know in 2026",
    excerpt:
      "AI isn't just for developers anymore. These 10 tools are practical, accessible, and will save you hours every week — whether you're in ops, marketing, or management.",
    category: "AI & Tools",
    readTime: "5 min read",
    date: "Jun 2026",
    slug: "ai-tools-business-professionals-2026",
  },
  {
    title: "Why QA Testing is the Most Underrated Tech Career Path",
    excerpt:
      "QA engineers are in high demand, the entry barrier is lower than development, and the pay is solid. Here's why you should seriously consider it as your next career move.",
    category: "QA & Testing",
    readTime: "4 min read",
    date: "May 2026",
    slug: "qa-testing-underrated-career",
  },
  {
    title: "WordPress vs React: Which Should You Choose for Your Business Site?",
    excerpt:
      "Both are great — but they solve different problems. Here's a frank breakdown for business owners who just want to make the right call without wading through developer debates.",
    category: "Web Development",
    readTime: "6 min read",
    date: "May 2026",
    slug: "wordpress-vs-react-business-site",
  },
  {
    title: "How to Get Your First SaaS Implementation Client",
    excerpt:
      "SaaS implementation consulting is a high-value niche that most freelancers overlook. Here's exactly how to position yourself and land that first paid engagement.",
    category: "SaaS",
    readTime: "5 min read",
    date: "Apr 2026",
    slug: "first-saas-implementation-client",
  },
  {
    title: "ATS-Proof Your Resume: A Technical Guide",
    excerpt:
      "Most resumes get filtered out before a human ever reads them. This guide covers the exact formatting, keyword placement, and structure that gets you past applicant tracking systems.",
    category: "Career",
    readTime: "7 min read",
    date: "Apr 2026",
    slug: "ats-proof-resume-guide",
  },
  {
    title: "Building an AI-Powered Portfolio That Gets Noticed",
    excerpt:
      "Your portfolio is your strongest sales asset. Learn how to use AI tools to write better case studies, generate thumbnails, and structure your work for maximum impact.",
    category: "Career",
    readTime: "4 min read",
    date: "Mar 2026",
    slug: "ai-powered-portfolio",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "AI & Tools": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Web Development": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "QA & Testing": "bg-green-500/20 text-green-400 border-green-500/30",
  Career: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  SaaS: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=Subscribe%20to%20FreelanceHub%20Insights`;

  return (
    <div className="bg-[#0f172a] text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-12">
          <div className="h-[400px] w-[600px] rounded-full bg-blue-600/15 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 mb-6">
            <Rss size={12} />
            Practical tech content from the field
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            FreelanceHub Insights
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tech tips, AI news, tutorials, and industry commentary — written by someone who does
            this work every day.
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

      {/* Articles grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article) => (
              <article
                key={article.slug}
                className="group border border-white/10 bg-white/[0.03] rounded-2xl p-6 hover:border-blue-500/30 transition-all flex flex-col cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1 text-xs rounded-full px-2.5 py-0.5 border ${
                      CATEGORY_COLORS[article.category] ||
                      "bg-slate-500/20 text-slate-400 border-slate-500/30"
                    }`}
                  >
                    <Tag size={10} />
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-600">{article.date}</span>
                </div>
                <h2 className="text-white font-semibold text-lg mb-3 leading-snug group-hover:text-blue-300 transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-blue-400 group-hover:gap-2 transition-all">
                    Read article <ArrowRight size={12} />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              No articles in this category yet — check back soon.
            </div>
          )}
        </div>
      </section>

      {/* More coming / Subscribe CTA */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-blue-600/10 p-12 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[300px] w-[500px] rounded-full bg-blue-600/20 blur-[80px]" />
            </div>
            <div className="relative">
              <Mail size={32} className="text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">More articles on the way</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-8">
                New insights drop regularly. Want to be notified when new content is published?
                Drop a quick email.
              </p>
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
              >
                <Mail size={16} />
                Notify Me About New Articles
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
