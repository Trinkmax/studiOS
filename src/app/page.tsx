import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/ui/background";
import { HomeConversion } from "@/components/sections/home-conversion";
import { MobileFloatingCta } from "@/components/mobile-floating-cta";

export default function Page() {
  return (
    <>
      <NoiseOverlay opacity={0.035} />
      <Nav />
      <main className="relative">
        <HomeConversion />
      </main>
      <Footer />
      <MobileFloatingCta />
    </>
  );
}
