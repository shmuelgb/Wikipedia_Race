import React from "react";
import { Link } from "react-router-dom";
// import { useUserPro } from "../../Provider/User_provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function Homepage() {
  const [user] = useAuthState(auth);
  return (
    <div>
      Homepage
      {user && <h1>Welcome {user.name}</h1>}
      {user && <Link to="/game_settings">OK let's Play!</Link>}
      {/* <Link to="/game_settings">OK let's Play!</Link> */}
    </div>
  );
}

export default Homepage;
