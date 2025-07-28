//import React from "react";
import Styles from "./Countries.module.css";
import { CityContext } from "../../contexts/CitiesContext";
import { useContext } from "react";

function Countries() {
  const { citiesdata, isloading } = useContext(CityContext);
  console.log(citiesdata);

  const contries = citiesdata.reduce((accu, curr) => {
    if (!accu.map((ele) => ele.country).includes(curr.country))
      return [
        ...accu,
        { country: curr.country, id: curr.id, emoji: curr.emoji },
      ];
    else return accu;
  }, []);

  console.log(contries);
  return (
    <div className={Styles.country}>
      {contries.map((val) => (
        <div key={val.id} className={Styles.countrydetails}>
          <p className={Styles.flag}>{val.emoji}</p>
          <p className={Styles.countryname}>{val.country}</p>
        </div>
      ))}
    </div>
  );
}

export default Countries;
