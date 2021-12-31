import React, { useState, useEffect } from "react";
import dataBase from "../../Axios/dataBase";
import wikiSearch from "../../Axios/wikiSearch";
import {
  //   useIsNewGamePro,
  useCurrentPlayerPro,
} from "../../Provider/Player_provider";
import {
  useWikiPro,
  useSessionIdPro,
  useSessionStatusPro,
} from "../../Provider/Session_provider";

export default function GameSettings() {
  //| STATE===>
  const [sessionId, setSessionId] = useSessionIdPro();
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();
  const [currentPlayer, SetCurrentPlayer] = useCurrentPlayerPro();
  const [wiki, setWiki] = useWikiPro();
  const [originTerm, setOriginTerm] = useState("");
  const [targetTerm, setTargetTerm] = useState("");
  const [results, setResults] = useState([null, null]);
  const [name, setName] = useState("");
  const [idToJoin, setIdToJoin] = useState("");
  //   const [isNewGame, setIsNewGame] = useIsNewGamePro();

  //| FUNCTIONS===>
  useEffect(() => {
    if (originTerm) getSuggestions(originTerm, 0);
  }, [originTerm]);

  useEffect(() => {
    if (targetTerm) getSuggestions(targetTerm, 1);
  }, [targetTerm]);

  // Call Wikipedia API to get list of results
  const getSuggestions = async (term, identifier) => {
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
      wikiCopy[0] = item;
    } else {
      wikiCopy[1] = item;
    }
    setWiki(wikiCopy);
    console.log("wiki", wiki);
  };

  //Start a game
  const handleStart = (gameType) => {
    SetCurrentPlayer(name);
    if (gameType === "new") {
      startNewGame();
    } else {
      joinGame();
    }
  };

  //Start a new game
  const startNewGame = async () => {
    try {
      const { data } = await dataBase.post("", {
        status: "waiting",
        player1: {
          name: currentPlayer,
          clicks: 0,
          id: 1,
        },
        wiki: wiki,
        winner: null,
      });
      console.log(data);
      setSessionId(data.sessionId);
      setSessionStatus(data.status);
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
          name: currentPlayer,
          clicks: 0,
          id: 2,
        },
      });
    } catch (err) {
      console.log(err);
    }
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
        <button onClick={() => handleStart("new")}>Go!</button>
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
