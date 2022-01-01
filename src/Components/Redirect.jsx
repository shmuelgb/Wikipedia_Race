import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSessionStatusPro } from "../Provider/Session_provider";

export default function Redirect() {
  const history = useHistory();
  const [sessionStatus, setSessionStatus] = useSessionStatusPro();

  useEffect(() => {
    console.log("sessionStatus", sessionStatus);
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

  return <></>;
}
