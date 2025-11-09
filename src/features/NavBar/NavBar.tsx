import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Link from "../shared/components/Link/Link";
import styles from "./NavBar.module.css";
gsap.registerPlugin(SplitText);

const NavBar: React.FC = () => {
  const [navBarToggled, setNavBarToggled] = useState<boolean>(false);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const text = useRef<(HTMLLIElement | null)[]>([]);
  const splitTextRef = useRef<(SplitText | null)[]>([]);
  const iconsRef = useRef<(HTMLImageElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef(gsap.timeline({ paused: true })).current;

  useGSAP(() => {
    if (!dropdownRef.current) return;
    if (text.current.length == 5) {
      text.current.forEach((el, index) => {
        splitTextRef.current[index] = new SplitText(el, {
          type: "chars",
        });
        gsap.set(splitTextRef.current[index].chars, { autoAlpha: 0, y: 20 });
      });
      tl.eventCallback("onStart", () => {
        if (dropdownRef.current)
          gsap.set(dropdownRef.current, { display: "block" });
      });
      tl.fromTo(
        dropdownRef.current,
        {
          height: "0px",
          ease: "sine.inOut",
          duration: 0.2,
        },
        {
          height: "auto",
          ease: "sine.inOut",
          duration: 0.2,
        }
      );
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

      tl.eventCallback("onReverseComplete", () => {
        if (dropdownRef.current)
          gsap.set(dropdownRef.current, { display: "none" });
      });
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
      className={`${styles.header} z-50 font-satoshi overflow-hidden rounded-xl fixed flex w-max h-auto left-18 top-18 text-2xl text-text-default font-semibold tracking-[1px]`}
    >
      <nav className="flex flex-col h-fit w-full relative">
        <div className="flex items-center justify-between  bg-background-default ">
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
              RESTAURANT
            </a>
          </div>

          <div className="text-xs tracking-[1px] m-2 flex gap-1 items-center">
            <Link className={styles.collapseFirst} toggleBorder={false}>
              MENU
            </Link>
            <Link className={styles.collapseFirst} toggleBorder={false}>
              ABOUT
            </Link>
            <Link className={styles.collapseSecond} toggleBorder={true}>
              BOOK A TABLE
            </Link>
          </div>
        </div>
        <div
          ref={dropdownRef}
          className={`${styles.dropdown} hidden  bg-background-default`}
        >
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
