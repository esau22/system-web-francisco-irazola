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
                  src="/images/teacher/trainer-1.png"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/trainer-2.png"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/trainer-3.png"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/trainer-4.png"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/trainer-5.png"
                  alt="Trainer"
                  fill
                  className="object-cover rounded-xl shadow-xl"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative w-full h-[70vh] mx-auto">
                <Image
                  src="/images/teacher/trainer-6.png"
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
