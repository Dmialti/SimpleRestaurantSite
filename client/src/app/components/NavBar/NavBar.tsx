"use client";

import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import styles from "./NavBar.module.css";
import Button from "../../../shared/components/Button/Button";
import { Link, useTransitionRouter } from "next-transition-router";

gsap.registerPlugin(SplitText);

export default function NavBar() {
  const containerRef = useRef<HTMLElement>(null);
  const [navBarToggled, setNavBarToggled] = useState<boolean>(false);
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);
  const text = useRef<(HTMLLIElement | null)[]>([]);
  const splitTextRef = useRef<(SplitText | null)[]>([]);
  const iconsRef = useRef<(HTMLImageElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef(gsap.timeline({ paused: true })).current;

  const router = useTransitionRouter();

  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        if (!dropdownRef.current) return;
        if (text.current.length < 5) return;
        tl.clear();
        text.current.forEach((el, index) => {
          if (el) {
            if (splitTextRef.current[index]) {
              splitTextRef.current[index]?.revert();
            }

            const split = new SplitText(el, {
              type: "chars",
            });
            splitTextRef.current[index] = split;

            gsap.set(split.chars, {
              autoAlpha: 0,
              y: 20,
            });
          }
        });

        tl.eventCallback("onStart", () => {
          if (dropdownRef.current)
            gsap.set(dropdownRef.current, { display: "block" });
        });

        tl.fromTo(
          dropdownRef.current,
          {
            height: "0px",
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
      });

      return () => {
        splitTextRef.current.forEach((split) => split?.revert());
        tl.clear();
      };
    },
    { scope: containerRef }
  );

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

  const handleNavigation = (path: string) => {
    if (navBarToggled) {
      navBarToggle();
    }
    router.push(path);
  };

  return (
    <header
      ref={containerRef}
      className={`${styles.header} z-50 font-satoshi rounded-xl bg-background-default fixed flex w-max h-auto left-18 top-18 text-2xl text-text-default font-semibold tracking-[1px]`}
    >
      <nav className="flex flex-col h-fit w-full relative">
        <div
          className={`${styles.navLinks} rounded-xl flex items-center justify-between bg-background-default z-20 `}
        >
          <button
            onMouseEnter={hamburgerMouseEnter}
            onMouseLeave={hamburgerMouseLeave}
            onClick={navBarToggle}
            aria-label="Toggle navigation bar"
            className="m-2 h-10.25 w-10.25 rounded-lg bg-background-muted border border-border-default relative flex flex-col justify-center items-center gap-1.25 hover:cursor-pointer"
          >
            <div ref={line1} className="bg-[#EFE7D2] h-px w-5"></div>
            <div ref={line2} className="bg-[#EFE7D2] h-px w-5"></div>
            <div ref={line3} className="bg-[#EFE7D2] h-px w-5"></div>
          </button>
          <div className="mx-1 my-3 text-center">
            <Link
              href="/"
              className="hover:text-white hover:drop-shadow-(--drop-shadow-glow) transition duration-150"
            >
              RESTAURANT
            </Link>
          </div>

          <div className="text-xs tracking-[1px] m-2 flex gap-1 items-center">
            <Button
              className={styles.collapseFirst + ` p-3`}
              variant="simple"
              onClick={() => handleNavigation("/menu")}
            >
              MENU
            </Button>
            <Button
              className={styles.collapseFirst + ` p-3`}
              variant="simple"
              onClick={() => handleNavigation("/about")}
            >
              ABOUT
            </Button>
            <Button
              className={styles.collapseSecond + ` p-3`}
              variant="border"
              onClick={() => handleNavigation("/reservation")}
            >
              BOOK A TABLE
            </Button>
          </div>
        </div>

        <div
          ref={dropdownRef}
          className={`${styles.dropdown} hidden bg-background-default top-full left-0 w-full rounded-b-xl shadow-lg z-10`}
        >
          <img
            ref={(el) => {
              iconsRef.current[0] = el;
            }}
            className="mx-auto my-4"
            src="/NavBarMaterials/NavBarDetailsIcon.png"
            alt="decoration"
          />
          <ul className="flex flex-col items-center gap-3 cursor-pointer">
            <li
              ref={(el) => {
                text.current[0] = el;
              }}
              className="text-center hover:text-white transition-colors"
              onClick={() => handleNavigation("/menu")}
            >
              MENU
            </li>
            <li
              ref={(el) => {
                text.current[1] = el;
              }}
              className="text-center hover:text-white transition-colors"
              onClick={() => handleNavigation("/reservation")}
            >
              RESERVATION
            </li>
            <li
              ref={(el) => {
                text.current[2] = el;
              }}
              className="text-center hover:text-white transition-colors"
              onClick={() => handleNavigation("/about")}
            >
              ABOUT
            </li>
            <li
              ref={(el) => {
                text.current[3] = el;
              }}
              className="text-center hover:text-white transition-colors"
              onClick={() => handleNavigation("/contact")}
            >
              CONTACT
            </li>
            <li
              ref={(el) => {
                text.current[4] = el;
              }}
              className="text-center hover:text-white transition-colors"
              onClick={() => handleNavigation("/blog")}
            >
              BLOG
            </li>
          </ul>
          <img
            ref={(el) => {
              iconsRef.current[1] = el;
            }}
            className="mx-auto my-4"
            src="/NavBarMaterials/NavBarDetailsIcon.png"
            alt="decoration"
          />
        </div>
      </nav>
    </header>
  );
}
