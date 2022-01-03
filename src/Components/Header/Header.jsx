import React from "react";
import "./styles/Header.css";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { logout } from "../../firebase";
import logo from "../../styles/images/Wikipedia-logo.png";

export default function Header() {
  const [user] = useAuthState(auth);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/");
  };
  return (
    <header className="header">
      <img src={logo} alt="logo" />
      <h2>Wikipedia Race</h2>
      {user && (
        <button className="btn" onClick={handleLogout}>
          logout
        </button>
      )}
      {!user && (
        <Link className="btn" to="/login">
          Login
        </Link>
      )}
    </header>
  );
}
