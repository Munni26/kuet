import React, { createContext, useState } from 'react';
import './App.css';
import Hall from './Components/Hall/Hall';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Form from './Components/Form/Form';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Login from './Components/Login/Login';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState('')

  const [halData, setHalData] = useState({})

  
  // console.log(halData)
  return (
    <div className="App">
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <UserContext.Provider value={[halData, setHalData]}>
        <p>Email: {loggedInUser.email}</p>
        <Router>

          <Navbar />
          <h2>Welcome to KUET Hall Management Website</h2>
          <Switch>
            {/* <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <UserContext.Provider value={[halData, setHalData]}> */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/hal">

              <Hall />
            </Route>
            <PrivateRoute path="/form/:name">
              <Form />
            </PrivateRoute>
            {/* <PrivateR path="/form/:name">
                <Form />
              </PrivateR> */}
            <Route path="/login">
              <Login />
            </Route>

            {/* </UserContext.Provider >
          </UserContext.Provider > */}
          </Switch>
        </Router>

      </UserContext.Provider >
    </UserContext.Provider >
    </div>
  );
}

export default App;
