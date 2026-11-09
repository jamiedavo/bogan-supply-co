import { notFound } from "next/navigation";
import Catalogue from "@/components/Catalogue";
import Footer from "@/components/Footer";
import { categories } from "@/data/products";
export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}
export async function generateMetadata({ params }) {
  params = await params;
  const c = categories.find((c) => c.slug === params.category);
  return { title: `${c?.name || "Gear"} — Bogan Supply Co.` };
}
export default async function CollectionPage({ params }) {
  params = await params;
  const c = categories.find((c) => c.slug === params.category);
  if (!c) notFound();
  return (
    <>
      <main className="page-shell">
        <p className="eyebrow">15 pieces / 10 T-shirts / 5 hoodies</p>
        <h1 className="page-title">{c.name} GEAR</h1>
        <p className="mb-10 text-ink/65">{c.description}</p>
        <Catalogue key={c.slug} category={c.slug} />
      </main>
      <Footer />
    </>
  );
}
