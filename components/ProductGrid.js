import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-steel">Nothing here yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
