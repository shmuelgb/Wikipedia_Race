import React from "react";
import { Link } from "react-router-dom";

import { useSessionIdPro } from "../../Provider/Session.provider";

function Homepage() {
  const [ses, setSes] = useSessionIdPro();
  return (
    <div>
      Homepage
      {ses}
      <button onClick={() => setSes("new val")}>press</button>
      <Link to="/game_settings" onClick={() => console.log("!")}>
        Start New Game
      </Link>
      <br />
      <Link to="/game_settings" onClick={() => console.log("!")}>
        Join Existing Game
      </Link>
    </div>
  );
}

export default Homepage;
