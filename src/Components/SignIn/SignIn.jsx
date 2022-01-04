import React, { useEffect, useState } from "react";
import "./styles/SignIn.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const register = async () => {
    if (!name) alert("Please enter name");
    const user = await registerWithEmailAndPassword(name, email, password);
    console.log("user", user);
    // setUserPro(user);
    if (0 > 1) handleWarnings();
  };

  useEffect(() => {
    console.log("user", user);
    if (loading) return;
    if (user) history.goBack();
  }, [user, loading, history]);

  const handleWarnings = () => {
    console.log(error);
  };

  return (
    <div className="sign-in">
      <div className="sign-in__container">
        <h1>Sign In</h1>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          name="email"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn" onClick={register}>
          Register
        </button>
        <button className="btn" onClick={signInWithGoogle}>
          Register with Google
        </button>

        <div>
          Already have an account?
          <br />
          <Link to="/login">Login now</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
