import gsap from "gsap";
import React, { useRef } from "react";

const NavBar: React.FC = () => {
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);

  const hamburgerMouseEnter = () => {
    if (line1.current && line2.current && line3.current) {
      gsap.to(line1.current, { y: 6, duration: 0.5 }); // move down
      gsap.to(line2.current, { opacity: 0, duration: 0.5 });
      gsap.to(line3.current, { y: -6, duration: 0.5 }); // move up
    }
  };

  const hamburgerMouseLeave = () => {
    if (line1.current && line2.current && line3.current) {
      gsap.to(line1.current, { y: 0, rotate: 0, duration: 0.5 });
      gsap.to(line2.current, { opacity: 1, duration: 0.5 });
      gsap.to(line3.current, { y: 0, rotate: 0, duration: 0.5 });
    }
  };

  return (
    <header className="fixed flex h-[3.625rem] left-18 top-18 text-2xl text-[#EFE7D2] font-semibold tracking-[1px]">
      <nav className=" flex items-center rounded-xl bg-[#0A0B0A]  justify-between">
        <button
          onMouseEnter={hamburgerMouseEnter}
          onMouseLeave={hamburgerMouseLeave}
          className="m-2 h-[41px] w-[41px] rounded-lg bg-[#181818] border border-[#EFE7D2]/15 relative flex flex-col justify-center items-center gap-[5px] hover:cursor-pointer"
        >
          <div ref={line1} className="bg-[#EFE7D2] h-px w-[20px]"></div>
          <div ref={line2} className="bg-[#EFE7D2] h-px w-[20px]"></div>
          <div ref={line3} className="bg-[#EFE7D2] h-px w-[20px]"></div>
        </button>
        <div className="mx-1 my-3">
          <a
            href="/"
            className="hover:text-white hover:drop-shadow-(--drop-shadow-glow) transition duration-150"
          >
            Restaurant
          </a>
        </div>

        <div className="text-xs m-2 flex gap-1 items-center">
          <div className="">
            <a
              href="/"
              className="p-3 border-1 border-[#EFE7D2]/0 rounded-lg hover:border hover:border-[#EFE7D2]/15 hover:bg-[#181818] transition duration-450"
            >
              MENU
            </a>
          </div>
          <a
            href="/"
            className="p-3 border-1 border-[#EFE7D2]/0 rounded-lg hover:border hover:border-[#EFE7D2]/15 hover:bg-[#181818] transition duration-450"
          >
            ABOUT
          </a>
          <a
            href="/"
            className="bg-[#181818] border border-[#EFE7D2]/15 rounded-lg p-3 hover:border-[#EFE7D2]/50 hover:bg-[#292929] transition duration-450"
          >
            BOOK A TABLE
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
