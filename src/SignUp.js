import {
  // useAuthState,
  useCreateUserWithEmailAndPassword,
  // useSignInWithEmailAndPassword,
  // useSignInWithGoogle
} from "react-firebase-hooks/auth";
import {
    setDoc,
    doc,
    collection, getFirestore
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
// import { getFirestore, collection, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";



function SignUp(props) {
  const [createUserWithEmailAndPassword, userCredential, loading, error] =
    useCreateUserWithEmailAndPassword(props.auth);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

//   function createUser(res) {
//     if (!error) {
//         console.log("res.user is " + res.user)
//         // console.log("user is " + user);
//         console.log("userCredential is " + userCredential);
//         console.log("loading is  " + loading);
//         console.log("error is " +  error);
//       setDoc(doc(usersCollection, userCredential.uid), {
//         uid: userCredential.uid,
//         highPriorityIcon: "",
//         lowPriorityIcon: "",
//         medPriorityIcon: "",
//         sort: "created",
//         email: userCredential.email,
//       });
//     }
//   }

  if (userCredential) {
    // Shouldn't happen because App should see that
    // we are signed in.
    return <div>Unexpectedly signed in already</div>;
  } else if (loading) {
    return <p>Signing up…</p>;
  }
  return (
    <div>
      {error && <p>"Error signing up: " {error.message}</p>}
      <label htmlFor="email">email: </label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="pw">pw: </label>
      <input
        type="text"
        id="pw"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <br />
      <button
        onClick={() =>
          createUserWithEmailAndPassword(email, pw)//.then(props.onCreateUser)
        }
      >
        Create test user
      </button>
    </div>
  );
}

export default SignUp;
