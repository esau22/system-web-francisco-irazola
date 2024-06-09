import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <Image
          src="/images/logo/logo_fi.png"
          alt="Logo"
          width={150}
          height={150}
          className="w-24 object-cover"
        />
      </Link>
    </>
  );
};

export default Logo;
