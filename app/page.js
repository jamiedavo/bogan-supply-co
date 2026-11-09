import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <Hero />
      <Marquee />

      <section id="shop" className="px-8 pt-24 pb-16 max-w-[1280px] mx-auto">
        <div className="mb-12">
          <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-steel mb-4">
            <span className="inline-block w-[18px] h-[2px] bg-red" />
            The range
          </p>
          <h2 className="font-sans font-semibold text-[clamp(26px,3.4vw,38px)] max-w-[560px]">
            Gear for the whole bloody crew.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-12">
          {categories.map((cat) => (
            <Link
              href={`/collections/${cat.slug}`}
              key={cat.slug}
              className="group border border-ink/20 p-6 hover:bg-bone transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider">
                10 T-shirts / 5 hoodies
              </span>
              <h3 className="font-display text-4xl uppercase my-3">
                {cat.name} <span className="text-red">↗</span>
              </h3>
              <p className="text-sm text-ink/65">{cat.description}</p>
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-2xl uppercase">First picks</h3>
          <p className="font-mono text-[10px] uppercase">45 pieces / NZD</p>
        </div>
        <ProductGrid items={featured} />

        <div className="mt-12 text-center">
          <Link
            href="/collections"
            className="inline-block text-[13px] uppercase tracking-[0.08em] font-semibold border-b-2 border-ink pb-1 transition-colors hover:text-red hover:border-red"
          >
            View All Gear &rarr;
          </Link>
        </div>
      </section>

      <section id="manifesto" className="bg-bitumen text-bone px-8 py-[120px]">
        <div className="max-w-[680px] mx-auto">
          <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-bone-deep mb-6">
            <span className="inline-block w-[18px] h-[2px] bg-red" />
            Why
          </p>
          <h2 className="font-sans font-semibold text-[clamp(24px,3.6vw,36px)] leading-[1.25] mb-[22px]">
            BOGAN is for rough units and everyday legends who know that "she'll
            be right" only works if you build it tough from the start. From the
            shed to the school run. A bit of Kiwi attitude for every generation.
          </h2>
          <p className="text-bone-deep text-[15px] leading-[1.7] max-w-[560px]"></p>
        </div>
      </section>

      <Footer />
    </>
  );
}
