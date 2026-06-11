const KEY = "fh_progress";

type CourseProgress = {
  completedLessons: number[];
  startedAt: string;
  completedAt?: string;
};

type AllProgress = Record<string, CourseProgress>;

function load(): AllProgress {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function save(data: AllProgress) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function markLessonComplete(courseSlug: string, lessonId: number, totalLessons: number) {
  const all = load();
  const course = all[courseSlug] || { completedLessons: [], startedAt: new Date().toISOString() };
  if (!course.completedLessons.includes(lessonId)) {
    course.completedLessons = [...course.completedLessons, lessonId];
  }
  if (course.completedLessons.length >= totalLessons && !course.completedAt) {
    course.completedAt = new Date().toISOString();
  }
  all[courseSlug] = course;
  save(all);
}

export function isLessonComplete(courseSlug: string, lessonId: number): boolean {
  return load()[courseSlug]?.completedLessons.includes(lessonId) ?? false;
}

export function getCourseProgress(courseSlug: string): CourseProgress | null {
  return load()[courseSlug] ?? null;
}

export function isCourseComplete(courseSlug: string, totalLessons: number): boolean {
  const p = load()[courseSlug];
  return (p?.completedLessons.length ?? 0) >= totalLessons;
}

export function getCompletedAt(courseSlug: string): string | undefined {
  return load()[courseSlug]?.completedAt;
}
