import "./SignIn.css";
import "./Popup.css";
import "./Backdrop.css";
import { sendPasswordResetEmail } from "firebase/auth";

import { useState } from "react";

function PasswordReset(props) {
  const [email, setEmail] = useState("");
  const [resetPass, setResetPass] = useState(false);
  const errorMessageMap = {
    "Firebase: Error (auth/invalid-email).":
      "Email address does not appear to be valid. Please try again.",
    "Firebase: Error (auth/user-not-found).":
      "Email does not exist. Please sign up for an account.",
  };
  const [error, setError] = useState(null)

  function resetPassword() {
    sendPasswordResetEmail(props.auth, email)
      .then(() => {
        setError(false)
        setResetPass(true);
      })
      .catch((error) => {
        setError(error)
        setResetPass(false);
      });
  }

  return (
    <div className="sign-in-popup popup">
      <>
        <div className="menu-title">Reset Password</div>

        {error && (
            <div className="error-message">
              {errorMessageMap[error.message]}
            </div>
          )}
        {resetPass && (
          <div className="error-message">
            A link to reset your password has been sent to your email
          </div>
        )}
        <div className="login-fields">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                resetPassword();
              }
            }}
          />
        </div>
        <br />
        <div>
          <button
            className="reset-button"
            onClick={resetPassword}
          >
            Reset password
          </button>
        </div>
        <p>
          Got your password?
          <button onClick={props.onTogglePasswordReset}>Sign in</button>
        </p>
      </>
    </div>
  );
}

export default PasswordReset;
