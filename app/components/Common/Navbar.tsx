"use client";

import Link from "next/link";

import Button from "./Button";
import Icon from "./Icon";
const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50 p-5">
      <nav className="flex justify-between">
        <Link href="/">
          <h1 className="primary-gradient text-2xl lg:text-3xl font-light">
            iA
          </h1>
        </Link>
        <div className="flex gap-5">
          <Link href="/about">
            <Button variant="secondary" className="hidden lg:block">
              Nosotros
            </Button>
            <div className="lg:hidden mx-auto w-full">
              <Icon name="info" className="w-7 h-7" />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
