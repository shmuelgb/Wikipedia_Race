import React, { useState } from "react";
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

  //   const renderSuggestions = async (term, identifier) => {
  //     try {
  //       const { data } = await wikiSearch.get(term);
  //       data = data.query.search;
  //       return data.map((item) => {
  //         return (
  //           <div key={item.pageid} onClick={() => setWikiValues(identifier)}>
  //             {item.title}
  //           </div>
  //         );
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const renderSuggestions = async (term, identifier) =>
    console.log(term, identifier);

  const setWikiValues = (identifier) => {
    const wikiCopy = [...wiki];
    if (identifier === "origin") {
      wikiCopy[0] = originTerm;
    } else {
      wikiCopy[1] = targetTerm;
    }
    setWiki(wikiCopy);
  };

  return (
    <div>
      <h2>Please Enter Your name:</h2>
      <input
        type="text"
        value={currentPlayer}
        onChange={(e) => SetCurrentPlayer(e.target.value)}
      />

      <h2>Choose the Wikipedia page you want to start from:</h2>
      <input
        type="text"
        value={originTerm}
        onChange={(e) => setOriginTerm(e.target.value)}
      />
      {originTerm && renderSuggestions(originTerm, "origin")}
      <h2>Choose The target page:</h2>
      <input
        type="text"
        value={targetTerm}
        onChange={(e) => setTargetTerm(e.target.value)}
      />
      {/* {targetTerm && renderSuggestions(targetTerm, "target")} */}
    </div>
  );
}
