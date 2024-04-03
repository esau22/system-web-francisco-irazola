import Image from "next/image";
import Container from "../shared/container";
import Button from "../ui/button";

const Hero = () => {
  return (
    <section id="home">
      <div className="relative w-full h-screen">
        <Image
          src="/images/cards/cards-04.png"
          alt="Hero"
          fill
          className="object-cover"
        />
        <Container>
          <div className="absolute bg-gradient-to-tr from-black to-transparent left-0 top-0 w-full h-full" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 lg:left-60 -translate-x-1/2 lg:translate-x-0 space-y-10">
            <h1 className="text-white text-6xl lg:text-8xl font-semibold text-center lg:text-left">
              Your body <br /> Will transform
            </h1>
            <p className="text-gray-500">
              We are commited to helping you transform your life <br /> as part
              of our commitmentto you.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Button type="button" label="Get started" className="w-full" />
              <Button
                type="button"
                label="Watch reviews"
                className="border-2 border-primary bg-transparent hover:bg-transparent w-full"
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
