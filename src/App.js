import React from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/index';
import Profile from './pages/profile_page';


function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/' component={Profile} exact/>

            </Switch>
        </Router>
    );
}

export default App;
