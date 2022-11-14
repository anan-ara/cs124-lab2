import {
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { useState, useRef } from "react";


function SignUp(props) {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(props.auth);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const pwField = useRef();

  const errorMessageMap = {
    "Firebase: Error (auth/invalid-email).":
      "Email address does not appear to be valid. Please try again.",
    "Firebase: Error (auth/internal-error).": "Password cannot be empty.",
    "Firebase: Error (auth/email-already-in-use).":"Email address is already in use. Please go back to the Sign In page.",
    "Firebase: Error (auth/missing-email).":"Email cannot be empty. Please enter an email address.",
  };

  return (
    <div className="sign-in-popup popup">
      {user || loading ? (
        (user && <div>Unexpectedly signed in already</div>) ||
        (loading && <div>Signing up...</div>)
      ) : (
        <>
          <div className="menu-title">Sign Up</div>
          <form className="login-fields">
            {error && (
              <div className="error-message">
                {errorMessageMap[error.message]}
              </div>
            )}
            {error && console.error(error.message)}
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
              autoComplete="current-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                createUserWithEmailAndPassword(email, pw);
                }
              }}
            />
          </form>
          <br />
          <div className="login-buttons sign-up-buttons">
            <button className="login-button"
              onClick={
                () => createUserWithEmailAndPassword(email, pw)
              }
            >
              Sign up
            </button>
          </div>
          <p>Already have an account? <button onClick={props.onToggleSignUp}>Sign in</button></p>
        </>
      )}
    </div>

  );
}

export default SignUp;
