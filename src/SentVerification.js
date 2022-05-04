import "./SentVerification.css";

function SentVerification(props) {
  return (
    <>
      {/* TODO: move button later, the email verification says "you can now sign in after you verify email" */}
      {/* {!user.emailVerified && ( */}
      <div id="verification_screen">
        A verification email has been sent to your email address. Please click
        on the link to verify your email and then login.
        <button
          onClick={() => {
            props.signOut(props.auth);
            props.setSignUp(false);
            props.setVerifyEmailSent(false); // Make the app show the "ResendVerification" screen upon log in if the user didn't click the on the first verification email
          }}
        >
          Return to Login Screen
        </button>
      </div>
    </>
  );
}

export default SentVerification;
