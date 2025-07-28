//import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import Logo from "./Logo";

function Nav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/price">price</NavLink>
        </li>
        <li>
          <NavLink to="/Product">product</NavLink>
        </li>
        <li>
          <NavLink to="/Login" className="cta">
            login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
