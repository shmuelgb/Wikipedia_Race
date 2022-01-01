import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import GameSettings from "./Components/GameSettings/GameSettings";
import WaitingRoom from "./Components/WaitingRoom/WaitingRoom";
import Game from "./Components/Game/Game";
import WiningPage from "./Components/WiningPage/WiningPage";

import SessionProvider, {
  useSessionStatusPro,
} from "./Provider/Session_provider";
import PlayerProvider from "./Provider/Player_provider";

function App() {
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();
  const history = useHistory();

  useEffect(() => {
    switch (sessionStatus) {
      case "waiting":
        history.push("/waiting_room");
        break;
      case "active":
        history.push("/game");
        break;
      case "finished":
        history.push("/wining_page");
        break;
      default:
        console.log("default");
    }
    if (0 > 1) setSessionStatus("waiting");
  }, [sessionStatus, setSessionStatus, history]);

  // const handleWarnings = () => {
  //   setSessionStatus("waiting");
  // };

  return (
    <SessionProvider>
      <PlayerProvider>
        <div className="App">
          <Router>
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
