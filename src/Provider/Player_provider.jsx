import React, { useState, createContext, useContext } from "react";

const playersPro = createContext();
const playersProUpdate = createContext();
const usePlayersPro = () => {
  return [useContext(playersPro), useContext(playersProUpdate)];
};

const winnerPro = createContext();
const winnerProUpdate = createContext();
const useWinnerPro = () => {
  return [useContext(winnerPro), useContext(winnerProUpdate)];
};

const currentPlayerPro = createContext();
const currentPlayerProUpdate = createContext();
const useCurrentPlayerPro = () => {
  return [useContext(currentPlayerPro), useContext(currentPlayerProUpdate)];
};

const isNewGamePro = createContext();
const isNewGameProUpdate = createContext();
const useIsNewGamePro = () => {
  return [useContext(isNewGamePro), useContext(isNewGameProUpdate)];
};

export default function Player_provider({ children }) {
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState();
  const [currentPlayer, SetCurrentPlayer] = useState();
  const [isNewGame, setIsNewGame] = useState();
  return (
    <div>
      <playersPro.Provider value={players}>
        <playersProUpdate.Provider value={setPlayers}>
          <winnerPro.Provider value={winner}>
            <winnerProUpdate.Provider value={setWinner}>
              <currentPlayerPro.Provider value={currentPlayer}>
                <currentPlayerProUpdate.Provider value={SetCurrentPlayer}>
                  <isNewGamePro.Provider value={isNewGame}>
                    <isNewGameProUpdate.Provider value={setIsNewGame}>
                      {children}
                    </isNewGameProUpdate.Provider>
                  </isNewGamePro.Provider>
                </currentPlayerProUpdate.Provider>
              </currentPlayerPro.Provider>
            </winnerProUpdate.Provider>
          </winnerPro.Provider>
        </playersProUpdate.Provider>
      </playersPro.Provider>
    </div>
  );
}
