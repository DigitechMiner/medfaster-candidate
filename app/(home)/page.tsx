import Header from "@/components/global/header"
import HeroSection from "./sections/hero"
import GetHiredSection from "./sections/get-hired"
import { Footer } from "@/components/global/footer"
import TestimonialsSection from "./sections/testimonials"
import {
  CompanyLogos,
  AIHelpsSection,
  AllInOneSection,
  VerifiedSection,
  CareerOnTheGo,
  NextCareer,
} from "./sections"
export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 p-2 md:p-4 lg:p-6 xl:p-8 gap-2 md:gap-4 lg:gap-6 xl:gap-8 flex flex-col">
      <Header />
      <HeroSection />
      <CompanyLogos />
      <GetHiredSection />
      <AIHelpsSection />
      <AllInOneSection />
      <VerifiedSection />
      <TestimonialsSection />
      <NextCareer />
      <CareerOnTheGo />
      <Footer />
    </div>
  );
}