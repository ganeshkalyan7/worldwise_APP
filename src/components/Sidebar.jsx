//import React from "react";
import Logo from "./Logo";
import Appnavigation from "./Appnavigation";
import Styles from "./Sidebar.module.css";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <Logo />
      <Appnavigation />
      <Outlet />
      <footer>rigts reserved @c</footer>
    </div>
  );
}

export default Sidebar;
