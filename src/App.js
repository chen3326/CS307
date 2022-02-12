import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import Home from './pages/index';
import Profile from './pages/profile_page';
import Login from './pages/SigninElements';

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' component={Login} exact/>
                <Route path='/' component={Profile} exact/>

            </Switch>
        </Router>
    );
}

export default App;
