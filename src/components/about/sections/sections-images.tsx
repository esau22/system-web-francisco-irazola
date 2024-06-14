import Image from "next/image";

const SectionImages = () => {
  return (
    <section className="flex-1 relative">
      <div className="lg:absolute -top-40 left-8">
        <div className="relative w-[80vw] mb-5 lg:w-48 h-72">
          <Image
            src="/images/teacher/logro1.jpg"
            alt="Trainer"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="lg:absolute top-0 right-40">
        <div className="relative w-[80vw] mb-5 lg:w-48 h-72">
          <Image
            src="/images/teacher/logro2.jpg"
            alt="Trainer"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="lg:absolute top-40 left-20">
        <div className="relative w-[80vw] mb-5 lg:w-64 h-48">
          <Image
            src="/images/teacher/logro3.jpg"
            alt="Trainer"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
      <div className="lg:absolute -top-64 right-52">
        <div className="relative w-[80vw] mb-5 lg:w-64 h-48">
          <Image
            src="/images/teacher/logro4.jpg"
            alt="Trainer"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default SectionImages;
