import CheckoutReview from "@/components/CheckoutReview";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Review Your Gear — Bogan Supply Co.",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";
export default function CheckoutPage() {
  const enabled = process.env.SHOPIFY_CHECKOUT_ENABLED === "true";
  return (
    <>
      <main className="page-shell">
        <p className="eyebrow">Your gear / New Zealand delivery</p>
        <h1 className="page-title">ONE LAST LOOK.</h1>
        <p className="text-ink/65 mb-10">
          Check your sizes. Check your colours. Keep the good stuff.
        </p>
        <CheckoutReview enabled={enabled} />
      </main>
      <Footer />
    </>
  );
}
