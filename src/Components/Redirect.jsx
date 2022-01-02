import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSessionStatusPro } from "../Provider/Session_provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Redirect() {
  const history = useHistory();
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();
  const [user] = useAuthState(auth);

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
      case undefined:
        break;
      default:
        console.log("default");
    }
    if (!user) {
      if (history[history.length - 1] === "/game_settings") {
        history.push("/");
      }
    }
    if (0 > 1) setSessionStatus("waiting");
  }, [sessionStatus, setSessionStatus, history, user]);

  return <></>;
}
