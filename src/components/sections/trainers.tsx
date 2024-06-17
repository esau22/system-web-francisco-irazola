"use client";

import Container from "@/components/shared/container";
import SubTitle from "@/components/ui/sub-title";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

const Trainers = () => {
  return (
    <section
      id="trainers"
      className="min-h-screen flex items-center justify-center"
    >
      <Container>
        <SubTitle title="Join Out" titlePrimary="Plana de Docentes" />
        <div>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
          >
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/director.jpeg"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/profe.jpg"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/profesora.jpg"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/director.jpg"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/img12.jpg"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/evento1.jpg"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Trainers;
