'use client';

import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css'
import { IEventResponse, IRegistrationRequest, IRegistrationResponse } from '@/app/models';

export default function RegistrationForm() {
  const [formdata, setFormData] = useState<IEventResponse | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [formSuccess, setFormSuccess] = useState(false)
  const params = useParams();

  const getEvent = async () => {
    const { data, status } = await axios.get<IEventResponse>('https://coursemanager16.monema.dev/api/public/events/' + params.event_id);
    console.log(data);
    setFormData(data);
  };

  console.log(params);
  useEffect(() => {
    setLoading(true);
    getEvent();
    setLoading(false);
  }, []);

  const createRegistration = async () => {
    // 👇 Send a fetch request to Backend API.
    if (!formdata) return;
    const { data, status } = await axios.post<IRegistrationRequest, AxiosResponse<IRegistrationResponse>>(
      formdata.event_registration_url,
      JSON.stringify({
        firstname,
        lastname,
        email,
        event_code: params.event_id,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (status === 200) {
      setFormSuccess(true);
    }
    console.log(data);
  };


  if (isLoading) return <p>Loading...</p>;
  if (!formdata) return <p>No profile formdata</p>;

  return (
    <main className={styles.main}>
      <div>
      <div className={styles.card}>
      <h1>{formdata.event_title}</h1>
      <b>Codice Evento:</b> {formdata.event_code}<br/>
      <b>URL:</b> {formdata.event_registration_url}
      </div>
      <div className={styles.card}>
      <p dangerouslySetInnerHTML={{__html: formdata.event_description}}/>
      <br />
      </div>
      <div className={styles.card}>
      { formSuccess && <div className={styles.success}>Grazie per esserti registrato!</div> }
      { !formSuccess && <div>

      <form method="POST" onSubmit={(e) => {
          e.preventDefault();
          createRegistration();
        }}>
        <div>
          <label>Nome</label>
          <input type="text" name="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        </div>
        <div>
          <label>Cognome</label>
          <input type="text" name="lastname"  value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <hr />
        <div>
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

        <div>
          <label>Ragione Sociale</label>
          <input type="text" name="company" />
        </div>

        <div>
          <label>Codice Fiscale</label>
          <input type="text" name="tax_code" />
        </div>

        <div>
          <label>Partita IVA</label>
          <input type="text" name="vat_number" />
        </div>

        <hr />
        <div>
                  <label>Indirizzo</label>
                  <input type="text" name="address" />
                </div>
                <div>
                  <label>Cap</label>
                  <input type="text" name="city" />
                </div>
                <div>
                  <label>Città</label>
                  <input type="text" name="city" />
                </div>
                <div>
                  <label>Provincia</label>
                  <input type="text" name="province" />
                </div>
                <div>
                  <label>Telefono</label>
                  <input type="text" name="phone" />
                </div>
                <div>
                  <label>Cellulare</label>
                  <input type="text" name="mobile" />
                </div>
                <div>
                  <label>Fax</label>
                  <input type="text" name="fax" />
                </div>
                <div>
                  <label>PEC</label>
                  <input type="text" name="pec" />
                </div>
                
        <div className={styles.card}>
        Informativa privacy (D. Lgs. 196/03)I dati personali saranno trattati in accordo al D. Lgs. 196/03 per registrare la Sua partecipazione e svolgere le connesse pratiche amministrative. I dati potranno essere utilizzati per l’invio di comunicazioni in merito allo svolgimento di altri eventi formativi, e previo consenso dell’interessato potranno essere comunicati a soggetti terzi. L’interessato può esercitare i diritti di cui all’art. 7 del D. Lgs 196/03 rivolgendosi a privacy@dentaltrey.it. Titolare del trattamento è DentalTrey s.r.l., via Partisani 3, 47016 Fiumana - Predappio (FC). Durante l’evento Dental Trey potrà fare registrazioni audio-video e foto ai partecipanti, le quali potranno essere diffuse (eventi pubblici, media, web, pubblicazioni a mezzo stampa, ecc.), fatto salvo l’uso in contesti che possano arrecare pregiudizio alla dignità, alla reputazione e al decoro personale dell’interessato e dei suoi prossimi congiunti. Informativa completa su www.dentaltrey.it. Acconsento alla comunicazione dei miei dati ai soggetti terzi indicati nell’informativa.
        <br/><input type="checkbox" name=" privacy" value="privacy" required/> Acconsento
        </div>
        <input type="hidden" name="event_code" value={params.event_code} />
        <br />
        <button type="submit">Registrati</button>
      </form>
      </div>
       }
    </div>
      </div>

    </main>
  )
}
