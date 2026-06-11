import { COURSES_DATA } from "@/lib/courses-data";
import { CourseOverview } from "@/components/CourseOverview";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return COURSES_DATA.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES_DATA.find((c) => c.slug === slug);
  if (!course) notFound();
  return <CourseOverview course={course} />;
}
