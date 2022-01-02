import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUserPro } from "../Provider/User_provider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const [userPro, setUserPro] = useUserPro();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.push("/");
    //TODO:  if user is logged in - update login context and redirect to landing page
  }, [user, loading, history]);

  const handleSignInEmailPassword = async () => {
    const user = await signInWithEmailAndPassword(email, password);
    setUserPro(user);
    console.log("user", userPro);
  };

  const handleSignInGoogle = async () => {
    const user = await signInWithGoogle();
    console.log("user", user);
    setUserPro(user);
  };

  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => handleSignInEmailPassword()}
        >
          Login
        </button>
        <button
          className="login__btn login__google"
          onClick={() => handleSignInGoogle()}
        >
          Login with Google
        </button>

        <div>{/* <Link to="/reset">Forgot Password</Link> */}</div>
        <div>
          Don't have an account? <Link to="/signin">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
