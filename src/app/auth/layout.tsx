import Image from "next/image";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 p-5 lg:p-8">
      <section className="hidden h-full lg:flex flex-col items-center justify-center gap-y-5 bg-primary rounded-2xl">
        <div className="relative w-96 h-96">
          <Image src="/wallpaper.svg" alt="wallpaper" fill />
        </div>
        <div>
          <h3 className="text-white text-4xl font-semibold text-center mb-5">
            I.E. <br /> Francisco Irazola
          </h3>
          <p className="text-gray-300 text-xl text-center">
            Additional Class that you can learn
          </p>
          <p className="text-gray-300 text-center">Annyhere and anytime</p>
        </div>
      </section>
      {children}
    </main>
  );
};

export default AuthLayout;
