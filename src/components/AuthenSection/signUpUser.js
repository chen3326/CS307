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
        //add topics in window


        //adds all user input into collection
        //password not passed into collection for security/privacy
        await addDoc(userCollectionRef, {
            author: { name: auth.currentUser.email, id: auth.currentUser.uid },
            fName: fName,
            lName: lName,
            email: email,
        });


        window.location.pathname = "/home";
    };

    //create user in database authentication, but don't push to collections
    //firebase will error if unsuccessful inputs ie. email is already taken or isn't an email
    async function handleUserAuthen() {
        setLoading(true);
        try {
            await signup(email, password);

            //will move to next page if user creation w/email and password is ok, else page is same
            setLoading(false);
            window.location = "/";
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

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


                <Button onClick={handleUserAuthen}>Sign Up</Button>

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