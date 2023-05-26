"use client";
export const dynamic = "force-static";
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
  const [eventdata, setEventdata] = useState<IEventResponse | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [noData, setNoData] = useState<boolean | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [openDescription, setOpenDescription] = useState("");
  const params = useParams();

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: "" },
  });

  const [inputs, setInputs] = useState<IRegistrationRequest>({
    event_code: params.event_id,
    email: "",
    pec: "",
    firstname: "",
    lastname: "",
    phone: "",
    mobile: "",
    fax: "",
    street: "",
    city: "",
    zip: "",
    state_id: "",
    country_id: "",
    fiscalcode: "",
    qualification: "",
    note: "",
    title: "",
  });

  const handleOnChange = (e: {
    persist: () => void;
    target: { id: string; value: string };
  }) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: "" },
    });
  };

  useEffect(() => {
    axios
      .get<IEventResponse>(
        "https://coursemanager16.monema.dev/api/public/events/" +
          params.event_id
      )
      .then((response) => {
        setEventdata(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        error.response.status === 404 && setNoData(true);
      });
  }, []);

  const createRegistration = async () => {
    // 👇 Send a fetch request to Backend API.
    if (!eventdata) return;
    const { data, status } = await axios.post<
      IRegistrationRequest,
      AxiosResponse<IRegistrationResponse>
    >(eventdata.event_registration_url, JSON.stringify(inputs), {
      headers: {
        "Content-Type": "application/json",
      },
    });

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
          <h4>No profile eventdata</h4>{" "}
          <p>
            Errore 404, <br /> la risorsa non esiste
          </p>
        </div>
      </div>
    );

  //funzione per rimuovere html usata per il controllo dei campi vuoti
  function strip(html: string) {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapperHeader}>
          <h1>{eventdata?.event_title}</h1>
        </div>

        {/*  <b>URL:</b> {eventdata?.event_registration_url} */}
      </header>
      <main className={styles.main}>
        <div>
          <div className={styles.wrapperContent}>
            <div className={styles.contentLeft}>
              {eventdata?.event_description && (
                <p
                  dangerouslySetInnerHTML={{
                    __html: eventdata?.event_description,
                  }}
                />
              )}
              <div className={styles.notes}>{eventdata?.event_notes}</div>
            </div>

            <div className={styles.meta}>
              <span className={styles.codiceEvento}>
                <b>Codice Evento:</b> {eventdata?.event_code}
              </span>
              <div className={styles.area}>
                <b>Aree:</b>
                <ul>
                  {eventdata?.event_areas?.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.speakers}>
                <span className={styles.title}>
                  <b>Relatori:</b>
                </span>
                <div
                  className={`${styles.speakerBackground} ${
                    openDescription && styles.open
                  }`}
                  onClick={() => setOpenDescription("")}
                ></div>
                {eventdata?.event_speakers?.map((speaker) => {
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
            {eventdata?.event_organization && (
              <Segreteria data={eventdata?.event_organization} />
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
                            id="firstname"
                            value={inputs.firstname}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Cognome</label>
                          <input
                            type="text"
                            id="lastname"
                            value={inputs.lastname}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Email</label>
                          <input
                            id="email"
                            type="email"
                            value={inputs.email}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>

                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Qualifica</label>
                          <select
                            name="qualification"
                            onChange={handleOnChange}
                            value={inputs.qualification}
                            id="qualification"
                          >
                            <option value="">Seleziona qualifica</option>
                            {eventdata?.event_partner_categories?.map(
                              (option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className={styles.formgroup}>
                          <label>Titolo</label>
                          <select
                            id="title"
                            value={inputs.title}
                            onChange={handleOnChange}
                          >
                            <option value="">Seleziona titolo</option>
                            {eventdata?.event_partner_titles?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Codice Fiscale</label>
                          <input
                            type="text"
                            id="fiscalcode"
                            value={inputs.fiscalcode}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.right}>
                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Indirizzo</label>
                          <input
                            type="text"
                            id="street"
                            value={inputs.street}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Cap</label>
                          <input
                            type="text"
                            id="zip"
                            value={inputs.zip}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Città</label>
                          <input
                            type="text"
                            id="city"
                            value={inputs.city}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Provincia</label>
                          <input
                            type="text"
                            id="state_id"
                            value={inputs.state_id}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                      <div className={styles.formWrapper}>
                        <div className={styles.formgroup}>
                          <label>Telefono</label>
                          <input
                            type="text"
                            id="phone"
                            value={inputs.phone}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Cellulare</label>
                          <input
                            type="text"
                            id="mobile"
                            value={inputs.mobile}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>Fax</label>
                          <input
                            type="text"
                            id="fax"
                            value={inputs.fax}
                            onChange={handleOnChange}
                          />
                        </div>
                        <div className={styles.formgroup}>
                          <label>PEC</label>
                          <input
                            type="text"
                            id="pec"
                            value={inputs.pec}
                            onChange={handleOnChange}
                          />
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
                  <button type="submit" disabled={status.submitting}>
                    {!status.submitting
                      ? !status.submitted
                        ? "Registrati"
                        : "Registrato"
                      : "Registrazione..."}
                  </button>
                  {status.info.error && <div>Error: {status.info.msg}</div>}
                  {!status.info.error && status.info.msg && (
                    <div>{status.info.msg}</div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
