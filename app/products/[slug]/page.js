import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct, categories } from "@/data/products";
import ProductDetails from "@/components/ProductDetails";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  params = await params;
  const p = getProduct(params.slug);
  return {
    title: `${p?.name || "Product"} — Bogan Supply Co.`,
    description: p?.description,
  };
}
export default async function ProductPage({ params }) {
  params = await params;
  const product = getProduct(params.slug);
  if (!product) notFound();
  const category = categories.find((c) => c.slug === product.category);
  return (
    <>
      <main className="page-shell">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-xs mb-8 flex gap-3 flex-wrap"
        >
          <Link href="/collections">All gear</Link>
          <span>/</span>
          <Link href={`/collections/${category.slug}`}>{category.name}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>
        <ProductDetails product={product} />
        <section className="mt-20">
          <h2 className="font-display text-3xl uppercase mb-8">
            More from the crew
          </h2>
          <ProductGrid
            items={products
              .filter(
                (p) =>
                  p.category === product.category && p.slug !== product.slug,
              )
              .slice(0, 3)}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
