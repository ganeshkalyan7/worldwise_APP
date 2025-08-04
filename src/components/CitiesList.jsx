//import React from "react";
import CityItem from "./CityItem";
import styles from "./CitiesList.module.css";
import Spinner from "./Spinner";
import { CityContext } from "../../contexts/CitiesContext";
import { useContext } from "react";
import Message from "./Message";
function CitiesList() {
  const { citiesdata, isloading, deleteItem, error } = useContext(CityContext);
  console.log(citiesdata);
  if (isloading) return <Spinner />;

  if (!citiesdata.length) return <h1>{error}</h1>;

  if (!citiesdata.length)
    return (
      <Message message="pls share your experiance in visiting to different places 🚩 by clicking on the map 🌍" />
    );
  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {citiesdata.map((city) => (
        <CityItem city={city} key={city.id} deleteItem={deleteItem} />
      ))}
    </div>
  );
}

export default CitiesList;
