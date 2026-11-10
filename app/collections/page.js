import Catalogue from "@/components/Catalogue";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
export const metadata = {title:"All Gear — Bogan Supply Co."};
export default function Collections(){
 return <><main className="page-shell">
   <p className="eyebrow">The full range / New Zealand</p>
   <h1 className="page-title">THE BOGAN RANGE.</h1>
   <p className="mb-10 max-w-xl text-ink/65">{products.length} original tees across Blokes and Chicks. Rug rats is coming soon.</p>
   <Catalogue/>
 </main><Footer/></>;
}
