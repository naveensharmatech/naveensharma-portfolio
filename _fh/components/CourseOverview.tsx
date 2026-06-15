"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, BookOpen, CheckCircle, Circle, Clock,
  PlayCircle, Star, Users, Play, Globe, Award, Zap,
} from "lucide-react";
import { Course } from "@/lib/courses-data";
import { getCourseProgress } from "@/lib/progress";
import { SOCIAL } from "@/lib/social";

const COURSE_META: Record<string, { students: string; rating: number; hours: string; updated: string }> = {
  "ai-tools-for-business":         { students: "1,847", rating: 4.9, hours: "2.5", updated: "June 2025" },
  "qa-testing-zero-to-job-ready":  { students: "3,214", rating: 4.8, hours: "4.5", updated: "June 2025" },
  "saas-implementation-masterclass": { students: "982",  rating: 4.9, hours: "3.5", updated: "June 2025" },
};

export function CourseOverview({ course }: { course: Course }) {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const meta = COURSE_META[course.slug] ?? { students: "—", rating: 4.8, hours: "—", updated: "2025" };

  useEffect(() => {
    const p = getCourseProgress(course.slug);
    setCompletedLessons(p?.completedLessons ?? []);
  }, [course.slug]);

  const progress = (completedLessons.length / course.lessons.length) * 100;
  const nextLesson = course.lessons.find((l) => !completedLessons.includes(l.id)) ?? course.lessons[0];
  const allComplete = completedLessons.length >= course.lessons.length;

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100">

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-[#0a1628] via-[#0d1f3c] to-[#0a1628] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={15} />
            All Courses
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left: info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-3 py-1">{course.category}</span>
                <span className="text-xs bg-white/5 text-slate-400 border border-white/10 rounded-full px-3 py-1">{course.level}</span>
                <span className={`text-xs font-bold rounded-full px-3 py-1 ${course.badgeColor}`}>{course.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">{course.title}</h1>
              <p className="text-slate-400 text-base leading-relaxed mb-5">{course.description}</p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 mb-5 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} size={14} className={i <= Math.round(meta.rating) ? "text-amber-400 fill-amber-400" : "text-slate-600"} />
                    ))}
                  </div>
                  <span className="text-amber-400 font-bold">{meta.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({meta.students} students)</span>
                </div>
                <span className="flex items-center gap-1 text-slate-400"><Clock size={13} /> {meta.hours} hours</span>
                <span className="flex items-center gap-1 text-slate-400"><BookOpen size={13} /> {course.lessons} lessons</span>
                <span className="flex items-center gap-1 text-slate-400"><Globe size={13} /> English</span>
              </div>

              <p className="text-slate-400 text-sm">
                Created by <span className="text-blue-400 font-medium">Naveen Sharma</span>
                <span className="text-slate-600 mx-2">·</span>
                Last updated <span className="text-slate-300">{meta.updated}</span>
              </p>
            </div>

            {/* Right: quick CTA (desktop only in hero, hidden on mobile — sticky card handles mobile) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Progress (if started) */}
            {completedLessons.length > 0 && (
              <div className="bg-[#1e293b] rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-semibold">Your Progress</p>
                  <span className="text-sm text-slate-400">{completedLessons.length}/{course.lessons.length} lessons</span>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-slate-500 mt-2">{Math.round(progress)}% complete</p>
              </div>
            )}

            {/* What you'll learn */}
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/10">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Zap size={18} className="text-blue-400" />
                What You&apos;ll Learn
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.whatYouLearn.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle size={15} className="text-green-400 shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-white font-bold text-lg mb-4">
                Course Curriculum
                <span className="text-slate-500 font-normal text-sm ml-2">({course.lessons.length} lessons · {meta.hours} hours)</span>
              </h2>
              <div className="bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden">
                {course.lessons.map((lesson, i) => {
                  const done = completedLessons.includes(lesson.id);
                  const isNext = nextLesson.id === lesson.id && !allComplete;
                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${course.slug}/lessons/${lesson.id}`}
                      className={`flex items-center gap-3 px-5 py-4 transition-all group ${
                        i !== course.lessons.length - 1 ? "border-b border-white/5" : ""
                      } ${done ? "bg-blue-500/5" : isNext ? "bg-white/[0.03]" : "hover:bg-white/[0.03]"}`}
                    >
                      <div className="shrink-0">
                        {done ? (
                          <div className="h-7 w-7 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <CheckCircle size={15} className="text-blue-400" />
                          </div>
                        ) : isNext ? (
                          <div className="h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center">
                            <Play size={11} className="text-white fill-white ml-0.5" />
                          </div>
                        ) : (
                          <div className="h-7 w-7 rounded-full border border-white/10 flex items-center justify-center">
                            <Circle size={13} className="text-slate-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${done ? "text-blue-300" : isNext ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                          {lesson.id}. {lesson.title}
                        </p>
                        {isNext && <p className="text-xs text-blue-400 mt-0.5">Up next</p>}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {lesson.youtubeId && <Play size={11} className="text-slate-500" />}
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock size={11} />
                          {lesson.duration}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/10">
              <h2 className="text-white font-bold text-lg mb-4">Your Instructor</h2>
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shrink-0 text-white font-bold text-xl">
                  N
                </div>
                <div>
                  <p className="text-white font-semibold">Naveen Sharma</p>
                  <p className="text-blue-400 text-sm mb-2">QA Engineer · SaaS Implementation Consultant · AI Tools Expert</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Working professional with 8+ years in QA, SaaS implementation, and technology consulting. Based in Israel, working with clients across healthcare, fintech, and enterprise SaaS globally.
                  </p>
                  <div className="flex gap-3 mt-3">
                    <a href={SOCIAL.youtube.channel} target="_blank" rel="noopener noreferrer" className="text-xs text-red-400 hover:underline flex items-center gap-1">
                      <Play size={11} className="fill-red-400" /> YouTube
                    </a>
                    <a href={SOCIAL.facebook.page} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                      <Users size={11} /> Community
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-20">
            <div className="bg-[#1e293b] rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/30">
              {/* Preview image */}
              <div className="h-44 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 flex items-center justify-center relative">
                <div className="h-16 w-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <BookOpen size={28} className="text-white" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-white/5 blur-2xl" />
                </div>
              </div>

              <div className="p-6">
                {/* Price */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl font-extrabold text-white">FREE</span>
                  <span className={`text-xs font-bold rounded-lg px-2.5 py-1 ${course.badgeColor}`}>{course.badge}</span>
                </div>

                {/* CTA */}
                {allComplete ? (
                  <Link href={`/courses/${course.slug}/certificate`} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-900 font-bold rounded-xl px-4 py-3 text-sm transition-all shadow-lg shadow-yellow-500/20 mb-3">
                    <Award size={16} />
                    Claim Your Certificate
                  </Link>
                ) : (
                  <Link href={`/courses/${course.slug}/lessons/${nextLesson.id}`} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl px-4 py-3 text-sm transition-all shadow-lg shadow-blue-600/25 mb-3">
                    <PlayCircle size={16} />
                    {completedLessons.length === 0 ? "Start Course — It's Free" : "Continue Learning"}
                  </Link>
                )}

                <p className="text-center text-slate-500 text-xs mb-5">No credit card · No sign-up required</p>

                {/* Includes */}
                <div className="space-y-2.5 text-sm border-t border-white/10 pt-5">
                  <p className="text-white font-semibold mb-3">This course includes:</p>
                  {[
                    { icon: BookOpen, text: `${course.lessons} written lessons` },
                    { icon: Play, text: "Video lessons (coming soon)" },
                    { icon: Clock, text: `${meta.hours} hours of content` },
                    { icon: Award, text: "Completion certificate" },
                    { icon: Globe, text: "Full lifetime access" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2.5 text-slate-400">
                      <Icon size={14} className="text-blue-400 shrink-0" />
                      {text}
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
                  <a href={SOCIAL.youtube.channel} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors py-1">
                    <div className="h-7 w-7 rounded-lg bg-red-600/20 flex items-center justify-center"><Play size={12} className="text-red-400 fill-red-400 ml-0.5" /></div>
                    Watch on YouTube
                  </a>
                  <a href={SOCIAL.facebook.group} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors py-1">
                    <div className="h-7 w-7 rounded-lg bg-blue-600/20 flex items-center justify-center"><Users size={12} className="text-blue-400" /></div>
                    Join the Community
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
