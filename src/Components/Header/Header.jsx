import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { logout } from "../../firebase";

export default function Header() {
  const [user] = useAuthState(auth);
  return (
    <div className="header">
      {user && <button onClick={logout}>logout</button>}
      {!user && <Link to="/login">Login</Link>}
    </div>
  );
}
