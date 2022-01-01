import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import GameSettings from "./Components/GameSettings/GameSettings";
import WaitingRoom from "./Components/WaitingRoom/WaitingRoom";
import Game from "./Components/Game/Game";
import WiningPage from "./Components/WiningPage/WiningPage";
import Redirect from "./Components/Redirect";

import SessionProvider from "./Provider/Session_provider";
import PlayerProvider from "./Provider/Player_provider";

function App() {
  return (
    <SessionProvider>
      <PlayerProvider>
        <div className="App">
          <Router>
            <Redirect />
            <Route path="/" exact component={Homepage} />
            <Route path="/game_settings" exact component={GameSettings} />
            <Route path="/waiting_room" exact component={WaitingRoom} />
            <Route path="/game" exact component={Game} />
            <Route path="/wining_page" exact component={WiningPage} />
          </Router>
        </div>
      </PlayerProvider>
    </SessionProvider>
  );
}

export default App;
