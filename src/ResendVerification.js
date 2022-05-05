import "./Verification.css";

function ResendVerification(props) {
  return (
    <>
      <div id="go_verify_screen" className="notice-popup popup">
        You should have received an email in your inbox to verify your email.
        Please verify your email by clicking on the link before using the app. If you'd like to resend
        your verification email, please click on the button below. Once you've verified your email, return to the login page to re-login.
        <button className="notice-button"
          onClick={() => {
            props.verifyEmail();
            // props.setJustSignedUp(true); // now we want to show the "go find your email page."
          }}
        >
          Resend Verification Email
        </button>
        <button className="notice-button"
          onClick={() => {
            props.signOut(props.auth);
            props.setSignUp(false);
          }}
        >
          Return to Login Screen
        </button>
      </div>
    </>
  );
}

export default ResendVerification;
