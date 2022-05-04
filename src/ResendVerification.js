import "./ResendVerification.css";

function ResendVerification(props) {
  return (
    <>
      <div id="go_verify_screen">
        Please verify your email before using the app. If you'd like to resend
        your verification email, please click on the button below.
        <button
          onClick={() => {
            props.verifyEmail();
            // props.setJustSignedUp(true); // now we want to show the "go find your email page."
          }}
        >
          Resend Verification Email
        </button>
      </div>
    </>
  );
}

export default ResendVerification;
