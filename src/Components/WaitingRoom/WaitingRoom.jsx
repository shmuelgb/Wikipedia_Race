import React from "react";
import { Link } from "react-router-dom";

import { useSessionStatusPro } from "../../Provider/Session_provider";

export default function WaitingRoom() {
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();

  //   useEffect(() => {
  //     if (sessionStatus !== "waiting") {
  //       history.push("/game");
  //     }
  //   }, [sessionStatus]);

  const startGame = () => {
    setSessionStatus("active");
  };

  const showContinueButton = () => {
    if (sessionStatus !== "waiting") {
      return (
        <Link onClick={() => startGame()} to="/game">
          Continue
        </Link>
      );
    }
  };

  return (
    <div>
      WaitingRoom
      <br />
      ***Game Explanation***
      <br />
      {showContinueButton()}
    </div>
  );
}
