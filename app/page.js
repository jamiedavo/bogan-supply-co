import Link from "next/link";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";
export default function HomePage(){
 const featured=["petrolheads", "rock-dogs"].map(category=>products.find(p=>p.category===category)).filter(Boolean);
 const openingProducts=featured.length===2?featured:products.slice(0,2);
 return <><Hero/>
  <section id="shop" className="scroll-mt-[72px] px-6 sm:px-8 pt-8 md:pt-12 pb-16 max-w-[1280px] mx-auto">
   <div className="mb-6">
    <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-steel mb-4">
      <span className="inline-block w-[18px] h-[2px] bg-red"/>The range
    </p>
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
     <h2 className="font-sans font-semibold text-[clamp(26px,3.4vw,38px)] max-w-[560px]">THAT’S A BIT OF YOU.</h2>
     <Link href="/collections" className="inline-flex min-h-11 items-center gap-2 border-b border-ink text-sm font-semibold hover:text-red hover:border-red">
      View all tees <span aria-hidden="true">→</span>
     </Link>
    </div>
   </div>
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/[0.08] border border-ink/[0.08] mb-8">
    {openingProducts.map((product,index)=><ProductCard key={product.id} product={product} index={index}/>)}
   </div>
   <div className="grid sm:grid-cols-3 gap-3">
    {categories.map(cat=><Link href={`/collections/${cat.slug}`} key={cat.slug} className="group border border-ink/20 p-6 hover:bg-bone transition-colors">
     <span className="font-mono text-[10px] uppercase tracking-wider">{products.filter(p=>p.category===cat.slug).length} designs</span>
     <h3 className="font-display text-4xl uppercase my-3">{cat.name} <span className="text-red">↗</span></h3>
     <p className="text-sm text-ink/65">{cat.description}</p>
    </Link>)}
   </div>
  </section>
  <section id="manifesto" className="scroll-mt-[72px] bg-bitumen text-bone px-8 py-[120px]"><div className="max-w-[680px] mx-auto">
   <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-bone-deep mb-6"><span className="inline-block w-[18px] h-[2px] bg-red"/>Why</p>
   <h2 className="font-sans font-semibold text-[clamp(24px,3.6vw,36px)] leading-[1.25] mb-[22px]">BOGAN is for the rough units and everyday legends who know exactly who they are. No dress-up. No pretending. Just good gear with a bit of attitude.</h2>
  </div></section>
  <Footer/></>;
}
