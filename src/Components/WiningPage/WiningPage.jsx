import React from "react";
import "./styles/WiningPage.css";
import { useWinnerPro } from "../../Provider/Player_provider";

export default function WiningPage() {
  const [winner] = useWinnerPro();

  const displayWinner = () => {
    return <h1>Player {winner.name} Wom!!!</h1>;
  };

  return (
    <div className="WiningPage">
      <div className="WiningPage-background"></div>
      {winner && displayWinner()}
    </div>
  );
}
