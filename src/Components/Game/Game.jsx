import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import "./styles/Game.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";

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

  //variables==>
  const englishExplanation =
    "To verify your win, copy the first line of the article, and paste here:";
  const hebrewExplanation =
    "כדי לאמת את הניצחון, יש להעתיק את השורה הראשונה של הערך, ולהדביק כאן:";

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

  const renderVerification = () => {
    const direction = language === "en" ? "ltr" : "rtl";
    return (
      <div className="verification">
        <textarea
          value={winConformation}
          onChange={(e) => setWinConformation(e.target.value)}
          cols="20"
          rows="10"
          dir={direction}
          placeholder={
            language === "en" ? englishExplanation : hebrewExplanation
          }
          autoFocus
        ></textarea>
        <button className="btn" onClick={confirmWin}>
          Confirm
        </button>
      </div>
    );
  };

  const scrollDown = () => {
    window.scroll({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="game">
      <div className="control-bar">
        {wiki[0] && (
          <div className="objectives">
            <h2>Origin:</h2>
            <h3>{wiki[0].title}</h3>
            <h2>Target:</h2>
            <h3>{wiki[1].title}</h3>
          </div>
        )}
        <button className="btn" onClick={() => setClaimWin(!claimWin)}>
          I Won!
        </button>
        {claimWin && renderVerification()}
      </div>
      {mobile && (
        <div className="down-chevron">
          <FontAwesomeIcon
            onClick={scrollDown}
            className="chevron"
            icon={faAngleDoubleDown}
          />
        </div>
      )}
      <div className="wiki-window">
        {wiki[0] && (
          <Iframe
            url={`https://${language + mobile}.wikipedia.org/?curid=${
              wiki[0].pageid
            }`}
            width="100%"
            height="100%"
            className="iframe"
            display="initial"
            position="relative"
            frameBorder="0"
            scrolling=""
          />
        )}
      </div>
    </div>
  );
}
