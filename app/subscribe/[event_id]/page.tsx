"use client";

import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./page.module.css";
import {
  IEventResponse,
  IRegistrationRequest,
  IRegistrationResponse,
} from "@/app/models";
import Segreteria from "@/app/components/segreteria";
export default function RegistrationForm() {
  const [formdata, setFormData] = useState<IEventResponse | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [noData, setNoData] = useState<boolean | null>(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [openDescription, setOpenDescription] = useState("");
  const params = useParams();

  useEffect(() => {
    axios
      .get<IEventResponse>(
        "https://coursemanager16.monema.dev/api/public/events/" +
          params.event_id
      )
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        error.response.status === 404 && setNoData(true);
      });
  }, []);

  const createRegistration = async () => {
    // 👇 Send a fetch request to Backend API.
    if (!formdata) return;
    const { data, status } = await axios.post<
      IRegistrationRequest,
      AxiosResponse<IRegistrationResponse>
    >(
      formdata.event_registration_url,
      JSON.stringify({
        firstname,
        lastname,
        email,
        event_code: params.event_id,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (status === 200) {
      setFormSuccess(true);
    }
  };

  if (isLoading)
    return (
      <div className={styles.wrapperApi}>
        <div className={styles.api}>Loading data...</div>
      </div>
    );
  if (noData)
    return (
      <div className={styles.wrapperApi}>
        <div className={styles.api}>
          <h4>No profile formdata</h4>{" "}
          <p>
            Errore 404, <br /> la risorsa non esiste
          </p>
        </div>
      </div>
    );
  console.log("openDescription", openDescription);

  //funzione per rimuovere html usata per il controllo dei campi vuoti
  function strip(html: string) {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapperHeader}>
          <h1>{formdata?.event_title}</h1>
        </div>

        {/*  <b>URL:</b> {formdata?.event_registration_url} */}
      </header>
      <main className={styles.main}>
        <div>
          <div className={styles.wrapperContent}>
            <div className={styles.contentLeft}>
              {formdata?.event_description && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: formdata?.event_description,
                  }}
                />
              )}
              <div className={styles.notes}>{formdata?.event_notes}</div>
            </div>

            <div className={styles.meta}>
              <span className={styles.codiceEvento}>
                <b>Codice Evento:</b> {formdata?.event_code}
              </span>
              <div className={styles.area}>
                <b>Aree:</b>
                <ul>
                  {formdata?.event_areas?.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.speakers}>
                <span className={styles.title}>
                  <b>Speakers:</b>
                </span>
                <div
                  className={`${styles.speakerBackground} ${
                    openDescription && styles.open
                  }`}
                  onClick={() => setOpenDescription("")}
                ></div>
                {formdata?.event_speakers?.map((speaker) => {
                  return (
                    <div key={speaker.speaker_name}>
                      <h4
                        onClick={() => setOpenDescription(speaker.speaker_name)}
                      >
                        {speaker.speaker_name}
                      </h4>
                      <div className={styles.speaker}>
                        {openDescription === speaker.speaker_name && (
                          <div className={`${styles.speakerDescription} `}>
                            {strip(speaker.speaker_bio) !== "" && (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: speaker.speaker_bio,
                                }}
                              />
                            )}
                            <a href={`mailto:${speaker.speaker_email}`}>Mail</a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            {formdata?.event_organization && (
              <Segreteria data={formdata?.event_organization} />
            )}
            {formSuccess && (
              <div className={styles.success}>
                Grazie per esserti registrato!
              </div>
            )}
            {!formSuccess && (
              <div>
                <form
                  method="POST"
                  onSubmit={(e) => {
                    e.preventDefault();
                    createRegistration();
                  }}
                >
                  <div className={styles.mainForm}>
                    <div className={styles.left}>
                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Nome</label>
                          <input
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Cognome</label>
                          <input
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Qualifica</label>
                          <select name="qualification">
                            <option value="">Seleziona qualifica</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="G">G</option>
                            <option value="H">H</option>
                            <option value="I">I</option>
                            <option value="J">J</option>
                            <option value="K">K</option>
                            <option value="L">L</option>
                            <option value="M">M</option>
                            <option value="N">N</option>
                            <option value="O">O</option>
                            <option value="P">P</option>
                          </select>
                        </div>
                        <div className={styles.formgroup}>
                          <label>Ragione Sociale</label>
                          <input type="text" name="company" />
                        </div>
                      </div>
                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Codice Fiscale</label>
                          <input type="text" name="tax_code" />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Partita IVA</label>
                          <input type="text" name="vat_number" />
                        </div>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Indirizzo</label>
                          <input type="text" name="address" />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Cap</label>
                          <input type="text" name="city" />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Città</label>
                          <input type="text" name="city" />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Provincia</label>
                          <input type="text" name="province" />
                        </div>
                      </div>
                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Telefono</label>
                          <input type="text" name="phone" />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Cellulare</label>
                          <input type="text" name="mobile" />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Fax</label>
                          <input type="text" name="fax" />
                        </div>
                        <div className={styles.formgroup}>
                          <label>PEC</label>
                          <input type="text" name="pec" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.privacy}>
                    Informativa privacy (D. Lgs. 196/03)I dati personali saranno
                    trattati in accordo al D. Lgs. 196/03 per registrare la Sua
                    partecipazione e svolgere le connesse pratiche
                    amministrative. I dati potranno essere utilizzati per
                    l’invio di comunicazioni in merito allo svolgimento di altri
                    eventi formativi, e previo consenso dell’interessato
                    potranno essere comunicati a soggetti terzi. L’interessato
                    può esercitare i diritti di cui all’art. 7 del D. Lgs 196/03
                    rivolgendosi a privacy@dentaltrey.it. Titolare del
                    trattamento è DentalTrey s.r.l., via Partisani 3, 47016
                    Fiumana - Predappio (FC). Durante l’evento Dental Trey potrà
                    fare registrazioni audio-video e foto ai partecipanti, le
                    quali potranno essere diffuse (eventi pubblici, media, web,
                    pubblicazioni a mezzo stampa, ecc.), fatto salvo l’uso in
                    contesti che possano arrecare pregiudizio alla dignità, alla
                    reputazione e al decoro personale dell’interessato e dei
                    suoi prossimi congiunti. Informativa completa su
                    www.dentaltrey.it. Acconsento alla comunicazione dei miei
                    dati ai soggetti terzi indicati nell’informativa.
                    <br />
                    <br />
                    <input
                      type="checkbox"
                      name=" privacy"
                      value="privacy"
                      id="privacy"
                      required
                    />{" "}
                    <label htmlFor="privacy">Acconsento</label>
                  </div>
                  <input
                    type="hidden"
                    name="event_code"
                    value={params.event_code}
                  />
                  <br />
                  <button type="submit">Registrati</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
