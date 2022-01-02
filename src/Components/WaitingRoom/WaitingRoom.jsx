import React from "react";
import { useSessionIdPro } from "../../Provider/Session_provider";

export default function WaitingRoom() {
  const [sessionId, setSessionId] = useSessionIdPro();

  const displayId = () => {
    if (0 > 1) setSessionId(sessionId);
    return (
      <p>tell your rival to enter the number {sessionId} as the session Id</p>
    );
  };

  return (
    <div>
      WaitingRoom
      <br />
      {sessionId && displayId()}
      <br />
      ***Game Explanation***
    </div>
  );
}
