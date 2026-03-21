import orderHeroImage from "@/assets/bbq-grill-meats.webp";

interface OrderHeroProps {
  title: string;
  subtitle: string;
}

export function OrderHero({ title, subtitle }: OrderHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${orderHeroImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/55" />
      <div className="relative px-4 py-10 md:py-12 md:px-8 lg:px-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h1>
        <p className="mt-3 max-w-2xl text-base md:text-lg text-white/85 leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}
