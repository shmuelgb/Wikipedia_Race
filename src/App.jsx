import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage/Homepage";
import GameSettings from "./Components/GameSettings/GameSettings";
import WaitingRoom from "./Components/WaitingRoom/WaitingRoom";
import Game from "./Components/Game/Game";
import WiningPage from "./Components/WiningPage/WiningPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Homepage} />
        <Route path="/game_settings" exact component={GameSettings} />
        <Route path="/waiting_room" exact component={WaitingRoom} />
        <Route path="/game" exact component={Game} />
        <Route path="/wining_page" exact component={WiningPage} />
      </Router>
    </div>
  );
}

export default App;
