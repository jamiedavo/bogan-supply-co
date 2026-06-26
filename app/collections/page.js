import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";

export const metadata = {
  title: "All Gear — Bogan Supply Co.",
};

export default function AllCollectionsPage() {
  return (
    <main className="pt-[140px] px-8 pb-20 max-w-[1280px] mx-auto">
      <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-steel mb-4">
        <span className="inline-block w-[18px] h-[2px] bg-red" />
        The full range
      </p>
      <h1 className="font-display uppercase leading-[0.95] text-[clamp(32px,5vw,64px)] mb-16">
        All gear
      </h1>

      {categories.map((cat) => {
        const items = products.filter((p) => p.category === cat.slug);
        return (
          <section key={cat.slug} className="mb-20">
            <div className="flex items-baseline justify-between mb-6 flex-wrap gap-3">
              <h2 className="font-sans font-semibold text-[clamp(22px,2.6vw,30px)]">
                {cat.name}
              </h2>
              <Link
                href={`/collections/${cat.slug}`}
                className="text-[13px] uppercase tracking-[0.05em] border-b border-steel pb-0.5 transition-colors hover:text-red hover:border-red"
              >
                View {cat.name} only &rarr;
              </Link>
            </div>
            <ProductGrid items={items} />
          </section>
        );
      })}

      <Footer />
    </main>
  );
}
