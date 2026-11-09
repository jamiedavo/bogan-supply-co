import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-singlet px-8 pt-12 pb-8 border-t border-ink/15">
      <div className="max-w-[1216px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-ink/15">
          <Link href="/" className="font-display text-xl">
            BOGAN
            <span className="font-mono font-normal text-sm"> Supply Co.</span>
          </Link>
          <div className="flex flex-wrap gap-5 text-xs uppercase tracking-wider">
            <Link href="/help#delivery">Delivery</Link>
            <Link href="/help#returns">Returns</Link>
            <Link href="/help#sizing">Sizing</Link>
            <Link href="/help#contact">Contact</Link>
            <Link href="/help#privacy">Privacy</Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 pt-6 text-xs text-ink/65">
          <span>
            Made for the shed. Worn in public. © 2026 Bogan Supply Co.
          </span>
          <span>New Zealand / NZD / Store preview</span>
        </div>
      </div>
    </footer>
  );
}
