//import React from "react";
import Nav from "../components/Nav";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";
function Login() {
  return (
    <div>
      <section className={styles.login}>
        <Nav />
        <div className={styles.form}>
          <label>Email Address</label>
          <input type="text" placeholder="email" />
          <label>Password</label>
          <input type="text" placeholder="email" />
          <NavLink className="cta" to="/">
            Login
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default Login;
