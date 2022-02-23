import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';

//MUX extentions
import {
    Grid, Typography, TextField, Button, Container, Box
} from '@material-ui/core';

import {
    Stack, buttonInner
} from '@mui/material';


import {login, logout, signup, useAuth} from "../../firebase";
import React, {useRef, useState, useEffect} from "react";
import { addDoc, collection } from "firebase/firestore";
import {auth, database} from "../../firebase.js";


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

export default function SignUpUser() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //collections in firebase keep the data tied to the user
    //https://firebase.google.com/docs/firestore/data-model
    //variables to keep user's input
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const userCollectionRef = collection(database, "users"); //collection of users


    //add user to database in ./users
    const createUser = async () => {
        await addDoc(userCollectionRef, {
            author: { name: auth.currentUser.email, id: auth.currentUser.uid },
            fName: fName,
            lName: lName,
            email: email,
            password: password,
        });
        //window.location.pathname = "/home";
    };

    /**
    async function handleSignup() {
        setLoading(true);
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            //window.location = "/home";
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
    }
     **/

    return (


        <Grid container className={"form"}>
            <Grid item sm/>
            <Grid item sm> {/*middle of grids so centered*/}

                {/**todo:get smaller logo*/}
                <img src={AppLogo} alt="logo" width='150px'/>

                <Typography variant="h2" className={"pageTitle"}>
                    Create an Account
                </Typography>

                {/*first name*/}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label> First Name:</label>
                    <div className="inputGp">
                        <input
                            style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                            placeholder="First Name..."
                            width=""
                            onChange={(event) => {
                                setfName(event.target.value);
                            }}
                        />
                    </div>
                </Typography>

                {/*last name*/}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label> Last Name:</label>
                    <div className="inputGp">
                        <input
                            style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                            placeholder="Last Name..."
                            width=""
                            onChange={(event) => {
                                setlName(event.target.value);
                            }}
                        />
                    </div>
                </Typography>

                {/*email*/}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label> Email:</label>
                    <div className="inputGp">
                        <input
                            style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                            placeholder="Email..."
                            width=""
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                    </div>
                </Typography>

                {/*password todo:add on password authen function here, also double confirm type*/}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label> Password:</label>
                    <div className="inputGp">
                        <input
                            style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                            placeholder="Password..."
                            width=""
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                </Typography>

                {/*submit and close buttons on the bottom to end window*/}
                <Stack  spacing={3} direction="row">
                    <label>
                        <buttonInner onClick={createUser} style={{color:'#0D67B5'}}>NEXT</buttonInner>
                    </label>
                </Stack>
            </Grid>
            <Grid item sm/>n
        </Grid>
    );
}

/** save buttons for later incase

<Button disabled={loading || currentUser} onClick={handleSignup}>Sign Up</Button>
<Button disabled={loading || currentUser} onClick={handleLogin}>Log In</Button>
<Button disabled={loading || !currentUser} onClick={handleLogout}>Log Out</Button>
<Button disabled={loading || currentUser} onClick={anonymous_login}> continue as guest</Button>
<Button disabled={loading || !currentUser} onClick={handleFPClick}>Forgot Password</Button>
 **/