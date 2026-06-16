"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Star,
  Lightbulb,
  Megaphone,
  Play,
  Bell,
  Users,
} from "lucide-react";
import { Course, Lesson, Section } from "@/lib/courses-data";
import { markLessonComplete, isLessonComplete } from "@/lib/progress";
import { SOCIAL } from "@/lib/social";

function SectionBlock({ s }: { s: Section }) {
  if (s.type === "h2") {
    return <h2 className="text-white text-xl font-semibold mt-8 mb-3">{s.text}</h2>;
  }
  if (s.type === "p") {
    return <p className="text-slate-300 leading-relaxed">{s.text}</p>;
  }
  if (s.type === "ul") {
    return (
      <ul className="space-y-2 pl-1">
        {s.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (s.type === "tip") {
    return (
      <div className="flex gap-3 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <Lightbulb size={18} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-blue-100 text-sm leading-relaxed">{s.text}</p>
      </div>
    );
  }
  if (s.type === "callout") {
    return (
      <div className="flex gap-3 bg-slate-700/40 border border-white/10 rounded-xl p-4">
        <Megaphone size={18} className="text-slate-400 shrink-0 mt-0.5" />
        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{s.text}</p>
      </div>
    );
  }
  return null;
}

function VideoSection({ lesson }: { lesson: Lesson }) {
  if (lesson.youtubeId) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1`}
          title={lesson.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      {/* Fake thumbnail */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 aspect-video flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-48 w-48 rounded-full bg-red-600/10 blur-3xl" />
        </div>
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-red-600 mb-3">
            <Play size={22} className="text-white fill-white ml-1" />
          </div>
          <p className="text-white font-semibold text-sm">Video Coming Soon</p>
          <p className="text-slate-400 text-xs mt-1">
            Subscribe on YouTube to get notified
          </p>
        </div>
      </div>

      {/* CTA bar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 border-t border-white/10">
        <a
          href={SOCIAL.youtube.subscribe}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
        >
          <Bell size={15} />
          Subscribe for Video Lessons
        </a>
        <a
          href={SOCIAL.facebook.group}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-blue-600/40 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
        >
          <Users size={15} />
          Join the Community
        </a>
      </div>
    </div>
  );
}

export function LessonViewer({
  course,
  lesson,
}: {
  course: Course;
  lesson: Lesson;
}) {
  const [done, setDone] = useState(false);
  const lessonIndex = course.lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex < course.lessons.length - 1
      ? course.lessons[lessonIndex + 1]
      : null;
  const allDone = lessonIndex === course.lessons.length - 1 && done;

  useEffect(() => {
    setDone(isLessonComplete(course.slug, lesson.id));
  }, [course.slug, lesson.id]);

  function handleMarkComplete() {
    markLessonComplete(course.slug, lesson.id, course.lessons.length);
    setDone(true);
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100">
      {/* Top nav */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            {course.title}
          </Link>
          <span className="text-xs text-slate-500">
            Lesson {lessonIndex + 1} of {course.lessons.length}
          </span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 py-10 space-y-5">
        <header className="mb-6">
          <p className="text-blue-400 text-sm font-medium mb-2">
            Lesson {lessonIndex + 1}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {lesson.title}
          </h1>
          <p className="text-slate-500 text-sm">{lesson.duration} read</p>
        </header>

        {/* Video section — above the written content */}
        <VideoSection lesson={lesson} />

        {lesson.sections.map((s, i) => (
          <SectionBlock key={i} s={s} />
        ))}

        {/* Community banner — bottom of every lesson */}
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <a
            href={SOCIAL.youtube.channel}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/15 p-4 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 shrink-0">
              <Play size={16} className="text-white fill-white ml-0.5" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Watch on YouTube</p>
              <p className="text-slate-400 text-xs">@nsfreelance · Video lessons</p>
            </div>
          </a>
          <a
            href={SOCIAL.facebook.group}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/15 p-4 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 shrink-0">
              <Users size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Ask in the Community</p>
              <p className="text-slate-400 text-xs">Opility · Facebook Group</p>
            </div>
          </a>
        </div>

        {/* Complete banner / certificate */}
        {allDone && (
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
            <Star size={28} className="text-yellow-400 mx-auto mb-3" />
            <h3 className="text-white font-bold text-lg mb-2">
              Course Complete!
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              You&apos;ve finished all {course.lessons.length} lessons. Claim your certificate now.
            </p>
            <Link
              href={`/courses/${course.slug}/certificate`}
              className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl px-6 py-3 text-sm transition-colors"
            >
              <Star size={16} />
              Get Certificate
            </Link>
          </div>
        )}

        {/* Action bar */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div>
            {!done ? (
              <button
                onClick={handleMarkComplete}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
              >
                <CheckCircle size={16} />
                Mark as Complete
              </button>
            ) : (
              <span className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium">
                <CheckCircle size={16} />
                Completed
              </span>
            )}
          </div>

          <div className="flex gap-3">
            {prevLesson && (
              <Link
                href={`/courses/${course.slug}/lessons/${prevLesson.id}`}
                className="inline-flex items-center gap-2 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white rounded-xl px-4 py-2.5 text-sm transition-colors"
              >
                <ArrowLeft size={14} />
                Previous
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
                onClick={() => {
                  if (!done) {
                    markLessonComplete(course.slug, lesson.id, course.lessons.length);
                  }
                }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
              >
                Next Lesson
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
