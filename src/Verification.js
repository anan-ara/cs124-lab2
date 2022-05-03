import "./Verification.css";
import { sendEmailVerification } from "firebase/auth";

function Verification(props) {

  function verifyEmail() {
    sendEmailVerification(props.user);
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

export default Verification;
