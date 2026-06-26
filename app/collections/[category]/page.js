import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";

// Pre-render /collections/petrolheads, /collections/rock-dogs, /collections/sheilas
export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({ params }) {
  const cat = categories.find((c) => c.slug === params.category);
  return {
    title: cat ? `${cat.name} — Bogan Supply Co.` : "Bogan Supply Co.",
  };
}

export default function CollectionPage({ params }) {
  const cat = categories.find((c) => c.slug === params.category);
  if (!cat) notFound();

  const items = products.filter((p) => p.category === cat.slug);

  return (
    <main>
      {/* Same layout as the mockup's .shop section, scoped to this category */}
      <section className="px-8 pt-[140px] pb-16 max-w-[1280px] mx-auto">
        <div className="mb-12">
          <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-steel mb-4">
            <span className="inline-block w-[18px] h-[2px] bg-red" />
            The range
          </p>
          <h1 className="font-sans font-semibold text-[clamp(26px,3.4vw,38px)] max-w-[560px]">
            {cat.name}. All heavyweight.
          </h1>
        </div>

        <ProductGrid items={items} />
      </section>

      <Footer />
    </main>
  );
}
