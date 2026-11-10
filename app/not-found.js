import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="page-shell">
        <p className="eyebrow">404</p>
        <h1 className="page-title">Page not found.</h1>
        <p className="mb-8 text-ink/75">This page could not be found.</p>
        <Link href="/collections" className="button-primary inline-block">
          View all tees
        </Link>
      </main>
      <Footer />
    </>
  );
}
