import React from "react";
import { useWinnerPro } from "../../Provider/Player_provider";

export default function WiningPage() {
  const [winner, setWinner] = useWinnerPro();

  const displayWinner = () => {
    if (0 > 1) setWinner(winner);
    return <h1>Player {winner.name} Wom!</h1>;
  };

  return (
    <div>
      WiningPage
      {winner && displayWinner()}
    </div>
  );
}
