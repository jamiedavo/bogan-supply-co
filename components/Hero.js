import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-0 flex flex-col justify-start overflow-hidden bg-bitumen text-bone px-8 pt-[158px] pb-12 md:min-h-screen md:justify-center md:pt-[140px] md:pb-20"
    >
      <div className="absolute -right-[10%] -bottom-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full border border-bone/[0.06]" />

      <svg
        aria-hidden="true"
        viewBox="0 0 64 48"
        className="mb-5 h-10 w-14 text-red"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="M9 10a9 9 0 0 0 11 11l25 25 6-6-25-25A9 9 0 0 0 15 4l6 6-6 6-6-6Z" />
        <path d="M55 10a9 9 0 0 1-11 11L19 46l-6-6 25-25A9 9 0 0 1 49 4l-6 6 6 6 6-6Z" />
      </svg>

      {/* The giant centerpiece headline — single word, massive display scale */}
      <h1 className="flex flex-col items-start font-display uppercase text-bone leading-[0.8] tracking-[-0.02em] text-[clamp(87.5px,22.5vw,350px)]">
  BOGAN
  <span className="font-mono text-[clamp(14px,2.5vw,26px)] tracking-[0.18em] uppercase text-red mt-4 font-medium">
    Supply Co.
  </span>
</h1>

      <p className="max-w-[480px] text-base leading-[1.6] text-bone-deep mt-6 mb-10">
        Hardwearing kit for legends that don't do delicate washes.
      </p>

      <div className="flex items-center gap-7 flex-wrap">
        <a
          href="#shop"
          className="bg-red text-singlet px-[30px] py-[15px] text-[13px] tracking-[0.08em] uppercase font-semibold transition-colors hover:bg-red-dark"
        >
          Shop the Gear
        </a>
        <a
          href="#manifesto"
          className="text-[12px] tracking-[0.05em] uppercase border-b border-steel pb-1 transition-colors hover:border-bone hover:text-bone"
        >
          The Manifesto
        </a>
      </div>
    </section>
  );
}
