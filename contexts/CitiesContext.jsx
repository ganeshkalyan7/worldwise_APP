import React, { useState, useEffect } from "react";
import { createContext } from "react";

export const CityContext = createContext();

function CitiesContext({ children }) {
  const url = "http://localhost:9000/cities";
  const [citiesdata, setCitiesdata] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [currentCitydata, setcurrentCitydata] = useState({});
  const [error, seterror] = useState("");

  useEffect(() => {
    const FetchData = async () => {
      try {
        setisloading(true);
        const resposne = await fetch(url);
        const data = await resposne.json();
        if (!data.ok) {
          console.log("error");
        }
        setCitiesdata(data);
        setisloading(false);
      } catch (err) {
        seterror("data couldn`t be  fetched 🤔");
      } finally {
        setisloading(false);
      }
    };
    FetchData();
  }, []);

  const CurrentCity = async (id) => {
    try {
      setisloading(true);
      const resposne = await fetch(`${url}/${id}`);
      const data = await resposne.json();
      if (!data.ok) {
        console.log("error");
      }
      setcurrentCitydata(data);
      setisloading(false);
    } catch (err) {
      seterror("data couldn`t be  fetched 🤔");
    } finally {
      setisloading(false);
    }
  };

  const deleteItem = (id) => {
    setCitiesdata(citiesdata.filter((city) => city.id !== id));
  };

  console.log(citiesdata);
  return (
    <div>
      <CityContext.Provider
        value={{
          isloading,
          citiesdata,
          deleteItem,
          error,
          currentCitydata,
          CurrentCity,
        }}
      >
        {children}
      </CityContext.Provider>
    </div>
  );
}

export default CitiesContext;
