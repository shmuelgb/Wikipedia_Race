import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      Homepage
      <Link to="/game_settings">OK let's Play!</Link>
    </div>
  );
}

export default Homepage;
