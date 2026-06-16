"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Star } from "lucide-react";
import { Course } from "@/lib/courses-data";
import { isCourseComplete, getCompletedAt } from "@/lib/progress";

export function CertificateViewer({ course }: { course: Course }) {
  const [studentName, setStudentName] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [completedDate, setCompletedDate] = useState("");
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const complete = isCourseComplete(course.slug, course.lessons.length);
    setUnlocked(complete);
    const at = getCompletedAt(course.slug);
    if (at) {
      setCompletedDate(
        new Date(at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } else {
      setCompletedDate(new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }));
    }
  }, [course.slug, course.lessons.length]);

  function handlePrint() {
    window.print();
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100">
      {/* Nav */}
      <div className="px-4 pt-8 pb-0 max-w-3xl mx-auto print:hidden">
        <Link
          href={`/courses/${course.slug}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Course
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {!unlocked ? (
          /* Locked state */
          <div className="text-center py-24">
            <Star size={40} className="text-slate-600 mx-auto mb-4" />
            <h2 className="text-white font-bold text-2xl mb-3">
              Complete the course to unlock your certificate
            </h2>
            <p className="text-slate-400 mb-6">
              You need to finish all {course.lessons.length} lessons to earn
              this certificate.
            </p>
            <Link
              href={`/courses/${course.slug}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
            >
              Go to Course
            </Link>
          </div>
        ) : (
          <>
            {/* Name input */}
            <div className="mb-8 print:hidden">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Enter your full name for the certificate
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full max-w-sm bg-white/[0.05] border border-white/20 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 text-sm"
              />
            </div>

            {/* Print button */}
            <div className="mb-8 print:hidden">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold rounded-xl px-5 py-2.5 text-sm transition-colors"
              >
                <Download size={16} />
                Download / Print Certificate
              </button>
            </div>

            {/* Certificate */}
            <div
              ref={certRef}
              className="relative overflow-hidden rounded-2xl border-2 border-yellow-500/40 bg-[#0a1628] p-10 text-center print:rounded-none print:border-none"
              style={{ minHeight: "480px" }}
            >
              {/* Watermark logo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/opility-logo.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 m-auto h-64 w-64 object-contain opacity-[0.08] select-none"
              />

              {/* Content */}
              <div className="relative">
                {/* Gold top bar */}
                <div className="h-1 w-24 bg-yellow-500 mx-auto rounded mb-8" />

                <p className="text-yellow-400 text-xs font-semibold tracking-widest uppercase mb-2">
                  Opility Academy
                </p>

                <p className="text-slate-400 text-sm mb-6">
                  This is to certify that
                </p>

                <h2 className="text-white font-bold text-3xl sm:text-4xl mb-6 min-h-[2.5rem]">
                  {studentName || "Your Name"}
                </h2>

                <p className="text-slate-400 text-sm mb-3">
                  has successfully completed
                </p>

                <h3 className="text-white font-semibold text-xl sm:text-2xl mb-8 max-w-lg mx-auto leading-tight">
                  {course.title}
                </h3>

                <div className="flex items-center justify-center gap-3 mb-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-500 text-xs mb-2">
                  {course.lessons.length} lessons · {course.level} level
                </p>
                <p className="text-slate-500 text-xs">
                  Completed {completedDate}
                </p>

                {/* Signature area */}
                <div className="mt-10 flex justify-center">
                  <div className="text-center">
                    <div className="h-px w-32 bg-white/20 mb-2" />
                    <p className="text-slate-400 text-xs">Naveen Sharma</p>
                    <p className="text-slate-600 text-xs">Opility Academy</p>
                  </div>
                </div>

                {/* Gold bottom bar */}
                <div className="h-1 w-24 bg-yellow-500 mx-auto rounded mt-8" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
