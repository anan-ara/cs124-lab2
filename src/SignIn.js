import "./SignIn.css";
import "./Popup.css";
import "./Backdrop.css";
import {
  // useAuthState,
  // useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import GoogleButton from "react-google-button";
import GithubButton from "react-github-login-button";

import { useState, useRef } from "react";

function SignIn(props) {
  const [signInWithEmailAndPassword, user1, loading1, error1] =
    useSignInWithEmailAndPassword(props.auth);
  const [signInWithGoogle, user2, loading2, error2] = useSignInWithGoogle(
    props.auth
  );
  const [signInWithGithub, user3, loading3, error3] = useSignInWithGithub(
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

  const pwField = useRef();

  const user = user1 || user2 || user3;
  const loading = loading1 || loading2 || loading3;

  return (
    <div className="sign-in-popup popup">
      {user || loading ? (
        (user && <div>Unexpectedly signed in already</div>) ||
        (loading && <div>Logging In...</div>)
      ) : (
        <>
          <div className="menu-title">Login</div>

          {error1 && (
            <div className="error-message">
              {errorMessageMap[error1.message]}
            </div>
          )}
          <form className="login-fields">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  pwField.current.focus();
                }
              }}
            />
            <br />
            <label htmlFor="pw">Password: </label>
            <input
              ref={pwField}
              type="password"
              id="pw"
              value={pw}
              autoComplete="current-password"
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  signInWithEmailAndPassword(email, pw);
                }
              }}
            />
          </form>
          <br />
          <div>
            <button
              className="login-button"
              onClick={() => {
                signInWithEmailAndPassword(email, pw);
              }}
            >
              Sign in
            </button>
          </div>
          <hr />
          <GoogleButton className="google" onClick={() => signInWithGoogle()} />
          <GithubButton onClick={() => signInWithGithub()} />
          <p>
            Don't have an account?{" "}
            <button onClick={props.onToggleSignUp}>Sign up</button>
          </p>
          <p>
            Forgot password?{" "}
            <button onClick={props.onTogglePasswordReset}>
              Reset password
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default SignIn;
