import SignedInApp from "./SignedInApp";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, setDoc, doc, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import SentVerification from "./SentVerification";
import ResendVerification from "./ResendVerification";
import { sendEmailVerification } from "firebase/auth";
// Ours
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3wO0gGMy0PN8SEZckT0xb6cYeB0zvV1M",
  authDomain: "cs124-lab3-e9930.firebaseapp.com",
  projectId: "cs124-lab3-e9930",
  storageBucket: "cs124-lab3-e9930.appspot.com",
  messagingSenderId: "200008037720",
  appId: "1:200008037720:web:52bc13f47bfa43cdd4212d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const usersCollection = collection(db, "users");

function App(props) {
  const [user, loading, error] = useAuthState(auth);

  // Whether or not the user has been created in the database. 
  const [userCreated, setUserCreated] = useState(false);// HAcky way, replace later TODO

  if (error) {
    console.error(error);
  }

  // we only care about when the verification email is sent but the user has not yet clicked on it. Everything else we can access using user.emailVerified
  // const [verifyEmailSent, setVerifyEmailSent] = useState(false);
  // True if the user has just signed up. Used to conditionally show a page that says to check their email for verification
  // (verification is sent automatically upon sign up.)
  const [verifyEmailSent, setVerifyEmailSent] = useState(false);

  // function verifyEmail() {
  //   sendEmailVerification(user);
  // }

  const [signUp, setSignUp] = useState(false);

  function handleToggleSignUp() {
    setSignUp(!signUp);
  }

  // //  TODO: make work only when email verified? if that's what we want to do, otherwise is OK
  // function createUser() {
  //   if (user) {
  //     console.log("creating user, user is verified, email is  " + user.email);
  //     setDoc(doc(usersCollection, user.uid), {
  //       uid: user.uid,
  //       highPriorityIcon: "",
  //       lowPriorityIcon: "",
  //       medPriorityIcon: "",
  //       sort: "created",
  //       email: user.email,
  //     });
  //   }
  // }

  // TODO: see if there is a better way to do this!
  // Hacky way to make the createUser function only be called when user is first defined
  // ISSUE: this happens whenever a user signs in, not just when they initially sign in
  // TODO: right now verifyEmail is sent on reload even when it's already been sent and we're just showing the
  // ResendVerification screen. THis should be fixed once we move this out of the useEffect though.
  useEffect(() => {
    if (user) {
      // createUser(user); // TODO: move this into somewhere so that it only does this when email is actually verified.
      // if (!verifyEmailSent) {
        verifyEmail();
        console.log("verifying email in user useEffect");
      // }
    }
  }, [user]);
  console.log("App is being rerendered");

  // This is here so that both sign up and go verify can use it.
  function verifyEmail() {
    // console.log("in verify Email. User is " + user);
    if (!user.emailVerified) {
      sendEmailVerification(user)
        .then(function () {
          // Verification email sent. Show new screen
          console.log("verification sent");
          setVerifyEmailSent(true); // make it so that the email verification thing shows up
        })
        .catch(function (error) {
          // Error occurred. Inspect error.code. TODO show actual error message
          console.error("ERROR when trying to send email verification" + error);
          // TODO: give correct error message for : "FirebaseError: Firebase: Error (auth/too-many-requests)."
        });
    }
  }

  if (loading) {
    return <p>Checking...</p>;
  } else if (user) {
    return user.emailVerified ? (
      <div>
        {user.displayName || user.email}
        <SignedInApp {...props} user={user} setUserCreated={setUserCreated} userCreated={userCreated} auth={auth} db={db} />
        {/*  TODO: move signOut and verify email to signedinapp/figure out where to put in UI */}
        <button type="button" onClick={() => signOut(auth)}>
          Sign out
        </button>
      </div>
    ) : verifyEmailSent ? (
      <SentVerification
        signOut={signOut}
        auth={auth}
        setSignUp={setSignUp}
        setVerifyEmailSent={setVerifyEmailSent}
      />
    ) : (
      <ResendVerification verifyEmail={verifyEmail} />
    );
    // TODO: fix bug where initially it shows resend verification screen before the useEffect finishes on initial sign in
  } else {
    return (
      <>
        {/* TODO: show user friendly error message here */}
        {error && <p>Error App: {error.message}</p>}
        {signUp ? (
          <SignUp
            key="Sign Up"
            setSignUp={setSignUp}
            auth={auth}
            db={db}
            //verifyEmail={verifyEmail}
          />
        ) : (
          // <SignUp key="Sign Up" setSignUp={setSignUp} auth={auth} db={db} verifyEmailSent={verifyEmailSent} signOut={signOut} onToggleSignUp={handleToggleSignUp}/>
          <SignIn
            key="Sign In"
            auth={auth}
            db={db}
            onToggleSignUp={handleToggleSignUp}
          />
        )}
      </>
    );
  }
}

export default App;
