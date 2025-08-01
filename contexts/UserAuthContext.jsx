import React, { useReducer } from "react";
import { createContext } from "react";

export const authContext = createContext();

const initialstate = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
  }
}

function UserAuthContext({ children }) {
  const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
  const [state, dispatch] = useReducer(reducer, initialstate);
  const { user, isAuthenticated } = state;
  const userlogin = (email, password) => {
    // if (!email && !password) return;
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };

  const userlogout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <div>
      <authContext.Provider
        value={{ user, isAuthenticated, userlogin, userlogout }}
      >
        {children}
      </authContext.Provider>
    </div>
  );
}

export default UserAuthContext;
