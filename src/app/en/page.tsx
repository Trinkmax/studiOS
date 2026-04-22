import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/ui/background";
import { Hero } from "@/components/sections/hero";
import { Cinematic } from "@/components/sections/cinematic";
import { TonyVideoSection } from "@/components/sections/tony-video";
import { FinalCtaSection } from "@/components/sections/final-cta";
import { MobileFloatingCta } from "@/components/mobile-floating-cta";

export default function EnPage() {
  return (
    <>
      <NoiseOverlay opacity={0.035} />
      <Nav />
      <main className="relative">
        <Hero />

        <Cinematic
          id="panel"
          src="/media/panel-barberos.jpeg"
          alt="Barber panel on a tablet inside the shop"
          kicker="● Barber panel"
          title={
            <>
              The barber cuts.
              <br />
              <span className="gradient-text-neon">The system thinks for them.</span>
            </>
          }
          body={
            <>
              Live queue, client profile, checkout in 3 taps, automatic
              commission. Open the module to try it interactive.
            </>
          }
          chips={["Open Panel module →"]}
          align="right"
          eyebrowTone="violet"
        />

        <TonyVideoSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <MobileFloatingCta />
    </>
  );
}
