import "./VerificationSent.css";
import { sendEmailVerification } from "firebase/auth";

function VerificationSent(props) {

  function verifyEmail() {
    sendEmailVerification(props.user).then(function() {
        // Verification email sent. Show new screen
        // console.log("verification sent");
        props.setVerifyEmailSent(true);
        // Sign out the user so they have to sign in again
        props.signOut(props.auth);
        // Go to login screeen not sign up screen
        props.setSignUp(false);
      })
      .catch(function(error) {
        // Error occurred. Inspect error.code. TODO show actual error message
        console.error("ERROR when trying to send email verification" + error);
      });
  }

  return (
    <>
      {/* TODO: move button later, the email verification says "you can now sign in after you verify email" */}
      {/* {!user.emailVerified && ( */}
      <div id="verification_screen">
        <button type="button" onClick={verifyEmail}>
          Verify email
        </button>
      </div>
    </>
  );
}

export default VerificationSent;
