import React from "react";
import styles from "./logo.module.css";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
<<<<<<< HEAD
      <img src="logo.png" className={styles.logo} />
=======
      <img src="/logo.png" className={styles.logo} />
>>>>>>> db43a69 (2025-08-01)
    </Link>
  );
}

export default Logo;
