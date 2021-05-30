import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignUp = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {

            var user = result.user;
            const { displayName, email } = user;
            const SignedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                success: true
            }

            return SignedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            // Signed in 
            const newUser = res.user;
            newUser.error = '';
            newUser.success = true;
            // setUser(newUser);
            updateUserName(name);
            return newUser;
        })
        .catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            newUser.success = false;
            return newUser;
            // setUser(newUser);
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            // Signed in
            const newUser = res.user;
            newUser.error = '';
            newUser.success = true;
            return newUser;
            // setUser(newUser);
            // setLoggedInUser(newUser);
            // history.replace(from);
            // console.log('sign in user info', res.user);

        })
        .catch((error) => {
            const newUser = {};
            newUser.error = error.message;
            newUser.success = false;
            return newUser;
            // setUser(newUser);
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('user name updated successfully')
    }).catch(function (error) {
        console.log(error)
    });
}