import React from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import "./Styles/Homepage.css";

function Homepage() {
  const [user] = useAuthState(auth);
  return (
    <div className="homepage">
      <figure className="homepage-background"></figure>
      <div className="homepage-content">
        <h1>Welcome to Wikipedia Race!</h1>
        <p>
          Here you can play against your friends by racing <br /> through
          Wikipedia articles!
        </p>
        <h2>Are You Ready?</h2>
        {user && (
          <Link className="btn" to="/game_settings">
            Let's Play!
          </Link>
        )}
        {!user && (
          <Link className="btn" to="/login">
            Login To Continue
          </Link>
        )}
      </div>
    </div>
  );
}

export default Homepage;
