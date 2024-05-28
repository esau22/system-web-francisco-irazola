import Image from "next/image";
import { FC } from "react";

interface ServiceProps {
  image: string;
  title: string;
  description: string;
}

const Service: FC<ServiceProps> = ({ image, title, description }) => {
  return (
    <div className="max-w-sm bg-gray-400 border-gray-400 rounded-lg shadow-md dark:bg-white dark:border-white">
      <div className="relative w-full h-72 mb-4">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-800 text-center">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-center">
        {description}
      </p>
    </div>
  );
};

export default Service;
