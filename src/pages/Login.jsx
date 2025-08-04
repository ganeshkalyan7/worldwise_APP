//import React from "react";
import Nav from "../components/Nav";
import styles from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/UserAuthContext";
import { useContext, useEffect, useState } from "react";
function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setpassword] = useState("qwerty");
  const { userlogin, isAuthenticated } = useContext(authContext);
  const navigate = useNavigate();

  const hadlelogin = (e) => {
    e.preventDefault();
    if (email && password) userlogin(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/Applayout/cities");
  }, [isAuthenticated, navigate]);

  console.log(userlogin, isAuthenticated);
  return (
    <div>
      <section className={styles.login}>
        <Nav />
        <div className={styles.form}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="email"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
          />
          <NavLink className="cta" onClick={hadlelogin}>
            Login
          </NavLink>
        </div>
      </section>
    </div>
  );
}

export default Login;
