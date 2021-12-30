import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import GameSettings from "./Components/GameSettings/GameSettings";
import WaitingRoom from "./Components/WaitingRoom/WaitingRoom";
import Game from "./Components/Game/Game";
import WiningPage from "./Components/WiningPage/WiningPage";

//
import SessionProvider from "./Provider/Session_provider";
import Player_provider from "./Provider/Player_provider";
//
function App() {
  // const [sessionId, setSessionId] = useState();
  // const [sessionStatus, setSessionStatus] = useState();
  // const [wiki, setWiki] = useState([]);
  // const [players, setPlayers] = useState([]);
  // const [winner, setWinner] = useState();
  // const [currentPlayer, SetCurrentPlayer] = useState();
  // const [isNewGame, setIsNewGame] = useState();

  return (
    <SessionProvider>
      <Player_provider>
        <div className="App">
          <Router>
            <Route path="/" exact component={Homepage} />
            <Route path="/game_settings" exact component={GameSettings} />
            <Route path="/waiting_room" exact component={WaitingRoom} />
            <Route path="/game" exact component={Game} />
            <Route path="/wining_page" exact component={WiningPage} />
          </Router>
        </div>
      </Player_provider>
    </SessionProvider>
  );
}

export default App;
