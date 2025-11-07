import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Link from "./components/Link/Link";
gsap.registerPlugin(SplitText);

const NavBar: React.FC = () => {
  const [navBarToggled, setNavBarToggled] = useState<boolean>(false);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const text = useRef<(HTMLLIElement | null)[]>([]);
  const splitTextRef = useRef<(SplitText | null)[]>([]);
  const iconsRef = useRef<(HTMLImageElement | null)[]>([]);
  const tl = useRef(gsap.timeline({ paused: true })).current;

  useGSAP(() => {
    if (!headerRef.current) return;
    if (text.current.length == 5) {
      text.current.forEach((el, index) => {
        splitTextRef.current[index] = new SplitText(el, {
          type: "chars",
        });
        gsap.set(splitTextRef.current[index].chars, { autoAlpha: 0, y: 20 });
      });
      tl.to(headerRef.current, {
        height: "auto",
        ease: "sine.inOut",
        duration: 0.2,
      });
      splitTextRef.current.forEach((el) => {
        if (!el?.chars) return;
        tl.fromTo(
          el.chars,
          { autoAlpha: 0, y: 50 },
          { autoAlpha: 1, y: 0, ease: "circ", duration: 0.2, stagger: 0.05 },
          "<0.1"
        );
      });
      tl.fromTo(
        iconsRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.2,
        },
        "<0.2"
      );
    }
  }, []);

  useGSAP(
    () => {
      navBarAnimation();
    },
    { dependencies: [navBarToggled] }
  );

  const hamburgerMouseEnter = () => {
    if (line1.current && line2.current && line3.current) {
      gsap.to(line1.current, { y: 6, duration: 0.5 });
      gsap.to(line2.current, { opacity: 0, duration: 0.5 });
      gsap.to(line3.current, { y: -6, duration: 0.5 });
    }
  };

  const hamburgerMouseLeave = () => {
    if (line1.current && line2.current && line3.current) {
      gsap.to(line1.current, { y: 0, rotate: 0, duration: 0.5 });
      gsap.to(line2.current, { opacity: 1, duration: 0.5 });
      gsap.to(line3.current, { y: 0, rotate: 0, duration: 0.5 });
    }
  };

  const navBarToggle = () => {
    setNavBarToggled(!navBarToggled);
  };

  const navBarAnimation = () => {
    if (navBarToggled) {
      tl.play();
    } else {
      tl.reverse();
    }
  };

  return (
    <header
      ref={headerRef}
      className="z-50 font-satoshi   bg-background-default rounded-xl fixed flex h-[3.625rem] left-18 top-18 text-2xl text-text-default font-semibold tracking-[1px]"
    >
      <nav className="flex flex-col">
        <div className="flex items-center  justify-between">
          <button
            onMouseEnter={hamburgerMouseEnter}
            onMouseLeave={hamburgerMouseLeave}
            onClick={navBarToggle}
            className="m-2 h-[41px] w-[41px] rounded-lg bg-background-muted border border-border-default relative flex flex-col justify-center items-center gap-[5px] hover:cursor-pointer"
          >
            <div ref={line1} className="bg-[#EFE7D2] h-px w-[20px]"></div>
            <div ref={line2} className="bg-[#EFE7D2] h-px w-[20px]"></div>
            <div ref={line3} className="bg-[#EFE7D2] h-px w-[20px]"></div>
          </button>
          <div className="mx-1 my-3 text-center">
            <a
              href="/"
              className="hover:text-white hover:drop-shadow-(--drop-shadow-glow) transition duration-150"
            >
              Restaurant
            </a>
          </div>

          <div className="text-xs tracking-[1px] m-2 flex gap-1 items-center">
            <Link toggleBorder={false}>MENU</Link>
            <Link toggleBorder={false}>ABOUT</Link>
            <Link toggleBorder={true}>BOOK A TABLE</Link>
          </div>
        </div>
        <div className="">
          <img
            ref={(el) => {
              iconsRef.current[0] = el;
            }}
            className="mx-auto my-[16px]"
            src="../../public/NavBarDetailsIcon.png"
          />
          <ul className="flex flex-col items-center gap-3">
            <li
              ref={(el) => {
                text.current[0] = el;
              }}
              className="text-center"
            >
              MENU
            </li>
            <li
              ref={(el) => {
                text.current[1] = el;
              }}
              className="text-center"
            >
              RESERVATION
            </li>
            <li
              ref={(el) => {
                text.current[2] = el;
              }}
              className="text-center"
            >
              ABOUT
            </li>
            <li
              ref={(el) => {
                text.current[3] = el;
              }}
              className="text-center"
            >
              CONTACT
            </li>
            <li
              ref={(el) => {
                text.current[4] = el;
              }}
              className="text-center"
            >
              BLOG
            </li>
          </ul>
          <img
            ref={(el) => {
              iconsRef.current[1] = el;
            }}
            className="mx-auto my-[16px]"
            src="/NavBarDetailsIcon.png"
          />
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
