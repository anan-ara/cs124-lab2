import "./NoticePopup.css";

function SentVerification(props) {
  return (
    <>
      <div id="verification_screen" className="notice-popup popup">
        A verification email has been sent to your email address. Please click
        on the link to verify your email and then re-login to access the app.
        <button className="notice-button"
          onClick={() => {
            props.signOut(props.auth);
            props.setSignUp(false);
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
