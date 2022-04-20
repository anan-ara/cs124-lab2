import SignedInApp from './SignedInApp';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { getAuth, sendEmailVerification, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth();

function App(props) {
  const [user, loading, error] = useAuthState(auth);
  function verifyEmail() {
    sendEmailVerification(user);
  }

  if (loading) {
    return <p>Checking...</p>;
  } else if (user) {
    return (
      <div>
        {user.displayName || user.email}
        <SignedInApp {...props} user={user} />
        {/*  TODO: move signOut and verify email to signedinapp/figure out where to put in UI */}
        <button type="button" onClick={() => signOut(auth)}>
          Sign out
        </button>
        {/* TODO: move button later, the email verification says "you can now sign in after you verify email" */}
        {!user.emailVerified && (
          <button type="button" onClick={verifyEmail}>
            Verify email
          </button>
        )}
      </div>
    );
  } else {
    return (
      <>
      {/* TODO: show user friendly error message here */}
        {error && <p>Error App: {error.message}</p>} 
        {/* <TabList> */}
          <SignIn key="Sign In" auth={auth} />
          <SignUp key="Sign Up" auth={auth} />
        {/* </TabList> */}
      </>
    );
  }
}

export default App;