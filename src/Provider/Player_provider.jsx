import React, { useState, createContext, useContext } from "react";

const otherPlayerPro = createContext();
const otherPlayerProUpdate = createContext();
export const useOtherPlayerPro = () => {
  return [useContext(otherPlayerPro), useContext(otherPlayerProUpdate)];
};

const winnerPro = createContext();
const winnerProUpdate = createContext();
export const useWinnerPro = () => {
  return [useContext(winnerPro), useContext(winnerProUpdate)];
};

const currentPlayerPro = createContext();
const currentPlayerProUpdate = createContext();
export const useCurrentPlayerPro = () => {
  return [useContext(currentPlayerPro), useContext(currentPlayerProUpdate)];
};

const isNewGamePro = createContext();
const isNewGameProUpdate = createContext();
export const useIsNewGamePro = () => {
  return [useContext(isNewGamePro), useContext(isNewGameProUpdate)];
};

export default function Player_provider({ children }) {
  const [otherPlayer, setOtherPlayer] = useState([]);
  const [winner, setWinner] = useState();
  const [currentPlayer, SetCurrentPlayer] = useState();
  const [isNewGame, setIsNewGame] = useState();
  return (
    <div>
      <otherPlayerPro.Provider value={otherPlayer}>
        <otherPlayerProUpdate.Provider value={setOtherPlayer}>
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
        </otherPlayerProUpdate.Provider>
      </otherPlayerPro.Provider>
    </div>
  );
}
