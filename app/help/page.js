import Link from "next/link";
import Footer from "@/components/Footer";
export const metadata = { title: "The Details — Bogan Supply Co." };
export default function Help() {
  return (
    <>
      <main className="page-shell max-w-[850px]">
        <p className="eyebrow">The small print / plain English</p>
        <h1 className="page-title">THE DETAILS.</h1>
        <p className="mb-12 leading-relaxed">
          This is a preview of the first Bogan Supply Co. range. Designs,
          colours, prices, and garment specifications are proposals. We aren’t
          taking orders in preview.
        </p>
        <section id="sizing" className="help-section">
          <h2>Get the right fit</h2>
          <p>
            Men’s: S–3XL. Women’s: XS–2XL. Kids’: 2–14 age labels. Size labels
            are a starting point; they don’t guarantee a fit. Garment
            measurements and a supplier-confirmed size chart will be added after
            sampling, before orders open.
          </p>
        </section>
        <section id="delivery" className="help-section">
          <h2>New Zealand delivery</h2>
          <p>
            The cart demonstrates $8 standard delivery, free standard delivery
            from $150, and a $5 rural surcharge. These are example rates,
            pending courier confirmation. Delivery zones, dispatch times, and
            final rates will be confirmed before launch.
          </p>
        </section>
        <section id="returns" className="help-section">
          <h2>Returns & exchanges</h2>
          <p>
            The return address, contact channel, and change-of-mind exchange
            terms will be published before launch. This preview does not take
            orders or provide a final returns policy.
          </p>
        </section>
        <section id="contact" className="help-section">
          <h2>Get in touch</h2>
          <p>
            A customer support email will be published when the store opens. No
            contact form submissions or mailing list signups are being collected
            in this preview.
          </p>
        </section>
        <section id="privacy" className="help-section">
          <h2>Your cart & privacy</h2>
          <p>
            Your selected products, sizes, colours, and quantities are saved in
            this browser so your cart survives a refresh. No address or payment
            details are collected in preview. A complete privacy policy will be
            published before launch.
          </p>
        </section>
        <Link href="/collections" className="button-primary inline-block mt-8">
          Back to the gear →
        </Link>
      </main>
      <Footer />
    </>
  );
}
