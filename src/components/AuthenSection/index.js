import AppLogo from '../../images/simpleLogo.png';
import PropTypes from 'prop-types';

//MUX extentions
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {auth, database, login, logout, signup, useAuth} from "../../firebase";
import React, {useEffect, useRef, useState} from "react";
import {arrayUnion, collection, doc, onSnapshot, query, setDoc, updateDoc, where} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";


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
    button: {
        marginTop: '10px auto 10px auto'
    }
};


export default function Login() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const [userOnline, setUserOnline] = useState(false);
    const [alreadyLIStatement, setalreadyLIStatement] = useState("");;
    const [gate, setGate] = useState(true);
    // useEffect(() => {
    //     setUserOnline(true)
    // }, [userOnline]);
    //
    // const updateOnlineStatus = async () => {
    //     await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
    //         loggedIn: userOnline,
    //     });
    // }

    //moves user to sign up page to create a user
    async function handleSignup() {
        setLoading(true);
        try {
            window.location = "/signup";
        } catch {
            alert("routing to signup error!");
        }
        setLoading(false);
    }

    //get form data for email and password when hit log in
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        handleLogin(data.get('email'), data.get('password')); //pass data into login async function
    };

    //log in as a user
    async function handleLogin(email, password) {
        setLoading(true);
        try {
            await login(email, password);
            setLoading(false);
            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                loggedIn: true,
            });
            window.location = "/home";

        } catch {
            alert("Incorrect Email or Password input");
        }
        setLoading(false);
    }

    //log in as a guest
    async function anonymous_login () {
        setLoading(true);

        try {
            await login("anonymous@unkown.com", "Secret1234!");
            setLoading(false);
            window.location = "/home";
        } catch {
            alert("Error with logging in as anon");
        }
        setLoading(false);
    }

    //log user out of app
    async function handleLogout() {
        setLoading(true);
        try {
            setUserOnline(false);
            console.log("update doc...");

            await updateDoc(doc(database, "users", getAuth().currentUser.uid), {
                loggedIn: false,
            });
            console.log("logout...");
            await logout();
            console.log("logout success!");

        } catch {
            alert("Logging out Error");
        }
        setLoading(false);
        window.location = "/"; //reload page to get correct log in statement
    }

    async function handleFPClick() {
        window.location = "/forgot_password";
    }

    //get log in statement
    async function getalreadyLIStatement() {
        //only show log in statement if there is a current user logged in
        if (currentUser.email != null && gate) {
            setalreadyLIStatement(`Logged in as ${currentUser.email}` ); //display logged in email
            setGate(false);
        }
    }


    getalreadyLIStatement(); //get log in statement
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{width: 50, height: 60}} variant="square" src={AppLogo}/>
                <div> <font color="#ffffff"> new line </font> </div>

                <Typography component="h1" variant="h5">
                    Welcome to Boiler Breakouts!
                </Typography>

                <div>{alreadyLIStatement} </div>

                {/*form for loggin in*/}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    {/*login submit button*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading || currentUser}
                    >
                        Log In
                    </Button>

                    {/*buttons for signup, logout, guest, forget password*/}
                    <Grid container>
                        <Button disabled={loading || currentUser} onClick={handleSignup}>Create Account</Button>
                        <Button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</Button>
                        <Button disabled={loading || currentUser} onClick={anonymous_login}> continue as guest</Button>
                        <Button disabled={loading || !currentUser} onClick={handleFPClick}>Forgot Password?</Button>
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
}