import React, { useState, createContext, useContext } from "react";

export const sessionIdPro = createContext();
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
export const useWikiPro = () => {
  return [useContext(wikiPro), useContext(wikiProUpdate)];
};

const languagePro = createContext();
const languageProUpdate = createContext();
export const useLanguagePro = () => {
  return [useContext(languagePro), useContext(languageProUpdate)];
};

function SessionProvider({ children }) {
  const [sessionId, setSessionId] = useState();
  const [sessionStatus, setSessionStatus] = useState();
  const [wiki, setWiki] = useState([null, null]);
  const [language, setLanguage] = useState("en");
  return (
    <sessionIdPro.Provider value={sessionId}>
      <sessionIdProUpdate.Provider value={setSessionId}>
        <sessionStatusPro.Provider value={sessionStatus}>
          <sessionStatusProUpdate.Provider value={setSessionStatus}>
            <wikiPro.Provider value={wiki}>
              <wikiProUpdate.Provider value={setWiki}>
                <languagePro.Provider value={language}>
                  <languageProUpdate.Provider value={setLanguage}>
                    {children}
                  </languageProUpdate.Provider>
                </languagePro.Provider>
              </wikiProUpdate.Provider>
            </wikiPro.Provider>
          </sessionStatusProUpdate.Provider>
        </sessionStatusPro.Provider>
      </sessionIdProUpdate.Provider>
    </sessionIdPro.Provider>
  );
}

export default SessionProvider;
