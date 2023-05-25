import React from "react";
import Image from "next/image";

type Props = {};

function Header({}: Props) {
  return (
    <header className="mainHeader">
      <nav>
        <Image
          src={"/logo.png"}
          width={148}
          height={31}
          alt="logo Dentaltrey"
        />
        <a className="backHomeBtn" href="https://www.dentaltrey.it/">
          Torna alla Home
        </a>
      </nav>
    </header>
  );
}

export default Header;
