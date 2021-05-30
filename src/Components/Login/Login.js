import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleGoogleSignUp, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


const Login = () => {


    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        success: false,
        email: '',
        password: '',
        error: '',

    });

    initializeLoginFramework();


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignUp = () => {
        handleGoogleSignUp()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
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
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })

        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })
        }
        e.preventDefault();
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
            <button className="btn btn-outline-warning" onClick={googleSignUp}>Sign Up With Goggle</button>

        </div>
    );
};

export default Login;