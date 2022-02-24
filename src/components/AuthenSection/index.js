import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';
import PropTypes from 'prop-types';

//MUX extentions
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {login, logout, signup, useAuth} from "../../firebase";
import React, {useRef, useState} from "react";
import {Container} from "@material-ui/core";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import buttonInner from "@mui/material/Button";
import Modal from "@mui/material/Modal";


//main welcome page with login and link to signing in
//stying margins for ux
const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '70px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: '10px auto 10px auto'
    }
};

export default function Login() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();

    //moves user to sign up page to create a user
    async function handleSignup() {
        setLoading(true);
        try {
            window.location = "/signup";
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function handleLogin() {
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            window.location = "/home";

        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function anonymous_login () {
        setLoading(true);

        try {

            await login("anonymous@unkown.com", "secret1234");
            setLoading(false);
            window.location = "/home";

        } catch {
            alert("Error!");
        }

        setLoading(false);
    }

    async function handleLogout() {
        setLoading(true);
        try {
            await logout();
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    async function handleFPClick() {
        window.location = "/forgot_password";
    }


    return (


        <Grid container className={"form"}>
            <Grid item sm/>
            <Grid item sm> {/*middle of grids so centered*/}

                {/**todo:get smaller logo*/}
                <img src={AppLogo} alt="logo" width='150px'/>

                <Typography variant="h2" className={"pageTitle"}>
                    Login
                </Typography>
                <div>Currently logged in as: {currentUser?.email} </div>

                {/*<form>*/}

                {/*    <input*/}
                {/*        id="email"*/}
                {/*        name="email"*/}
                {/*        type="email"*/}
                {/*        label="Email"*/}
                {/*        className={"textField"}*/}
                {/*        ref={emailRef}*/}

                {/*        fullWidth*/}
                {/*    />*/}
                {/*    <input*/}
                {/*        id="password"*/}
                {/*        name="password"*/}
                {/*        type="password"*/}
                {/*        label="Password"*/}
                {/*        ref={passwordRef}*/}
                {/*        className={"textField"}*/}

                {/*        fullWidth*/}
                {/*    />*/}


                {/*    <Button*/}
                {/*        type="submit"*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        className={"button"}*/}
                {/*        disabled={loading || currentUser} onClick={handleLogin}*/}
                {/*    >*/}
                {/*        Login*/}
                {/*    </Button>*/}

                {/*    <Button*/}
                {/*        type="submit"*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        className={"button"}*/}
                {/*        disabled={loading || currentUser} onClick={handleSignup}*/}
                {/*    >*/}
                {/*        sign up*/}
                {/*    </Button>*/}

                {/*    <Button*/}
                {/*        type="submit"*/}
                {/*        variant="contained"*/}
                {/*        color="primary"*/}
                {/*        className={"button"}*/}
                {/*        disabled={loading || !currentUser} onClick={handleLogout}*/}
                {/*    >*/}
                {/*        logout*/}
                {/*    </Button>*/}

                {/*    /!*todo:link reset password page and signin page*!/*/}

                {/*    /!*GUEST BUTTON*!/*/}
                {/*    <Button*/}
                {/*        href="home"*/}
                {/*    >*/}
                {/*        continue as guest*/}
                {/*    </Button>*/}

                {/*    /!*RESET PASSWORD BUTTON*!/*/}
                {/*    <Button*/}
                {/*        href="reset_password"*/}
                {/*    >*/}
                {/*        Forgot your password?*/}
                {/*    </Button>*/}

                {/*</form>*/}


                <div id="fields">
                    <input ref={emailRef} placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                </div>
                <Button disabled={loading || currentUser} onClick={handleSignup}>Sign Up</Button>
                <Button disabled={loading || currentUser} onClick={handleLogin}>Log In</Button>
                <Button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</Button>
                <Button disabled={loading || currentUser} onClick={anonymous_login}> continue as guest</Button>
                <Button disabled={loading || !currentUser} onClick={handleFPClick}>Forgot Password</Button>
            </Grid>
            <Grid item sm/>n
        </Grid>
    );
}

// const config = {};
// const firebase = require('firebase');
// firebase.intializeApp(config);
// // signup Route
// app.post('/signup', (req, res) => {
//     const newUser = {
//         firstName : req.body.firstName,
//         lastName : req.body.lastName,
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password,
//         confirmPassword : req.body.confirmPassword,
//     }
//     //TODO: Validate Data
//     firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
//         .then(data => {
//             return res.status(200).json({message: `user ${data.user.uid} signed up successfully`})
//         })
//         .catch(err => {
//             console.error(err);
//             return res.status(500).json({error: err.code});
//         })
// })

