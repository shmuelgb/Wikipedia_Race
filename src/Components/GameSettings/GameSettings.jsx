import React, { useState, useEffect } from "react";
import wikiSearch from "../../Axios/wikiSearch";
import { useIsNewGamePro } from "../../Provider/Player_provider";
import { useCurrentPlayerPro } from "../../Provider/Player_provider";
import { useWikiPro } from "../../Provider/Session_provider";

export default function GameSettings() {
  const [isNewGame, setIsNewGame] = useIsNewGamePro();
  const [currentPlayer, SetCurrentPlayer] = useCurrentPlayerPro();
  const [wiki, setWiki] = useWikiPro();
  const [originTerm, setOriginTerm] = useState("");
  const [targetTerm, setTargetTerm] = useState("");
  const [results, setResults] = useState([null, null]);
  const [name, setName] = useState("");

  const renderSuggestions = (identifier) => {
    return results[identifier].map((item) => {
      return (
        <div key={item.pageid} onClick={() => setWikiValues(item, identifier)}>
          {item.title}
        </div>
      );
    });
  };

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

  useEffect(() => {
    if (originTerm) getSuggestions(originTerm, 0);
  }, [originTerm]);

  useEffect(() => {
    if (targetTerm) getSuggestions(targetTerm, 1);
  }, [targetTerm]);

  return (
    <div>
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
      {/* {targetTerm && renderSuggestions(targetTerm, "target")} */}
      {results[1] && renderSuggestions(1)}
    </div>
  );
}
