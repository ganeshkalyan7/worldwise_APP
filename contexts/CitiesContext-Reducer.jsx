import { fa } from "@faker-js/faker";
import { useState, useEffect, useReducer } from "react";
import { createContext } from "react";

export const CityContext = createContext();

const initialstate = {
  citiesdata: [],
  isloading: "",
  currentCitydata: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "stateloading":
      return { ...state, isloading: true };
    case "cities/dataload":
      return { ...state, citiesdata: action.payload, isloading: false };
    case "errorcase":
      return { ...state, error: action.payload, isloading: false };
    case "city/currentcity":
      return { ...state, isloading: false, currentCitydata: action.payload };
    case "city/created":
      return {
        ...state,
        isloading: false,
        error: action.payload,
        citiesdata: [...state.citiesdata, action.payload],
      };
    case "city/delete":
      return {
        ...state,
        isloading: false,
        citiesdata: state.citiesdata.filter(
          (city) => city.id !== action.payload
        ),
      };
    default:
      throw new Error("unkown action type");
  }
}

function CitiesContextReducer({ children }) {
  const url = "http://localhost:9000/cities";
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { citiesdata, isloading, currentCitydata, error } = state;

  useEffect(() => {
    const FetchData = async () => {
      dispatch({ type: "stateloading" });
      try {
        const resposne = await fetch(url);
        const data = await resposne.json();
        if (!data.ok) {
          console.log("error");
        }
        dispatch({ type: "cities/dataload", payload: data });
      } catch (err) {
        dispatch({
          type: "errorcase",
          payload: "here was an error loading cities...",
        });
        // seterror("");
      } finally {
        dispatch({ type: "stateloading" });
      }
    };
    FetchData();
  }, []);

  const CurrentCity = async (id) => {
    dispatch({ type: "stateloading" });
    try {
      const resposne = await fetch(`${url}/${id}`);
      const data = await resposne.json();
      if (!data.ok) {
        console.log("error");
      }
      dispatch({ type: "city/currentcity", payload: data });
    } catch (err) {
      dispatch({
        type: "errorcase",
        payload: "here was an error loading city...",
      });
    } finally {
      dispatch({ type: "stateloading" });
    }
  };

  const Addnewcity = async (newcity) => {
    dispatch({ type: "stateloading" });
    try {
      const resposne = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(newcity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await resposne.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "errorcase",
        payload: "here was an error  while adding a city...",
      });
    } finally {
      dispatch({ type: "stateloading" });
    }
  };

  const Deletecity = async (id) => {
    dispatch({ type: "stateloading" });
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      // const data = await resposne.json();
      dispatch({ type: "city/delete", payload: id });
    } catch (err) {
      dispatch({
        type: "errorcase",
        payload: "here was an error  while deleting the city...",
      });
    } finally {
      dispatch({ type: "stateloading" });
    }
  };

  return (
    <div>
      <CityContext.Provider
        value={{
          isloading,
          citiesdata,
          Deletecity,
          error,
          currentCitydata,
          CurrentCity,
          Addnewcity,
        }}
      >
        {children}
      </CityContext.Provider>
    </div>
  );
}

export default CitiesContextReducer;
