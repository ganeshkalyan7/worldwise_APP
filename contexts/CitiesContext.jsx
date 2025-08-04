import React, { useState, useEffect, useReducer, createContext } from "react";

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
        currentCitydata: action.payload,
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
      throw new Error("unknown action type");
  }
}

function CitiesContext({ children }) {
  const url = "http://localhost:9000/cities";
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { citiesdata, isloading, currentCitydata, error } = state;

  useEffect(() => {
    const FetchData = async () => {
      dispatch({ type: "stateloading" });
      try {
        const resposne = await fetch(url);
        const data = await resposne.json();
        dispatch({ type: "cities/dataload", payload: data });
      } catch (err) {
        dispatch({
          type: "errorcase",
          payload: "There was an error loading cities...",
        });
      }
    };
    FetchData();
  }, []);

  const CurrentCity = async (id) => {
    dispatch({ type: "stateloading" });
    try {
      const resposne = await fetch(`${url}/${id}`);
      const data = await resposne.json();
      dispatch({ type: "city/currentcity", payload: data });
    } catch (err) {
      dispatch({
        type: "errorcase",
        payload: "There was an error loading the city...",
      });
    }
  };

  const Addnewcity = async (newCity) => {
    dispatch({ type: "stateloading" });
    try {
      const res = await fetch(`${url}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "errorcase",
        payload: "There was an error creating the city...",
      });
    }
  };

  const Deletecity = async (id) => {
    dispatch({ type: "stateloading" });
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/delete", payload: id });
    } catch (err) {
      dispatch({
        type: "errorcase",
        payload: "There was an error while deleting the city...",
      });
    }
  };

  return (
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
  );
}

export default CitiesContext;
