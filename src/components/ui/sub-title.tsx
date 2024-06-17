import { FC } from "react";

interface SubTitleProps {
  title: string;
  titlePrimary: string;
}

const SubTitle: FC<SubTitleProps> = ({ title, titlePrimary }) => {
  return (
    <h1 className="text-4xl flex flex-col sm:flex-row items-center gap-2 text-white font-semibold mb-10">
      {title}
      <span className="text-primary">{titlePrimary}</span>
    </h1>
  );
};

export default SubTitle;
