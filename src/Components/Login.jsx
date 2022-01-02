import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
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
    if (user) history.replace("/");
    //TODO:  if user is logged in - update login context and redirect to landing page
  }, [user, loading, history]);

  const handleSignInEmailPassword = async () => {
    const user = await signInWithEmailAndPassword(email, password);
    console.log("user", user);
    setUserPro(user);
  };

  const handleSignInGoogle = async () => {
    const user = await signInWithGoogle();
    console.log("user", user);
    setUserPro(user);
  };

  const handleSignInFacebook = async () => {
    const user = await signInWithFacebook();
    console.log("user", user);
    setUserPro(user);
    if (0 > 1) console.log(userPro);
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

        <div
          className="login__btn login__facebook"
          onClick={() => handleSignInFacebook()}
        >
          Login with Facebook
        </div>
        <div>{/* <Link to="/reset">Forgot Password</Link> */}</div>
        <div>
          Don't have an account? <Link to="/signin">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
