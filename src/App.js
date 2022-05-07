import SignedInApp from "./SignedInApp";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import SentVerification from "./SentVerification";
import ResendVerification from "./ResendVerification";
import PasswordReset from "./PasswordReset";
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

function App(props) {
  const [user, loading, error] = useAuthState(auth);

  if (error) {
    console.error(error);
  }

  // we only care about when the verification email is sent but the user has not yet clicked on it. Everything else we can access using user.emailVerified
  // True if the user has just signed up. Used to conditionally show a page that says to check their email for verification
  // (verification is sent automatically upon sign up.)
  const [verifyEmailSent, setVerifyEmailSent] = useState(false);
  // Used to show a screen between sending and sent
  const [verifyEmailSending, setVerifyEmailSending] = useState(false);

  const [signUp, setSignUp] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  function handleToggleSignUp() {
    setSignUp(!signUp);
  }

  function handleTogglePasswordReset() {
    setPasswordReset(!passwordReset);
  }

  function handleSignOut() {
    signOut(auth);
  }

  useEffect(() => {
    if (user && !user.emailVerified) {
      verifyEmail();
    }
  }, [user, verifyEmail]);

  // This is here so that both sign up and go verify can use it.
  function verifyEmail() {
    if (!user.emailVerified) {
      setVerifyEmailSending(true);
      sendEmailVerification(user)
        .then(() => {
          // Verification email sent. Show new screen
          setVerifyEmailSent(true); // make it so that the email verification thing shows up
          setVerifyEmailSending(false);
        })
        .catch((error) => {
          // Error occurred. Inspect error.code. TODO show actual error message
          console.error("ERROR when trying to send email verification" + error);
          setVerifyEmailSending(false);
        });
    }
  }

  if (loading) {
    return <p>Checking...</p>;
  } else if (user) {
    return user.emailVerified ? (
      <div>
        {/* {user.displayName || user.email} */}

        <SignedInApp
          {...props}
          onSignOut={handleSignOut}
          user={user}
          auth={auth}
          db={db}
        />
      </div>
    ) : verifyEmailSent ? (
      <SentVerification
        signOut={signOut}
        auth={auth}
        setSignUp={setSignUp}
        setVerifyEmailSent={setVerifyEmailSent}
      />
    ) : verifyEmailSending ? (
      <div className="popup create-list-popup">
        Hang Tight! We're sending your verification Email...
      </div>
    ) : (
      <ResendVerification
        verifyEmail={verifyEmail}
        signOut={signOut}
        auth={auth}
        setSignUp={setSignUp}
      />
    );
  } else {
    return (
      <>
        {error && <p>Error App: {error.message}</p>}
        {signUp ? (
          <SignUp
            key="Sign Up"
            setSignUp={setSignUp}
            auth={auth}
            onToggleSignUp={handleToggleSignUp}
          />
        ) : passwordReset ? (
          <PasswordReset
            auth={auth}
            onTogglePasswordReset={handleTogglePasswordReset}
          />
        ) : (
          <SignIn
            key="Sign In"
            auth={auth}
            onToggleSignUp={handleToggleSignUp}
            onTogglePasswordReset={handleTogglePasswordReset}
          />
        )}
      </>
    );
  }
}

export default App;
