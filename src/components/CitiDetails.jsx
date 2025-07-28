import React, { useContext, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { CityContext } from "../../contexts/CitiesContext";
import styles from "./Form.module.css";
import citystyle from "./CitiDetails.module.css";
function CitiDetails() {
  const { id } = useParams();
  const [searchparams, setsearchparams] = useSearchParams();
  const lat = searchparams.get("lat");
  const lng = searchparams.get("lng");
  const navigate = useNavigate();
  console.log(id);

  const { CurrentCity, currentCitydata } = useContext(CityContext);

  const { cityName, date, emoji, position } = currentCitydata;

  console.log(currentCitydata);
  const formateDate = (date) =>
    date
      ? new Intl.DateTimeFormat("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(date))
      : "invalid Date";

  formateDate(date);

  useEffect(() => {
    CurrentCity(id);
  }, [id]);

  console.log(CurrentCity);
  console.log(currentCitydata);
  console.log(formateDate(date));
  return (
    <div className={citystyle.citydetails}>
      {/* <h1>City List : {id}</h1> */}
      <div className={citystyle.cityhead}>City name</div>
      <div className={citystyle.citydetail}>
        <div className={citystyle.emoji}>{emoji}</div>
        <div className={citystyle.cityname}>{cityName}</div>
      </div>

      <div className={citystyle.cityhead}>You went to {cityName} on</div>
      <div className={citystyle.cityname}>{formateDate(date)}</div>

      <button onClick={() => navigate(-1)} className={styles.btnback}>
        &larr; back
      </button>
    </div>
  );
}

export default CitiDetails;
