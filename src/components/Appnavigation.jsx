//import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Appnavigation.module.css";

function Appnavigation() {
  return (
    <div className={styles.appnav}>
      <NavLink to="cities">cities</NavLink>
      <NavLink to="countries">countries</NavLink>
    </div>
  );
}

export default Appnavigation;
