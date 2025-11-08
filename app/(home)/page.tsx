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
import { Screen } from "@/components/global/screen"
export default function Home() {
  return (
    <Screen>
      <Header >
      <HeroSection /></Header>
      <CompanyLogos />
      <GetHiredSection />
      <AIHelpsSection />
      <AllInOneSection />
      <VerifiedSection />
      <TestimonialsSection />
      <NextCareer />
      <CareerOnTheGo />
      <Footer />
    </Screen>
  );
}