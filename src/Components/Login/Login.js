import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';

firebase.initializeApp(firebaseConfig);


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        success: false,
        email: '',
        password: '',
        error: '',

    });

    const handleGoggleSignUp = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                var user = result.user;
                const { displayName, email } = user;
                const SignedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }

                setLoggedInUser(SignedInUser)

            })
    }
    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)
        let fieldValid = true;
        if (e.target.name === "email") {
            fieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordNumber = /\d{1}/.test(e.target.value);
            fieldValid = isPasswordValid && passwordNumber
        }
        if (fieldValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }
    const handleSubmit = (e) => {
        //console.log(user.email, user.password)
        if (newUser && user.email && user.password) {

            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in 
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    newUser.success = false;
                    setUser(newUser);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const newUser = { ...user };
                    newUser.error = '';
                    newUser.success = true;
                    setUser(newUser);
                    setLoggedInUser(newUser);
                    console.log('sign in user info', res.user);

                })
                .catch((error) => {
                    const newUser = { ...user };
                    newUser.error = error.message;
                    newUser.success = false;
                    setUser(newUser);
                });
        }
        e.preventDefault();
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <input type="checkbox" onChange={() => setNewUser(!newUser)} name="userName" />
                    <label htmlFor="newUser">New-User-Sign-up</label>
                    <form onSubmit={handleSubmit}>
                        {newUser &&
                            <input onChange={handleChange} className="form-control" type="text" placeholder="Your name" />
                        }
                        <br />
                        <input onChange={handleChange} className="form-control" type="email" name="email" placeholder="Your email address" />
                        <br />
                        <input onChange={handleChange} className="form-control" type="password" name="password" placeholder=" Your password" />
                        <br />

                        <input type="submit" value={newUser ? "Sign-up" : "Sign-In"} className="form-control" />



                    </form>
                    <p style={{ color: 'red' }}>{user.error}</p>
                    {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
                </div>
            </div>

            <p>--------------------OR--------------------</p>
            <button className="btn btn-outline-warning" onClick={handleGoggleSignUp}>Sign Up With Goggle</button>

        </div>
    );
};

export default Login;