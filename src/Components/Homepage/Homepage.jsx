import React from "react";
import { Link } from "react-router-dom";

import { useIsNewGamePro } from "../../Provider/Player_provider";

function Homepage() {
  const [isNewGame, setIsNewGame] = useIsNewGamePro();

  const handleNewGame = (boolean) => {
    setIsNewGame(boolean);
  };

  return (
    <div>
      Homepage
      <Link to="/game_settings" onClick={() => handleNewGame(true)}>
        Start New Game
      </Link>
      <br />
      <Link to="/game_settings" onClick={() => handleNewGame(false)}>
        Join Existing Game
      </Link>
    </div>
  );
}

export default Homepage;
