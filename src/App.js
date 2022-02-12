import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/index';
import login_page from './pages/login_page.js';
import Profile from "./pages/profile_page";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' component={login_page} exact/>
                <Route path='/' component={Profile} exact/>
                <Route path='/' component={Home} exact/>
                //login_page, Profile, Home

            </Switch>
        </Router>
    );
}

export default App;
