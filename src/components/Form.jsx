// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import { LanLatLocation } from "../Hooks/latlnglocationURL";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  console.log(date);
  const navigate = useNavigate();

  const [lat, lng] = LanLatLocation();
  console.log(lat, lng);

  const BASEURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  useEffect(() => {
    const newCitylocation = async () => {
      try {
        const response = await fetch(BASEURL);
        const data = await response.json();
        setCityName(data.locality ? data.locality : "");
        setNotes(data.countryName ? data.countryName : "");
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    //   countryCode: "IN";
    // countryName

    newCitylocation();
  }, [lat, lng]);

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName + "" + notes}
        />

        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          type="date"
          // dateFormate="dd/MM/yyy"
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button className={styles.btnadd}>Add</button>
        <button
          className={styles.btnback}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}

export default Form;
