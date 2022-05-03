import SignedInApp from "./SignedInApp";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, setDoc, doc, collection,
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
import { useEffect } from "react";

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
  // function verifyEmail() {
  //   sendEmailVerification(user);
  // }

  //  TODO: make work only when email verified? if that's what we want to do, otherwise is OK
  function createUser() {
    if (user) {
      console.log("creating user, user is verified, email is  " + user.email);
      setDoc(doc(usersCollection, user.uid), {
        uid: user.uid,
        highPriorityIcon: "",
        lowPriorityIcon: "",
        medPriorityIcon: "",
        sort: "created",
        email: user.email,
      });
    }
  }

  // TODO: see if there is a better way to do this!
  // Hacky way to make the createUser function only be called when user is first defined
  // ISSUE: this happens whenever a user signs in, not just when they initially sign in 
  useEffect(() => createUser(user), [user]);


  if (loading) {
    return <p>Checking...</p>;
  } else if (user) {
    return (
      <div>
        {user.displayName || user.email}
        <SignedInApp {...props} user={user} db={db}/>
        {/*  TODO: move signOut and verify email to signedinapp/figure out where to put in UI */}
        <button type="button" onClick={() => signOut(auth)}>
          Sign out
        </button>
        
      </div>
    );
  } else {
    return (
      <>
        {/* TODO: show user friendly error message here */}
        {error && <p>Error App: {error.message}</p>}
        {/* <TabList> */}
        <SignIn key="Sign In" auth={auth} db={db}/>
        <SignUp key="Sign Up" auth={auth} db={db}/>
        {/* </TabList> */}
      </>
    );
  }
}

export default App;
