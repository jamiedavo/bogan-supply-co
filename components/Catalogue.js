"use client";
import { useState } from "react";
import Link from "next/link";
import ProductGrid from "./ProductGrid";
import { categories, products } from "@/data/products";
export default function Catalogue({category="all"}){
 const [query,setQuery]=useState("");
 const [sort,setSort]=useState("featured");
 const base=products.filter(p=>category==="all"||p.category===category);
 const items=base.filter(p=>`${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase().trim()));
 items.sort((a,b)=>sort==="price-low"?a.price-b.price:sort==="price-high"?b.price-a.price:sort==="name"?a.name.localeCompare(b.name):Number(b.featured)-Number(a.featured)||a.id-b.id);
 return <>
   <div className="flex flex-wrap gap-2 mb-8" aria-label="Shop by range">
    <Link className={`filter-pill ${category==="all"?"active":""}`} href="/collections">All gear</Link>
    {categories.map(c=><Link key={c.slug} className={`filter-pill ${category===c.slug?"active":""}`} href={`/collections/${c.slug}`}>{c.name}</Link>)}
   </div>
   {base.length>0&&<div className="grid sm:grid-cols-2 gap-4 border-y border-ink/15 py-5 mb-6">
    <label className="field-label">Find your gear<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try pressure, cult, noise…" className="field"/></label>
    <label className="field-label">Sort by<select className="field" value={sort} onChange={e=>setSort(e.target.value)}>
     <option value="featured">Featured first</option><option value="price-low">Price: low to high</option>
     <option value="price-high">Price: high to low</option><option value="name">Name: A–Z</option>
    </select></label>
   </div>}
   <p className="font-mono text-xs mb-6" role="status">{items.length} {items.length===1?"tee":"tees"} / NZD</p>
   {items.length?<ProductGrid items={items}/>:<div className="border border-ink/20 p-10 text-center">
    <p>{base.length?"No tees match that search.":"This range is coming soon."}</p>
    {base.length>0&&<button className="mt-4 underline" onClick={()=>setQuery("")}>Clear search</button>}
   </div>}
 </>;
}
