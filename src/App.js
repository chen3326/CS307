import React from 'react';
import './App.css';
import { getFirestore } from "firebase/firestore";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/index';
import login_page from './pages/login_page.js';
import Profile from "./pages/profile_page";

import Settings from "./pages/settings_page";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' component={login_page} exact/>
                <Route path='/profile' component={Profile} exact/>
                <Route path='/home' component={Home} exact/>

                //login_page, Profile, Home
                <Route path='/settings' component={Settings} exact/>

            </Switch>
        </Router>
    );
}

export default App;
