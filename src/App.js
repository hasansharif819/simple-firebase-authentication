import './App.css';
import app from './firebase.init';
import { getAuth, GoogleAuthProvider,GithubAuthProvider,  signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);
function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const handleGoogleSignin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
      });
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
        const user = result.user;
        setUser(user);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then( () => {
      setUser({});
    })
    .catch(error => {
      setUser({});
    })
  }
  return (
    <div className="App">
      {
        user.displayName ? <button onClick={handleSignOut}>Sign Out</button> : <>
          <button onClick={handleGoogleSignin}>Signin With Google</button>
          <button onClick={handleGithubSignIn}>Github Sign In</button>
        </>
      }
      
      

      <h2>Name: {user.displayName}</h2>
      <small>Email: {user.email}</small>
      <img src={user.photoURL} alt="" />

    </div>
  );
}

export default App;
