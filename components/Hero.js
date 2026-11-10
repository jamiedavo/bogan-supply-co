import { products } from "@/data/products";

export default function Hero() {
  const earlyNight = products.find(p => p.slug === "early-night-postponed");
  const backShot = earlyNight?.images?.find(image => image.src.endsWith("-back.webp"));
  const image = backShot || { src: products[0].image, alt: `${products[0].name} BOGAN T-shirt` };

  return (
    <section id="top" aria-labelledby="first-drop-heading" className="bg-bitumen text-bone pt-[72px]">
      <div className="max-w-[1280px] mx-auto grid md:grid-cols-2">
        <div className="h-[44svh] min-h-[280px] max-h-[380px] md:h-[600px] md:max-h-none overflow-hidden">
          <img src={image.src} alt={image.alt} fetchPriority="high"
            className="w-full h-full object-cover object-center" />
        </div>
        <div className="px-6 py-6 md:px-12 md:py-16 flex flex-col justify-center items-start">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.18em] text-bone-deep mb-3">AOTEAROA / FIRST DROP</p>
          <h1 id="first-drop-heading" className="font-display text-[clamp(34px,8.8vw,48px)] md:text-[clamp(48px,5vw,72px)] leading-[1.08] mb-3">THE GOOD BLACK TEE.</h1>
          <p className="max-w-sm text-sm md:text-base leading-relaxed text-bone-deep mb-5">For gigs, birthdays and anything that says smart casual.</p>
          <a href="#shop" className="button-primary inline-flex min-h-12 items-center justify-center">Shop the tees</a>
        </div>
      </div>
    </section>
  );
}
