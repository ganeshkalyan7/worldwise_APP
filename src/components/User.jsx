import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/UserAuthContext";
import styles from "./User.module.css";
import { useContext } from "react";

function User() {
  const { user, userlogout } = useContext(authContext);
  console.log(user);
  const navigate = useNavigate();

  function handleClick() {
    userlogout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
