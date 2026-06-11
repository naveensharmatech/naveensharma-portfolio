"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Circle,
  Clock,
  PlayCircle,
  Star,
} from "lucide-react";
import { Course } from "@/lib/courses-data";
import { getCourseProgress } from "@/lib/progress";

export function CourseOverview({ course }: { course: Course }) {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  useEffect(() => {
    const p = getCourseProgress(course.slug);
    setCompletedLessons(p?.completedLessons ?? []);
  }, [course.slug]);

  const progress = (completedLessons.length / course.lessons.length) * 100;
  const nextLesson =
    course.lessons.find((l) => !completedLessons.includes(l.id)) ??
    course.lessons[0];
  const allComplete = completedLessons.length >= course.lessons.length;

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100">
      {/* Back nav */}
      <div className="px-4 pt-8 pb-0 max-w-4xl mx-auto">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          All Courses
        </Link>
      </div>

      {/* Header */}
      <section className="px-4 py-10 max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-slate-400">
            {course.category}
          </span>
          <span className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-slate-400">
            {course.level}
          </span>
          <span
            className={`text-xs rounded-full px-2.5 py-0.5 border font-semibold ${course.badgeColor}`}
          >
            {course.badge}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {course.title}
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-6">
          {course.description}
        </p>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-400">
              {completedLessons.length} of {course.lessons.length} lessons complete
            </span>
            <span className="text-slate-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CTA */}
        {allComplete ? (
          <Link
            href={`/courses/${course.slug}/certificate`}
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl px-6 py-3 text-sm transition-colors"
          >
            <Star size={16} />
            Claim Your Certificate
          </Link>
        ) : (
          <Link
            href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-6 py-3 text-sm transition-colors"
          >
            <PlayCircle size={16} />
            {completedLessons.length === 0 ? "Start Course" : "Continue Learning"}
          </Link>
        )}
      </section>

      <div className="max-w-4xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-8">
        {/* Curriculum */}
        <div className="md:col-span-2">
          <h2 className="text-white font-semibold text-lg mb-4">
            Course Curriculum
          </h2>
          <div className="space-y-2">
            {course.lessons.map((lesson) => {
              const done = completedLessons.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={`/courses/${course.slug}/lessons/${lesson.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-blue-500/30 hover:bg-white/[0.05] transition-all group"
                >
                  {done ? (
                    <CheckCircle size={18} className="text-blue-400 shrink-0" />
                  ) : (
                    <Circle size={18} className="text-slate-600 group-hover:text-slate-400 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${done ? "text-blue-300" : "text-slate-200"}`}>
                      {lesson.id}. {lesson.title}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-slate-500 shrink-0">
                    <Clock size={12} />
                    {lesson.duration}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* What you'll learn */}
        <div>
          <div className="border border-white/10 bg-white/[0.03] rounded-2xl p-5">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-blue-400" />
              What You&apos;ll Learn
            </h2>
            <ul className="space-y-2">
              {course.whatYouLearn.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <CheckCircle size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
