import React from 'react';
import './App.css';
import { getFirestore } from "firebase/firestore";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/index';
import login_page from './pages/login_page.js';
import Signup from "./pages/signup_page";
import Forgot_password  from "./pages/forgot_password_page";
import Reset_Password from './pages/reset_password_page';
import Profile from "./pages/profile_page";
import Inner_topic from "./pages/inner_topic";
import Settings from "./pages/settings_page";

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/' component={login_page} exact/>
                <Route path='/signup' component={Signup} exact/>
                <Route path='/inner_topic' component={Inner_topic} exact/>
                <Route path='/forgot_password' component={Forgot_password} exact/>
                <Route path='/reset_password' component={Reset_Password} exact/>
                <Route path='/profile' component={Profile} exact/>
                <Route path='/home' component={Home} exact/>

                //login_page, Profile, Home
                <Route path='/settings' component={Settings} exact/>


            </Switch>
        </Router>
    );
}

export default App;
