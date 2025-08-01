// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import styles from "./Form.module.css";
import { LanLatLocation } from "../Hooks/latlnglocationURL";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
=======
import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { useLanLatLocation } from "../Hooks/useLatlnglocationURL";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { CityContext } from "../../contexts/CitiesContext";
>>>>>>> db43a69 (2025-08-01)

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
<<<<<<< HEAD
=======
  const [emoji, setemoji] = useState("");
  const [isGeolocationloading, setIsGeolocationloading] = useState("false");
  const [geolocationError, setgeolocationError] = useState("");

  const { citiesdata, Addnewcity } = useContext(CityContext);
>>>>>>> db43a69 (2025-08-01)

  console.log(date);
  const navigate = useNavigate();

<<<<<<< HEAD
  const [lat, lng] = LanLatLocation();
=======
  const [lat, lng] = useLanLatLocation();
>>>>>>> db43a69 (2025-08-01)
  console.log(lat, lng);

  const BASEURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  useEffect(() => {
    const newCitylocation = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch(BASEURL);
        const data = await response.json();
        setCityName(data.locality ? data.locality : "");
        setNotes(data.countryName ? data.countryName : "");
        console.log(data);
      } catch (err) {
        console.log(err);
=======
        setIsGeolocationloading(true);
        setgeolocationError("");
        const response = await fetch(BASEURL);
        const data = await response.json();
        if (!data.countryCode)
          throw new Error(
            "the selected location doesn`t seem to be city.click some other places that you visited 🤦‍♂️ "
          );

        setCityName(data.locality || data.city || "");
        setCountry(data.countryName ? data.countryName : "");
        setemoji(data.countryCode);
        setIsGeolocationloading(false);
        console.log(data);
      } catch (err) {
        console.log(err);
        setgeolocationError(err.message);
      } finally {
        setIsGeolocationloading(false);
>>>>>>> db43a69 (2025-08-01)
      }
    };

    //   countryCode: "IN";
    // countryName

    newCitylocation();
  }, [lat, lng]);
<<<<<<< HEAD

  return (
    <form className={styles.form}>
=======
  console.log(isGeolocationloading);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCityDetails = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    console.log(newCityDetails);

    await Addnewcity(newCityDetails);
    navigate("/Applayout/cities");
  };

  if (geolocationError) return <Message message={geolocationError} />;
  if (isGeolocationloading) return <Spinner />;

  return (
    <form className={styles.form} onSubmit={handlesubmit}>
>>>>>>> db43a69 (2025-08-01)
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
<<<<<<< HEAD
          value={cityName + "" + notes}
=======
          value={cityName}
>>>>>>> db43a69 (2025-08-01)
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
