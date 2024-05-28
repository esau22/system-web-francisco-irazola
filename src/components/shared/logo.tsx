import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <Image
          src="/logo_fi.png"
          alt="Logo"
          width={150}
          height={150}
          className="w-24"
        />
      </Link>
    </>
  );
};

export default Logo;
