import {
  // useAuthState,
  useCreateUserWithEmailAndPassword,
  // useSignInWithEmailAndPassword,
  // useSignInWithGoogle
} from "react-firebase-hooks/auth";
// import { setDoc, doc, collection, getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
// import { sendEmailVerification } from "firebase/auth";


function SignUp(props) {
  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(props.auth);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");



  const errorMessageMap = {
    "Firebase: Error (auth/invalid-email).":
      "Email address does not appear to be valid. Please try again.",
    "Firebase: Error (auth/internal-error).": "Password cannot be empty.",
    "Firebase: Error (auth/email-already-in-use).": (
      <div>
        Email address is already in use. Please go back to the login page.{" "}
        <br></br>
        <button onClick={() => props.setSignUp(false)}>Go Back to Login</button>
      </div>
    ),
  };

  // function createUser(res) {
  //   if (!error) {
  //       console.log("res.user is " + res.user)
  //       // console.log("user is " + user);
  //       console.log("userCredential is " + userCredential);
  //       console.log("loading is  " + loading);
  //       console.log("error is " +  error);
  //     setDoc(doc(usersCollection, userCredential.uid), {
  //       uid: userCredential.uid,
  //       highPriorityIcon: "",
  //       lowPriorityIcon: "",
  //       medPriorityIcon: "",
  //       sort: "created",
  //       email: userCredential.email,
  //     });
  //   }
  // }


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
  
  if (userCredential) {
    // Shouldn't happen because App should see that
    // we are signed in.
    return <div>Unexpectedly signed in already</div>;
  } else if (loading) {
    return <p>Signing up…</p>;
  }
  return (
    <>
      <div></div>
      <div className="sign-in-popup popup">
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
            onClick={() => {
              createUserWithEmailAndPassword(email, pw); //.then(props.onCreateUser)
              //props.setJustSignedUp(true); // make it so that the email verification thing shows up
              // props.verifyEmail();
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}

export default SignUp;
