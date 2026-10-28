import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bitumen text-bone px-8 pt-[140px] pb-20"
    >
      <div className="absolute -right-[10%] -bottom-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full border border-bone/[0.06]" />

      <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-bone-deep mb-6">
        <span className="inline-block w-[18px] h-[2px] bg-red" />
        Workshop drop 001
      </p>

      {/* The giant centerpiece headline — single word, massive display scale */}
      <h1 className="flex flex-col items-start font-display uppercase text-bone leading-[0.8] tracking-[-0.02em] text-[clamp(70px,18vw,240px)]">
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
          Shop the drop
        </a>
        <a
          href="#manifesto"
          className="text-[13px] tracking-[0.05em] uppercase border-b border-steel pb-1 transition-colors hover:border-bone hover:text-bone"
        >
          Enquire with Jamie Davidson
        </a>
      </div>
    </section>
  );
}
