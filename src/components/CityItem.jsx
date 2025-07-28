import React, { useContext } from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { CityContext } from "../../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default function CityItem({ city, deleteItem }) {
  const { cityName, date, emoji, id, position } = city;

  const { currentCitydata } = useContext(CityContext);
  console.log(currentCitydata.id, id, cityName);
  const formateDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  console.log(formateDate(date));

  return (
    <div>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${
          currentCitydata.id === id ? styles.cityitemActive : styles.cityitem
        }`}
      >
        <p className={styles.cityName}>{cityName}</p>
        <p className={styles.emoji}>{emoji}</p>
        <p className={styles.date}>({formateDate(date)})</p>
        <button className={styles.button} onClick={() => deleteItem(id)}>
          &times;
        </button>
      </Link>
    </div>
  );
}
