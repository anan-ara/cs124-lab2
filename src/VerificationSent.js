import "./VerificationSent.css";

function VerificationSent(props) {

  // function verifyEmail() {
  //   sendEmailVerification(props.user).then(function() {
  //       // Verification email sent. Show new screen
  //       // console.log("verification sent");
  //       props.setVerifyEmailSent(true);
  //       props.setJustSignedUp(true); // make it so that the email verification thing shows up
  //       // Sign out the user so they have to sign in again
  //       props.signOut(props.auth);
  //       // Go to login screeen not sign up screen
  //       props.setSignUp(false);
  //     })
  //     .catch(function(error) {
  //       // Error occurred. Inspect error.code. TODO show actual error message
  //       console.error("ERROR when trying to send email verification" + error);
  //     });
  // }

  return (
    <>
      {/* TODO: move button later, the email verification says "you can now sign in after you verify email" */}
      {/* {!user.emailVerified && ( */}
      <div id="verification_screen">
        A verification email has been sent to your email address. Please click on the link to verify your email and then login.
        <button onClick={() => props.setJustSignedUp(false)}>Return to Login Screen</button>
      </div>
    </>
  );
}

export default VerificationSent;
