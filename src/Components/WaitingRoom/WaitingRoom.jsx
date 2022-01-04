import React from "react";
import "./styles/WaitingRoom.css";
import { useSessionIdPro } from "../../Provider/Session_provider";

export default function WaitingRoom() {
  const [sessionId] = useSessionIdPro();

  return (
    <div className="waiting-room">
      <h1>WaitingRoom</h1>
      <h3>Tell your rival to enter this number as the session Id:</h3>
      <h1>{sessionId}</h1>
    </div>
  );
}
