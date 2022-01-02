import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dataBase from "../../Axios/dataBase";
import { HeWikiSearch, EnWikiSearch } from "../../Axios/wikiSearch";
import {
  //   useIsNewGamePro,
  useCurrentPlayerPro,
  useWinnerPro,
  useOtherPlayerPro,
} from "../../Provider/Player_provider";
import {
  useWikiPro,
  useSessionIdPro,
  useSessionStatusPro,
  useLanguagePro,
} from "../../Provider/Session_provider";

export default function GameSettings() {
  //| STATE===>
  const [sessionId, setSessionId] = useSessionIdPro();
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();
  const [currentPlayer, setCurrentPlayer] = useCurrentPlayerPro();
  const [otherPlayer, setOtherPlayer] = useOtherPlayerPro();
  const [winner, setWinner] = useWinnerPro();
  const [language, setLanguage] = useLanguagePro();

  const [wiki, setWiki] = useWikiPro();
  const [originTerm, setOriginTerm] = useState("");
  const [targetTerm, setTargetTerm] = useState("");
  const [results, setResults] = useState([null, null]);
  const [name, setName] = useState("");
  const [idToJoin, setIdToJoin] = useState("");
  //   const [isNewGame, setIsNewGame] = useIsNewGamePro();

  //| FUNCTIONS===>

  useEffect(() => {
    const getSuggestions = async (term, identifier) => {
      const wikiSearch = language === "en" ? EnWikiSearch : HeWikiSearch;
      try {
        let { data } = await wikiSearch.get(term);
        data = data.query.search;
        const resultsCopy = [...results];
        resultsCopy[identifier] = data;
        setResults(resultsCopy);
      } catch (err) {
        console.log(err);
      }
    };
    if (originTerm.length > 0) getSuggestions(originTerm, 0);
    if (targetTerm.length > 0) getSuggestions(targetTerm, 1);
  }, [originTerm, targetTerm, results, language]);

  //Render results for user to choose from
  const renderSuggestions = (identifier) => {
    return results[identifier].map((item) => {
      return (
        <div key={item.pageid} onClick={() => setWikiValues(item, identifier)}>
          {item.title}
        </div>
      );
    });
  };

  //Set values for origin and target pages
  const setWikiValues = (item, identifier) => {
    const wikiCopy = [...wiki];
    if (identifier === 0) {
      setOriginTerm("");
      wikiCopy[0] = item;
    } else {
      setTargetTerm("");
      wikiCopy[1] = item;
    }
    setWiki(wikiCopy);
    console.log("wiki", wiki);
  };

  const handleStart = (gameType) => {
    setCurrentPlayer(name);
    if (gameType === "new") {
      startNewGame();
    } else {
      joinGame();
    }
    if (false) handleWarnings();
  };

  const handleWarnings = () => {
    console.log(sessionId, sessionStatus, winner, currentPlayer, otherPlayer);
    setLanguage("en");
  };

  //Start a new game
  const startNewGame = async () => {
    try {
      const { data } = await dataBase.post("", {
        status: "waiting",
        player1: {
          name: name,
          clicks: 0,
          id: 1,
        },
        wiki: wiki,
        winner: null,
      });
      console.log(data);
      setSessionId(data.id);
      setSessionStatus(data.status);
      syncSession(data.id, 1, 2);
    } catch (err) {
      console.log(err);
    }
  };

  //Join an existing game
  const joinGame = async () => {
    try {
      const { data } = await dataBase.put(idToJoin, {
        status: "active",
        player2: {
          name: name,
          clicks: 0,
          id: 2,
        },
      });
      syncSession(idToJoin, 2, 1);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const syncSession = async (id, thisPlayerId, otherPlayerId) => {
    const intervalId = setInterval(async () => {
      try {
        const { data } = await dataBase.get(`/${id}`);
        setSessionStatus(data.status);
        setCurrentPlayer(data[`player${thisPlayerId}`]);
        setOtherPlayer(data[`player${otherPlayerId}`]);
        setWinner(data.winner);
        setWiki(data.wiki);
        console.log("interval", data);
      } catch (err) {
        console.log(err);
      }
    }, 5000);
    if (sessionStatus === "finished") {
      clearInterval(intervalId);
    }
  };

  const handleSetLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <div className="new-game">
        <h1>To Start a new game</h1>
        <h2>Please Enter Your name:</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>Choose the Wikipedia page you want to start from:</h2>
        <label htmlFor="language">Choose language:</label>
        <select name="language" onClick={handleSetLanguage}>
          <option value="he">Hebrew</option>
          <option value="en">English</option>
        </select>
        <input
          type="text"
          value={originTerm}
          onChange={(e) => setOriginTerm(e.target.value)}
        />
        {results[0] && renderSuggestions(0)}
        <h2>Choose The target page:</h2>
        <input
          type="text"
          value={targetTerm}
          onChange={(e) => setTargetTerm(e.target.value)}
        />
        {results[1] && renderSuggestions(1)}
        {/* <button onClick={() => handleStart("new")}>Go!</button> */}
        <br />
        <Link onClick={() => handleStart("new")} to="/waiting_room">
          Go!
        </Link>
      </div>
      <div className="join-game">
        <h1>To Join a game</h1>
        <h2>Please Enter Your name:</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={idToJoin}
          onChange={(e) => setIdToJoin(e.target.value)}
        />
        <button onClick={() => handleStart("join")}>Go!</button>
      </div>
    </div>
  );
}
