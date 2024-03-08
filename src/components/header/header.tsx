import DropdownUser from "./dropdowm-user";

const Header = () => {
  return (
    <header className="sticky top-0 z-999 flex w-full h-[6.8vw] border-b border-gray-500/30 drop-shadow-1 dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-14 ml-36 -mr-8">
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
