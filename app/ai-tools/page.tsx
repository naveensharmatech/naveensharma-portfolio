"use client";

import { useState } from "react";
import { ExternalLink, Cpu, Sparkles } from "lucide-react";

const CATEGORIES = ["All", "Writing", "Coding", "Design", "Productivity", "Research"];

const TOOLS = [
  {
    name: "Claude",
    tagline: "AI Assistant",
    url: "https://claude.ai",
    urlDisplay: "claude.ai",
    description:
      "Best for writing, coding, and analysis. Exceptional at following nuanced instructions and producing high-quality long-form content.",
    category: "Writing",
    pricing: "Free tier",
    pricingColor: "bg-green-500/20 text-green-400 border-green-500/30",
    highlight: true,
  },
  {
    name: "ChatGPT",
    tagline: "AI Assistant",
    url: "https://openai.com/chatgpt",
    urlDisplay: "openai.com",
    description:
      "Industry standard, versatile AI assistant. Great all-rounder for writing, summarising, brainstorming, and general Q&A.",
    category: "Writing",
    pricing: "Free tier",
    pricingColor: "bg-green-500/20 text-green-400 border-green-500/30",
    highlight: false,
  },
  {
    name: "GitHub Copilot",
    tagline: "Coding",
    url: "https://github.com/features/copilot",
    urlDisplay: "github.com",
    description:
      "AI pair programmer for VS Code and other editors. Autocompletes code, writes functions from comments, and explains unfamiliar code.",
    category: "Coding",
    pricing: "Paid",
    pricingColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    highlight: false,
  },
  {
    name: "Midjourney",
    tagline: "Design",
    url: "https://midjourney.com",
    urlDisplay: "midjourney.com",
    description:
      "Best AI image generation for high-quality, artistic results. Used by designers, marketers, and content creators worldwide.",
    category: "Design",
    pricing: "Paid",
    pricingColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    highlight: false,
  },
  {
    name: "Notion AI",
    tagline: "Productivity",
    url: "https://notion.so",
    urlDisplay: "notion.so",
    description:
      "AI built directly into your Notion workspace. Summarise notes, draft documents, fill databases, and ask questions about your content.",
    category: "Productivity",
    pricing: "Free tier",
    pricingColor: "bg-green-500/20 text-green-400 border-green-500/30",
    highlight: false,
  },
  {
    name: "Perplexity",
    tagline: "Research",
    url: "https://perplexity.ai",
    urlDisplay: "perplexity.ai",
    description:
      "AI-powered search engine that cites its sources. Ideal for quick research, fact-checking, and staying on top of current events.",
    category: "Research",
    pricing: "Free tier",
    pricingColor: "bg-green-500/20 text-green-400 border-green-500/30",
    highlight: false,
  },
  {
    name: "Cursor",
    tagline: "Coding",
    url: "https://cursor.com",
    urlDisplay: "cursor.com",
    description:
      "AI-first code editor built on VS Code. Chat with your codebase, apply multi-file edits, and generate entire features from a prompt.",
    category: "Coding",
    pricing: "Free tier",
    pricingColor: "bg-green-500/20 text-green-400 border-green-500/30",
    highlight: false,
  },
  {
    name: "v0 by Vercel",
    tagline: "Design / Code",
    url: "https://v0.dev",
    urlDisplay: "v0.dev",
    description:
      "Generate production-ready React UI components from text prompts. Copy the code straight into your Next.js project.",
    category: "Design",
    pricing: "Free tier",
    pricingColor: "bg-green-500/20 text-green-400 border-green-500/30",
    highlight: false,
  },
];

export default function AIToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? TOOLS
      : TOOLS.filter((t) => t.category === activeCategory);

  return (
    <div className="bg-[#0f172a] text-slate-100">
      {/* Header */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center pt-12">
          <div className="h-[400px] w-[600px] rounded-full bg-blue-600/15 blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-400 mb-6">
            <Sparkles size={12} />
            Tested and reviewed by a working tech professional
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">AI Tools Directory</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Curated, tested, and reviewed so you know exactly what to use and when. No affiliate
            fluff — just honest takes.
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

      {/* Tools grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((tool) => (
              <div
                key={tool.name}
                className={`border bg-white/[0.03] rounded-2xl p-6 hover:border-blue-500/30 transition-all flex flex-col ${
                  tool.highlight
                    ? "border-blue-500/40 bg-blue-500/[0.04]"
                    : "border-white/10"
                }`}
              >
                {/* Icon + name */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/20">
                    <Cpu size={18} className="text-blue-400" />
                  </div>
                  {tool.highlight && (
                    <span className="text-xs rounded-full px-2.5 py-0.5 border bg-blue-500/20 text-blue-400 border-blue-500/30 font-semibold">
                      Editor&apos;s Pick
                    </span>
                  )}
                </div>

                <h3 className="text-white font-semibold text-lg mb-0.5">{tool.name}</h3>
                <p className="text-xs text-slate-500 mb-3">{tool.tagline}</p>

                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs rounded-full px-2.5 py-0.5 border font-medium ${tool.pricingColor}`}
                  >
                    {tool.pricing}
                  </span>
                  <span className="text-xs text-slate-600">{tool.urlDisplay}</span>
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  Visit Tool <ExternalLink size={13} />
                </a>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              No tools in this category yet — check back soon.
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-6 text-center">
            <p className="text-slate-500 text-sm">
              Tools are listed based on real-world use and honest assessment. FreelanceHub does not
              have affiliate relationships with any tools listed above.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
