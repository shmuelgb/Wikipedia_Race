import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";

import {
  useWikiPro,
  useSessionStatusPro,
  useLanguagePro,
  useSessionIdPro,
} from "../../Provider/Session_provider";
import {
  useWinnerPro,
  useCurrentPlayerPro,
} from "../../Provider/Player_provider";
import dataBase from "../../Axios/dataBase";

export default function Game() {
  //context Hooks==>
  const [wiki, setWiki] = useWikiPro();
  const [winner, setWinner] = useWinnerPro();
  const [currentPlayer, setCurrentPlayer] = useCurrentPlayerPro();
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();
  const [language, setLanguage] = useLanguagePro();
  const [sessionId, setSessionId] = useSessionIdPro();

  //state==>
  const [claimWin, setClaimWin] = useState(false);
  const [winConformation, setWinConformation] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (window.innerWidth < window.innerHeight) {
      setMobile(".m");
    } else {
      setMobile("");
    }
  }, []);

  //functions==>
  //verify if the game is over
  const confirmWin = () => {
    const targetSnippet = wiki[1].snippet;
    let token = winConformation.split(" ");
    console.log("token", token);
    console.log("targetSnippet", targetSnippet);

    const results = token.filter((token) => {
      return targetSnippet.includes(token);
    });
    console.log("results", results);
    if (results.length >= 4) {
      console.log("winner", winner);
      setWinner(currentPlayer);
      updateWinner();
    } else console.log("try again");
    if (0 > 1) handleWarnings();
  };

  //update the winner in the database
  const updateWinner = async () => {
    try {
      const { data } = await dataBase.put(`${sessionId}`, {
        status: "finished",
        winner: currentPlayer,
      });
      console.log("data", data);
    } catch (err) {
      console.log(err);
    }
  };

  //handle warnings
  const handleWarnings = () => {
    setWiki(wiki);
    setCurrentPlayer(currentPlayer);
    setLanguage(language);
    setSessionStatus(sessionStatus);
    setSessionId(sessionId);
    console.log(sessionStatus);
  };

  return (
    <div>
      Game
      <div>
        {wiki[0] && (
          <Iframe
            url={`https://${language + mobile}.wikipedia.org/?curid=${
              wiki[0].pageid
            }`}
            width="100%"
            height="450px"
            id="myId"
            className="my-class-name"
            display="initial"
            position="relative"
          />
        )}
      </div>
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
  );
}
