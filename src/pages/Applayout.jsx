//import React from "react";
import styles from "./Applayout.module.css";
//import { NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

function Applayout() {
  return (
    <div className={styles.applayout}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default Applayout;
