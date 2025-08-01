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

<<<<<<< HEAD
export default function CityItem({ city, deleteItem }) {
  const { cityName, date, emoji, id, position } = city;

  const { currentCitydata } = useContext(CityContext);
=======
export default function CityItem({ city }) {
  const { cityName, date, emoji, id, position } = city;

  const { currentCitydata, Deletecity } = useContext(CityContext);
>>>>>>> db43a69 (2025-08-01)
  console.log(currentCitydata.id, id, cityName);
  const formateDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  console.log(formateDate(date));

<<<<<<< HEAD
=======
  const handleDelete = (e) => {
    e.preventDefault();
    Deletecity(id);
  };

>>>>>>> db43a69 (2025-08-01)
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
<<<<<<< HEAD
        <button className={styles.button} onClick={() => deleteItem(id)}>
=======
        <button className={styles.button} onClick={handleDelete}>
>>>>>>> db43a69 (2025-08-01)
          &times;
        </button>
      </Link>
    </div>
  );
}
