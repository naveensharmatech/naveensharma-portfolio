import { COURSES_DATA } from "@/lib/courses-data";
import { CertificateViewer } from "@/components/CertificateViewer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return COURSES_DATA.map((c) => ({ slug: c.slug }));
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES_DATA.find((c) => c.slug === slug);
  if (!course) notFound();
  return <CertificateViewer course={course} />;
}
