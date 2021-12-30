import React, { useState } from "react";
import { useIsNewGamePro } from "../../Provider/Player_provider";

export default function GameSettings() {
  const [isNewGame, setIsNewGame] = useIsNewGamePro();

  return (
    <div>
      <h2>Please Enter Your name:</h2>
      <input name="name" type="text" />

      <h2>Choose The Wikipedia page you want to start from:</h2>
      <input type="text" />
    </div>
  );
}
