import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles/App.css";
import "./styles/normalize.css";
import Homepage from "./Components/Homepage/Homepage";
import GameSettings from "./Components/GameSettings/GameSettings";
import WaitingRoom from "./Components/WaitingRoom/WaitingRoom";
import Game from "./Components/Game/Game";
import WiningPage from "./Components/WiningPage/WiningPage";
import Redirect from "./Components/Redirect";
import Login from "./Components/Login/Login";
import SignIn from "./Components/SignIn/SignIn";
import Header from "./Components/Header/Header";

import SessionProvider from "./Provider/Session_provider";
import PlayerProvider from "./Provider/Player_provider";
import UserProvider from "./Provider/User_provider";

function App() {
  return (
    <SessionProvider>
      <PlayerProvider>
        <UserProvider>
          <div className="App">
            <Router>
              <Redirect />
              <Header />
              <Route path="/" exact component={Homepage} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/login" component={Login} />
              <Route path="/game_settings" exact component={GameSettings} />
              <Route path="/waiting_room" exact component={WaitingRoom} />
              <Route path="/game" exact component={Game} />
              <Route path="/wining_page" exact component={WiningPage} />
            </Router>
          </div>
        </UserProvider>
      </PlayerProvider>
    </SessionProvider>
  );
}

export default App;
