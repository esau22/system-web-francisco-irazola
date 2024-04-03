import About from "@/components/about";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import Plans from "@/components/sections/plans";
import Services from "@/components/sections/services";
import Trainers from "@/components/sections/trainers";
import Header from "@/components/shared/header";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Plans />
      <Trainers />
      <About />
      <Footer />
    </>
  );
}
