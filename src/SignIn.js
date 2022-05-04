import "./SignIn.css";
import "./Popup.css";
import "./Backdrop.css";
import {
  // useAuthState,
  // useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";
import GithubButton from "react-github-login-button";

import { useState } from "react";

function SignIn(props) {
  const [signInWithEmailAndPassword, user1, loading1, error1] =
    useSignInWithEmailAndPassword(props.auth);
  const [signInWithGoogle, user2, loading2, error2] = useSignInWithGoogle(
    props.auth
  );
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const errorMessageMap = {
    "Firebase: Error (auth/invalid-email).":
      "Email address does not appear to be valid. Please try again.",
    "Firebase: Error (auth/wrong-password).": "Incorrect password.",
    "Firebase: Error (auth/user-not-found).":
      "Email does not exist. Please sign up for an account.",
  };

  return (
    <div className="sign-in-popup popup">
      {user1 || user2 || loading1 || loading2 ? (
        ((user1 || user2) && <div>Unexpectedly signed in already</div>) ||
        ((loading1 || loading2) && <div>Logging In...</div>)
      ) : (
        <>
          <div className="menu-title">Login</div>
          {error1 && (
            <div className="error-message">
              {errorMessageMap[error1.message]}
            </div>
          )}
          {error1 && console.log(error1.message)}
          <form className="login-fields">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="pw">Password: </label>
            <input
              type="password"
              id="pw"
              value={pw}
              autoComplete="current-password"
              onChange={(e) => setPw(e.target.value)}
            />
          </form>
          <br />
          <div className="login-buttons">
            <button onClick={() => signInWithEmailAndPassword(email, pw)}>
              Sign in
            </button>
            <button onClick={props.onToggleSignUp}>Sign up</button>
          </div>
          <hr />
          <GoogleButton className="google" onClick={() => signInWithGoogle()} />
          <GithubButton onClick={() => signInWithGoogle()} />
        </>
      )}
    </div>
  );
}

export default SignIn;
