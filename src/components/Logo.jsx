import React from "react";
import styles from "./logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src="logo.png" className={styles.logo} />
    </Link>
  );
}

export default Logo;
