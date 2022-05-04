import "./SentVerification.css";
import "./ResendVerification.css"

function SentVerification(props) {
  return (
    <>
      {/* TODO: move button later, the email verification says "you can now sign in after you verify email" */}
      {/* {!user.emailVerified && ( */}
      <div id="verification_screen" className="notice-popup">
        A verification email has been sent to your email address. Please click
        on the link to verify your email and then login.
        <button className="notice-button"
          onClick={() => {
            props.signOut(props.auth);
            props.setSignUp(false);
            // Was causing an error
            props.setVerifyEmailSent(true); // Make the app show the "ResendVerification" screen upon log in if the user didn't click the on the first verification email
          }}
        >
          Return to Login Screen
        </button>
      </div>
    </>
  );
}

export default SentVerification;
