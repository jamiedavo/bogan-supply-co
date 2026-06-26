import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-singlet px-8 pt-12 pb-8 border-t border-ink/[0.08]">
      <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-ink/[0.08]">
        <Link href="/" className="font-display text-base">
          BOGAN<span className="font-mono font-normal"> Supply Co.</span>
        </Link>
        <div className="flex items-center gap-6 text-xs uppercase tracking-[0.05em] text-steel">
          <a href="#">Shipping &amp; returns</a>
          <a href="#">Size guide</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-xs text-steel">
        <span>Made in a shed. Worn in public. &copy; 2026 Bogan Supply Co.</span>
        <div className="flex items-center gap-5">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
