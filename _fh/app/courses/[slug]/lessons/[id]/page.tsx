import { COURSES_DATA } from "@/lib/courses-data";
import { LessonViewer } from "@/components/LessonViewer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return COURSES_DATA.flatMap((c) =>
    c.lessons.map((l) => ({ slug: c.slug, id: String(l.id) }))
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const course = COURSES_DATA.find((c) => c.slug === slug);
  if (!course) notFound();
  const lesson = course.lessons.find((l) => l.id === Number(id));
  if (!lesson) notFound();
  return <LessonViewer course={course} lesson={lesson} />;
}
