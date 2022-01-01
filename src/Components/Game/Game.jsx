import React, { useState } from "react";
import Iframe from "react-iframe";

import {
  useWikiPro,
  useSessionStatusPro,
} from "../../Provider/Session_provider";
import {
  useWinnerPro,
  useCurrentPlayerPro,
} from "../../Provider/Player_provider";

export default function Game() {
  const [wiki, setWiki] = useWikiPro();
  const [winner, setWinner] = useWinnerPro();
  const [currentPlayer, setCurrentPlayer] = useCurrentPlayerPro();
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();
  const [claimWin, setClaimWin] = useState(false);
  const [winConformation, setWinConformation] = useState();

  const confirmWin = () => {
    const targetSnippet = wiki[1].snippet;
    let token = winConformation.split(" ");
    const tokens = [];
    tokens.push(token[token.length - 1]);
    tokens.push(token[token.length - 2]);
    tokens.push(token[token.length - 3]);
    tokens.push(token[token.length - 4]);

    if (tokens.every((token) => targetSnippet.includes(token))) {
      setWinner(currentPlayer);
      setSessionStatus("finished");
      console.log("winner", winner);
    } else console.log("?");
    if (0 > 1) handleWarnings();
  };

  const handleWarnings = () => {
    setWiki(null);
    setCurrentPlayer(null);
    console.log(sessionStatus);
  };

  return (
    <div>
      Game
      <div>
        {wiki && (
          <Iframe
            url={`http://en.wikipedia.org/?curid=${wiki[0].pageid}`}
            width="100%"
            height="450px"
            id="myId"
            className="my-class-name"
            display="initial"
            position="relative"
          />
        )}
        <button onClick={() => setClaimWin(true)}>I Won!</button>
        {claimWin && (
          <input
            type="text"
            value={winConformation}
            onChange={(e) => setWinConformation(e.target.value)}
          />
        )}
        {claimWin && <button onClick={confirmWin}>Confirm</button>}
      </div>
    </div>
  );
}
