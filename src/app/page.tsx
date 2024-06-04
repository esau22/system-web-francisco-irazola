"use client";
import About from "@/components/about";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import Plans from "@/components/sections/plans";
import Services from "@/components/sections/services";
import Trainers from "@/components/sections/trainers";
import Header from "@/components/shared/header";
import { useEffect } from "react";

declare global {
  interface Window {
    watsonAssistantChatOptions?: {
      integrationID: string;
      region: string;
      serviceInstanceID: string;
      onLoad: (instance: any) => Promise<void>;
      clientVersion?: string;
    };
  }
}
export default function Home() {
  //const Home: React.FC = () => {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: "c0ba60ee-9e36-4e4d-97fc-083b2616a224", // The ID of this integration.
      region: "us-south", // The region your integration is hosted in.
      serviceInstanceID: "2ca88fc0-f00d-49b1-a9d2-f6ae137d9cf7", // The ID of your service instance.
      onLoad: async (instance) => {
        await instance.render();
      },
    };

    setTimeout(function () {
      const t = document.createElement("script");
      t.src =
        "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
        (window.watsonAssistantChatOptions!.clientVersion || "latest") +
        "/WatsonAssistantChatEntry.js";
      document.head.appendChild(t);
    }, 0);
  }, []);
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
