const MESSAGE =
  "SMASHED IT \u2014 NO IRON REQUIRED \u2014 KIWI AS \u2014 CHUR BRO \u2014 MADE IN A SHED \u2014 ";

export default function Marquee() {
  return (
    <div className="bg-ink border-y border-bone/[0.08] overflow-hidden whitespace-nowrap py-[11px]">
      <div className="inline-block font-mono text-xs tracking-[0.12em] text-steel animate-marquee motion-reduce:animate-none">
        {MESSAGE.repeat(2)}
      </div>
    </div>
  );
}
