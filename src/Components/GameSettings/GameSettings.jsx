import React, { useState, useEffect, useRef } from "react";
import "./styles/GameSettings.css";
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
  //| Context Hooks===>
  const [sessionId, setSessionId] = useSessionIdPro();
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();
  const [currentPlayer, setCurrentPlayer] = useCurrentPlayerPro();
  const [otherPlayer, setOtherPlayer] = useOtherPlayerPro();
  const [winner, setWinner] = useWinnerPro();
  const [language, setLanguage] = useLanguagePro();

  //| STATE===>
  const [wiki, setWiki] = useWikiPro();
  const [originTerm, setOriginTerm] = useState("");
  const [targetTerm, setTargetTerm] = useState("");
  const [results, setResults] = useState([null, null]);
  const [name, setName] = useState("");
  const [idToJoin, setIdToJoin] = useState("");
  const [timersId, setTimersId] = useState([]);
  const [isLoading, setIsLoading] = useState("");

  //| REFS===>
  const originInputRef = useRef();
  const targetInputRef = useRef();

  //| FUNCTIONS===>

  const searchOrigin = (e) => {
    setOriginTerm(e.target.value);
    const timerId = setTimeout(() => {
      getSuggestions(e.target.value, 0);
    }, 500);
    setTimersId([...timersId, timerId]);
    if (e.target.value === "") {
      clearResults();
    }
  };

  const searchTarget = (e) => {
    setTargetTerm(e.target.value);
    const timerId = setTimeout(() => {
      getSuggestions(e.target.value, 1);
    }, 1000);
    setTimersId([...timersId, timerId]);
    if (e.target.value === "") {
      clearResults();
    }
  };

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

  const clearResults = () => {
    setTimeout(() => setResults([null, null]), 250);
  };

  useEffect(() => {
    timersId.forEach((timerId, i) => {
      if (i !== timersId.length - 1) clearTimeout(timerId);
    });
  }, [originTerm, targetTerm, timersId]);

  //Render results for user to choose from
  const renderSuggestions = (identifier) => {
    return results[identifier].map((item) => {
      return (
        <p key={item.pageid} onClick={() => setWikiValues(item, identifier)}>
          {item.title}
        </p>
      );
    });
  };

  //Set values for origin and target pages
  const setWikiValues = (item, identifier) => {
    const wikiCopy = [...wiki];
    if (identifier === 0) {
      setOriginTerm("");
      wikiCopy[0] = item;
      originInputRef.current.placeholder = item.title;
    } else {
      setTargetTerm("");
      wikiCopy[1] = item;
      targetInputRef.current.placeholder = item.title;
    }
    setWiki(wikiCopy);
    clearResults();
  };

  const handleStart = (gameType) => {
    setIsLoading("loading");
    setCurrentPlayer(name);
    if (gameType === "new") {
      startNewGame();
    } else {
      joinGame();
    }
    if (false) handleWarnings();
  };

  const handleWarnings = () => {
    console.log(currentPlayer, otherPlayer);
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
        language: language,
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
    setIsLoading("loading");
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
    if (sessionStatus === "finished") return;
    const intervalId = setInterval(async () => {
      try {
        const { data } = await dataBase.get(`/${id}`);
        if (sessionStatus !== data.status) setSessionStatus(data.status);
        setCurrentPlayer(data[`player${thisPlayerId}`]);
        setOtherPlayer(data[`player${otherPlayerId}`]);
        if (winner !== data.winner) setWinner(data.winner);
        if (wiki !== data.wiki) setWiki(data.wiki);
        if (language !== data.language) setLanguage(data.language);
        if (sessionId !== data.id) setSessionId(data.id);
        console.log("interval", data);
      } catch (err) {
        console.log(err);
      }
    }, 2000);
    if (sessionStatus === "finished") {
      clearInterval(intervalId);
    }
  };

  const handleSetLanguage = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`game-settings ${isLoading}`}>
      {isLoading && <div className="spinner"></div>}
      <div className="new-game">
        <h1>Start a new game</h1>
        <input
          placeholder="Enter Your Name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>Select Wikipedia articles:</h2>
        <div>
          <label htmlFor="language">Choose language:</label>
          <select name="language" onClick={handleSetLanguage} defaultValue="en">
            <option value="he">עברית</option>
            <option value="en">English</option>
          </select>
        </div>
        <input
          placeholder="Start from:"
          ref={originInputRef}
          type="text"
          value={originTerm}
          onChange={searchOrigin}
        />
        <div className="suggestions-container">
          {results[0] && (
            <div className="suggestions">{renderSuggestions(0)}</div>
          )}
        </div>
        <input
          placeholder="Finish at:"
          ref={targetInputRef}
          type="text"
          value={targetTerm}
          onChange={searchTarget}
        />
        <div className="suggestions-container">
          {results[1] && (
            <div className="suggestions">{renderSuggestions(1)}</div>
          )}
        </div>
        <button className="btn" onClick={() => handleStart("new")}>
          Go!
        </button>
        <br />
      </div>

      <div className="join-game">
        <h1>Join a game</h1>
        <input
          placeholder="Enter your name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="Enter game Id"
          name="id"
          type="text"
          value={idToJoin}
          onChange={(e) => setIdToJoin(e.target.value)}
        />
        <button className="btn" onClick={() => handleStart("join")}>
          Go!
        </button>
      </div>
    </div>
  );
}
