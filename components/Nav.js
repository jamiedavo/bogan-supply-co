"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

export default function Nav() {
 const [scrolled,setScrolled]=useState(false);
 const [mobileOpen,setMobileOpen]=useState(false);
 const [shopOpen,setShopOpen]=useState(false);
 const {totalCount,openCart}=useCart();
 const pathname=usePathname();
 useEffect(()=>{
  const onScroll=()=>setScrolled(window.scrollY>40);
  onScroll();window.addEventListener("scroll",onScroll);
  return ()=>window.removeEventListener("scroll",onScroll);
 },[]);
 const isHome=pathname==="/";
 const solid=scrolled||!isHome;
 const linkColor=isHome?"text-bone":"text-ink";
 const closeMenu=()=>{setMobileOpen(false);setShopOpen(false);};
 return <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 border-b transition-[background-color,padding,border-color] duration-300 ${isHome?"h-[72px] bg-bitumen border-bone/10 py-3":solid?"bg-singlet/95 border-ink/[0.08] py-3":"bg-transparent border-transparent py-5"}`}>
   <Link href="/" className={`font-display text-2xl leading-none tracking-wide ${linkColor}`} onClick={closeMenu}>
     BOGAN <span className="block font-mono text-[9px] tracking-[0.2em] uppercase mt-1">Supply Co.</span>
   </Link>
   <div className="hidden md:flex items-center gap-7">
    <div className="relative" onKeyDown={e=>{if(e.key==="Escape")setShopOpen(false);}}>
     <button onClick={()=>setShopOpen(v=>!v)} aria-expanded={shopOpen} className={`uppercase text-[13px] hover:text-red ${linkColor}`}>Shop</button>
     {shopOpen&&<div className="absolute left-0 top-full pt-3 w-48">
      <div className="bg-singlet text-ink border border-ink/10 shadow-lg">
       <Link href="/collections" onClick={closeMenu} className="block px-4 py-3 text-sm hover:bg-bone">All gear</Link>
       {categories.map(cat=><Link key={cat.slug} href={`/collections/${cat.slug}`} onClick={closeMenu} className="block px-4 py-3 text-sm hover:bg-bone">{cat.name}</Link>)}
       <Link href="/#manifesto" onClick={closeMenu} className="block px-4 py-3 text-sm hover:bg-bone border-t border-ink/10">The Manifesto</Link>
      </div>
     </div>}
    </div>
    <button onClick={openCart} className={`uppercase text-[13px] hover:text-red ${linkColor}`}>Cart ({totalCount})</button>
   </div>
   <div className="md:hidden flex items-center gap-4">
    <button onClick={openCart} aria-label="Open cart" className={linkColor}>Cart ({totalCount})</button>
    <button onClick={()=>setMobileOpen(v=>!v)} aria-expanded={mobileOpen} aria-label="Toggle menu" className={`text-xl ${linkColor}`}>{mobileOpen?"×":"☰"}</button>
   </div>
   {mobileOpen&&<div className="absolute top-full left-0 right-0 bg-singlet border-b border-ink/10 md:hidden text-ink p-6 flex flex-col gap-4">
    <Link href="/collections" onClick={closeMenu}>All gear</Link>
    {categories.map(cat=><Link key={cat.slug} href={`/collections/${cat.slug}`} onClick={closeMenu}>{cat.name}</Link>)}
    <Link href="/#manifesto" onClick={closeMenu}>The Manifesto</Link>
   </div>}
 </nav>;
}
