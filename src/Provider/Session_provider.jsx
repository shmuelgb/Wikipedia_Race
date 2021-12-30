import React, { useState, createContext, useContext } from "react";

const sessionIdPro = createContext();
const sessionIdProUpdate = createContext();
export const useSessionIdPro = () => {
  return [useContext(sessionIdPro), useContext(sessionIdProUpdate)];
};

const sessionStatusPro = createContext();
const sessionStatusProUpdate = createContext();
export const useSessionStatusPro = () => {
  return [useContext(sessionStatusPro), useContext(sessionStatusProUpdate)];
};

const wikiPro = createContext();
const wikiProUpdate = createContext();
const useWikiPro = () => {
  return [useContext(wikiPro), useContext(wikiProUpdate)];
};

function SessionProvider({ children }) {
  const [sessionId, setSessionId] = useState();
  const [sessionStatus, setSessionStatus] = useState();
  const [wiki, setWiki] = useState([]);
  return (
    <sessionIdPro.Provider value={sessionId}>
      <sessionIdProUpdate.Provider value={setSessionId}>
        <sessionStatusPro.Provider value={sessionStatus}>
          <sessionStatusProUpdate.Provider value={setSessionStatus}>
            <wikiPro.Provider value={wiki}>
              <wikiProUpdate.Provider value={setWiki}>
                {children}
              </wikiProUpdate.Provider>
            </wikiPro.Provider>
          </sessionStatusProUpdate.Provider>
        </sessionStatusPro.Provider>
      </sessionIdProUpdate.Provider>
    </sessionIdPro.Provider>
  );
}

export default SessionProvider;
