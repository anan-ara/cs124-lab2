import {
  // useAuthState,
  useCreateUserWithEmailAndPassword,
  // useSignInWithEmailAndPassword,
  // useSignInWithGoogle
} from "react-firebase-hooks/auth";
import { setDoc, doc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";

function SignUp(props) {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(props.auth);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const errorMessageMap = {
    "Firebase: Error (auth/invalid-email).":
      "Email address does not appear to be valid. Please try again.",
    "Firebase: Error (auth/internal-error).": "Password cannot be empty.",
  };

  return (
    <div className="sign-in-popup popup">
      {user || loading ? (
        (user && <div>Unexpectedly signed in already</div>) ||
        (loading && <div>Signing up...</div>)
      ) : (
        <>
          <div className="menu-title">Sign Up</div>
          <div className="login-fields">
            {error && (
              <div className="error-message">
                {errorMessageMap[error.message]}
              </div>
            )}
            {error && console.log(error.message)}
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
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <br />
          <div className="login-buttons sign-up-buttons">
            <button onClick={props.onToggleSignUp}>Go back</button>
            <button
              onClick={
                () => createUserWithEmailAndPassword(email, pw) //.then(props.onCreateUser)
              }
            >
              Sign up
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default SignUp;
