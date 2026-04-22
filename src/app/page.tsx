import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/ui/background";
import { Hero } from "@/components/sections/hero";
import { LogosStrip } from "@/components/sections/logos-strip";
import { Cinematic } from "@/components/sections/cinematic";
import { ProductGridSection } from "@/components/sections/product-grid";
import { ReviewsSection } from "@/components/sections/reviews";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { BeforeAfterSection } from "@/components/sections/before-after";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { TonyVideoSection } from "@/components/sections/tony-video";
import { MobileFloatingCta } from "@/components/mobile-floating-cta";

export default function Page() {
  return (
    <>
      <NoiseOverlay opacity={0.035} />
      <Nav />
      <main className="relative">
        <Hero />
        <LogosStrip />

        <Cinematic
          id="face-id"
          src="/media/check-in.jpeg"
          alt="Terminal de check-in con reconocimiento facial en la barbería"
          kicker="● Face ID · 68 puntos"
          title={
            <>
              El cliente entra.
              <br />
              Se escanea.
              <br />
              <span className="gradient-text-neon">Listo.</span>
            </>
          }
          body={
            <>
              Reconocimiento en menos de 2 segundos. Sin contacto, sin fricción,
              sin app. Tocá para ver el módulo completo con demo interactivo.
            </>
          }
          chips={["Ver módulo Check-in →"]}
          align="left"
          priority
        />

        <ProductGridSection />

        <Cinematic
          id="panel"
          src="/media/panel-barberos.jpeg"
          alt="Panel del barbero en tablet dentro del local"
          kicker="● Panel del barbero"
          title={
            <>
              El barbero corta.
              <br />
              <span className="gradient-text-neon">El sistema piensa por él.</span>
            </>
          }
          body={
            <>
              Cola en vivo, ficha del cliente, cierre en 3 toques, comisión
              automática. Entrá al módulo para probarlo interactivo.
            </>
          }
          chips={["Ver módulo Panel →"]}
          align="right"
          eyebrowTone="violet"
        />

        <ReviewsSection />
        <TonyVideoSection />
        <TestimonialsSection />
        <BeforeAfterSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <MobileFloatingCta />
    </>
  );
}
