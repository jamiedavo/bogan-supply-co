import { notFound } from "next/navigation";
import Catalogue from "@/components/Catalogue";
import Footer from "@/components/Footer";
import { categories, products } from "@/data/products";
export function generateStaticParams(){ return categories.map(c=>({category:c.slug})); }
export async function generateMetadata({params}){
  const {category}=await params;const c=categories.find(c=>c.slug===category);
  return {title:`${c?.name||"Gear"} — Bogan Supply Co.`};
}
export default async function CollectionPage({params}){
  const {category}=await params;const c=categories.find(c=>c.slug===category);
  if(!c) notFound();
  const count=products.filter(p=>p.category===category).length;
  return <><main className="page-shell">
    <p className="eyebrow">{count} {count===1?"tee":"tees"} / BOGAN SUPPLY CO.</p>
    <h1 className="page-title">{c.name} GEAR</h1>
    <p className="mb-10 text-ink/65">{c.description}</p>
    <Catalogue key={c.slug} category={c.slug}/>
  </main><Footer/></>;
}
