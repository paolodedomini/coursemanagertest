import React from "react";
import style from "./segreteria.module.css";
import { type organization } from "../models";
type Props = {
  data: organization;
};

function Segreteria({ data }: Props) {
  return (
    <section className={style.segreteria}>
      <h3>segreteria organizzativa</h3>
      <div className={style.wrapperSegreteria}>
        <div className={`${style.info} ${style.segreteriaOrganizzativa}`}>
          <figure></figure>
          {data?.location_name}
        </div>
        <div className={`${style.info} ${style.email}`}>
          <figure></figure>
          {data?.location_email}
        </div>
        <div className={`${style.info} ${style.phone}`}>
          <figure></figure>
          {data?.location_phone}
        </div>
        <div className={`${style.info} ${style.mobile}`}>
          <figure></figure>
          {data?.location_mobile}
        </div>
        <div className={`${style.info} ${style.fax}`}>
          <figure></figure>
          {data?.location_fax}
        </div>
      </div>
    </section>
  );
}

export default Segreteria;
