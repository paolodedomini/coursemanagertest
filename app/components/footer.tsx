import React from "react";
import style from "./footer.module.css";
import Image from "next/image";
type Props = {};

function Footer({}: Props) {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.row}>
          <div className={style.col}>
            <Image
              className={style.logoFooter}
              src={"/logo.png"}
              width={148}
              height={31}
              alt="logo Dentaltrey"
            />
            <div>
              <strong>Dental Trey s.r.l.</strong> <br />
              p.iva 01306980408980408
            </div>
          </div>
          <div className={style.col}>
            <ul>
              <li>
                <a href="https://dentaltrey.it/anestesia">Anestesia</a>{" "}
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/conservativa">Conservativa</a>
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/endodonzia">Endodonzia</a>
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/igiene-profilassi">
                  Igiene profilassi
                </a>
              </li>
            </ul>
          </div>
          <div className={style.col}>
            <ul>
              <li>
                {" "}
                <a href="https://dentaltrey.it/implantologia">Implantologia</a>
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/ortodonzia">Ortodonzia</a>
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/parodontologia-chirurgia">
                  Parodontologia chirurgia
                </a>
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/per-tutto">Per tutto</a>
              </li>
            </ul>
          </div>
          <div className={style.col}>
            <ul>
              <li>
                {" "}
                <a href="https://dentaltrey.it/protesi">Protesi</a>
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/radiologia">Radiologia</a>
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/sterilizzazione-disinfezione">
                  Sterilizzazione disinfezione
                </a>
              </li>
              <li>
                {" "}
                <a href="https://dentaltrey.it/packet">Packet</a>
              </li>
            </ul>
          </div>
          <div className={`${style.col} ${style.navFooter}`}>
            <ul>
              <li>
                <a href="https://dentaltrey.it" className={style.button}>
                  webstore
                </a>
              </li>
              <li>
                <a
                  href="https://azienda.dentaltrey.it/linee-in-esclusiva"
                  className={style.button}
                >
                  linee in esclusiva
                </a>
              </li>
              <li>
                <a
                  href="https://azienda.dentaltrey.it/contact"
                  className={style.button}
                >
                  contattaci
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <a href="https://dentaltrey.it/condizioni-vendita-italia">
              Condizioni di vendita
            </a>
          </li>
          <li>
            <a href="https://dentaltrey.it/privacy-cookie">Privacy & Cookie</a>
          </li>
          <li>
            <a href="https://dentaltrey.it/Disclaimer">Disclaimer</a>
          </li>
          <li>
            <a href="https://dentaltrey.it/dati-societari">Dati societari</a>
          </li>
          <li>
            <a href="https://azienda.dentaltrey.it/contratto-personalizzato/">
              Contratto personalizzato
            </a>
          </li>
          <li>
            <a href="https://dentaltrey.it/contact">Assistenza / Contatti</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
