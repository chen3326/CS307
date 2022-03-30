import React, {useEffect, useState} from 'react';
import './App.css';

import {BrowserRouter as Router, Switch, Route, useParams} from 'react-router-dom';
import Home from './pages/index';
import login_page from './pages/login_page.js';
import Signup from "./pages/signup_page";
import Forgot_password from "./pages/forgot_password_page";
import Reset_Password from './pages/reset_password_page';
import Profile from "./pages/profile_page";
import Inner_topic from "./pages/inner_topic";
import Settings from "./pages/settings_page";
import SavedPost_page from "./pages/savedpost_page";
import Indvpost_page from "./pages/indvpost_page";
import Email_verification_page from "./pages/email_verification_page";
//import {useTheme, ThemeProvider, createTheme} from "@mui/material/styles";
//import { ThemeProvider } from "styled-components";
import {database} from "./firebase";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {getAuth} from "firebase/auth";




function App() {



    return (

            <Router>

                <Switch>

                    <Route path='/' component={login_page} exact/>
                    <Route path='/signup' component={Signup} exact/>
                    <Route path='/inner_topic' component={Inner_topic} exact/>
                    <Route path='/forgot_password' component={Forgot_password} exact/>
                    <Route path='/reset_password' component={Reset_Password} exact/>
                    <Route path='/profile/:profile_uid' component={Profile} exact/>
                    <Route path='/home' component={Home} exact/>
                    savedPost_page
                    <Route path='/saved' component={SavedPost_page} exact/>
                    <Route path="/home/:postid" component={Indvpost_page} />
                    <Route path="/email_verification" component={Email_verification_page} exact/>
                    <Route path='/settings' component={Settings} exact/>
                </Switch>

            </Router>

    );
}

const Indv = () => {
    const { postid } = useParams()
    return (
        // props.match.params.name
        <div>
            <h1>{postid}</h1>
            <></>
        </div>
    )
};

const Prof = () => {
    const { profile_uid } = useParams()
    return (
        // props.match.params.name
        <div>
            <h1>{profile_uid}</h1>
            <></>
        </div>
    )
};



export default App;
