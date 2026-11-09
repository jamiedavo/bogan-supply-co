import Catalogue from "@/components/Catalogue";
import Footer from "@/components/Footer";
export const metadata = { title: "All Gear — Bogan Supply Co." };
export default function Collections() {
  return (
    <>
      <main className="page-shell">
        <p className="eyebrow">The full range / New Zealand</p>
        <h1 className="page-title">GOOD GEAR. ALL AGES.</h1>
        <p className="mb-10 max-w-xl text-ink/65">
          Men’s, women’s, and the little legends. 10 T-shirts and 5 hoodies in
          every range.
        </p>
        <Catalogue />
      </main>
      <Footer />
    </>
  );
}
