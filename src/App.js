import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/index';
import login_page from './pages/login_page.js';
import Profile from "./pages/profile_page";
import makePost_page from "./pages/makePost_page";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' component={login_page} exact/>
                <Route path='/profile' component={Profile} exact/>
                <Route path='/home' component={Home} exact/>
                <Route path='/makePost' component={makePost_page} exact/>
                //login_page, Profile, Home

            </Switch>
        </Router>
    );
}

export default App;
