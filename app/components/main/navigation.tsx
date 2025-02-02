"use client";

import { Allura, Raleway, Unna } from "next/font/google";
import { usePathname } from "next/navigation";
import { TbArrowBadgeRightFilled } from "react-icons/tb";

const mainText = Unna({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const cursiveText = Allura({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const secondaryText = Raleway({ subsets: ["latin"] });

export default function Navigation() {
  let path = usePathname();

  const navigationItems = [
    { title: "Home", href: "/home" },
    { title: "The Story", href: "/the-story" },
    { title: "Wedding Party", href: "/wedding-party" },
    { title: "Travel", href: "/travel" },
    { title: "Registry", href: "/registry" },
    { title: "Gallery", href: "/gallery" },
  ];

  return (
    <div className="navbar bg-primary sm:bg-transparent text-white p-0 px-2 sm:px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52"
          >
            {navigationItems.map((item, key) => {
              return (
                <li key={key}>
                  <a className={`text-black text-base`} href={`${item.href}`}>
                    {path === item.href && (
                      <span className="text-secondary">
                        <TbArrowBadgeRightFilled />
                      </span>
                    )}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="navbar-center ">
        <ul className="menu menu-horizontal px-1 text-base hidden sm:flex">
          {navigationItems.map((item, key) => {
            return (
              <li key={key}>
                <div>
                  <a
                    className={`text-black ${
                      path === item.href ? "border-b border-secondary" : ""
                    }`}
                    href={`${item.href}`}
                  >
                    {item.title}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex sm:hidden flex-col items-center text-center">
          <div className={``}>
            {navigationItems.map((item, key) => {
              if (path === item.href) {
                if (path === "/home") {
                  return (
                    <div
                      key={key}
                      className={`${mainText.className} tracking-widest text-2xl`}
                    >
                      C <span className={cursiveText.className}>&</span> K
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={key}
                      className={`${secondaryText.className} tracking-widest text-xl`}
                    >
                      {item.title}
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
