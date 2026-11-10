import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";
export default function HomePage(){
 const ranges=categories.filter(cat=>products.some(p=>p.category===cat.slug));
 return <><Hero/><Marquee/>
  <section id="shop" className="px-8 pt-24 pb-16 max-w-[1280px] mx-auto">
   <div className="mb-12">
    <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-steel mb-4">
      <span className="inline-block w-[18px] h-[2px] bg-red"/>The range
    </p>
    <h2 className="font-sans font-semibold text-[clamp(26px,3.4vw,38px)] max-w-[560px]">Original tees. No filler.</h2>
   </div>
   <div className="grid sm:grid-cols-3 gap-3 mb-12">
    {categories.map(cat=><Link href={`/collections/${cat.slug}`} key={cat.slug} className="group border border-ink/20 p-6 hover:bg-bone transition-colors">
     <span className="font-mono text-[10px] uppercase tracking-wider">{products.filter(p=>p.category===cat.slug).length} designs</span>
     <h3 className="font-display text-4xl uppercase my-3">{cat.name} <span className="text-red">↗</span></h3>
     <p className="text-sm text-ink/65">{cat.description}</p>
    </Link>)}
   </div>
   {ranges.map(cat => <div key={cat.slug} className="mt-12">
    <div className="flex justify-between items-center gap-4 mb-6"><h3 className="font-display text-2xl uppercase">The {cat.name} collection</h3><p className="font-mono text-[10px] uppercase">{products.filter(p=>p.category===cat.slug).length} original tees / NZD</p></div>
    <ProductGrid items={products.filter(p=>p.category===cat.slug)}/>
    <div className="mt-8 text-center"><Link href={`/collections/${cat.slug}`} className="inline-block text-[13px] uppercase tracking-[0.08em] font-semibold border-b-2 border-ink pb-1 hover:text-red hover:border-red">Shop {cat.name} →</Link></div>
   </div>)}
  </section>
  <section id="manifesto" className="bg-bitumen text-bone px-8 py-[120px]"><div className="max-w-[680px] mx-auto">
   <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-bone-deep mb-6"><span className="inline-block w-[18px] h-[2px] bg-red"/>Why</p>
   <h2 className="font-sans font-semibold text-[clamp(24px,3.6vw,36px)] leading-[1.25] mb-[22px]">BOGAN is for the rough units and everyday legends who know exactly who they are. No dress-up. No pretending. Just good gear with a bit of attitude.</h2>
  </div></section>
  <Footer/></>;
}
