import React, {useEffect, useState} from "react";
import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';
import {auth, database, emailUpdate, useAuth, verificationEmail} from "../../firebase";

//MUX extentions
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

//main welcome page with login and link to signing in
//stying margins for ux
const styles =  {
    form: {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '50px auto 10px auto'
    },
    button: {
        margin: '50px 30px 10px 30px'
    }
};



//privatized page that will be linked to email sent to user when they forgot their password
export default function EmailVerification()
{
    const [user, loading, error] = useAuthState(auth);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //collections in firebase keep the data tied to the user
    //https://firebase.google.com/docs/firestore/data-model
    //variables to keep user's input
    const [ogEmail, setOgEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [confirmNewEmail, setConfirmNewEmail] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    //get collection of users
    const userCollectionRef = collection(database, "users",);

    useEffect(() => {
        if (user) {
            setEmailVerified(user.emailVerified);
        }
    });



    async function handleEmailChange() {
        try {
            if (newEmail === confirmNewEmail) {
                if (newEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                    await emailUpdate(newEmail);
                    await verificationEmail(newEmail);
                    console.log("Email Updated");
                    console.log("Verification Email Sent");
                    if (emailVerified) {
                        window.location.pathname = "/home";
                    }
                }
                else {
                    alert("Please Enter A Valid Email!");
                }

                //will move to next page if user creation w/email and password is ok, else page is same

            } else {
                alert("Emails do not match!");
                console.log("Emails do not match");
            }
            //push inputs to ./users collection

            //window.location.pathname = "/home"; //redirects now logged in user to homepage
        } catch {
            alert("Error!");
        }
    }
    async function handleVerificationEmail() {
        try {
            await verificationEmail(ogEmail);
            console.log("Verification Email Sent");
            let currentDate = new Date();
            let cDay = currentDate.getDate();
            let cMonth = currentDate.getMonth() + 1;
            let cYear = currentDate.getFullYear();
            let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
            alert("Email Sent to " + getAuth().currentUser.email + " at " + cMonth + "/" + cDay + "/" + cYear + " " + time);
            if (emailVerified) {
                window.location.pathname = "/home";
            }
        }
        catch {
            alert("Couldn't Send Email")
        }
    }
    async function handleBackClick() {
        try {
            window.history.back();
            //push inputs to ./users collection

            //window.location.pathname = "/home"; //redirects now logged in user to homepage
        } catch {
            alert("Error!");
        }
    }
    async function handleHomeClick() {
        try {
            window.location.pathname = "/home";
            //push inputs to ./users collection

            //window.location.pathname = "/home"; //redirects now logged in user to homepage
        } catch {
            alert("Error!");
        }
    }
    //actual loading of screen
    if (loading) {
        return <div> Loading... </div>;
    } else if (user) {
        return (
            <Grid container className={"form"}>
                <Grid item sm/>
                <Grid item sm>
                    <center>
                        <img src={AppLogo} alt="logo" width='150px'/>
                    </center>
                    <Typography variant="h3" className={"pageTitle"}>
                        Email Verification
                    </Typography>
                    <Button type="submit" variant="contained" color="primary" className={"button"}
                            onClick={handleVerificationEmail}>
                        Send Verification Email
                    </Button>
                    {/* New password */}
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <label>New Email:</label>
                        <div className="inputGp">
                            <input
                                style={{
                                    width: '450px',
                                    height: '30px',
                                    marginTop: '5px',
                                    marginBottom: '20px',
                                    border: '2px solid #0D67B5',
                                    borderRadius: '5px'
                                }}
                                placeholder="New Email"
                                width=""
                                type="password"
                                onChange={(event) => {
                                    setNewEmail(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>
                    {/*confirm password*/}
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <label>Confirm New Email:</label>
                        <div className="inputGp">
                            <input
                                style={{
                                    width: '450px',
                                    height: '30px',
                                    marginTop: '5px',
                                    marginBottom: '20px',
                                    border: '2px solid #0D67B5',
                                    borderRadius: '5px'
                                }}
                                placeholder="Confirm New Email"
                                width=""
                                type="password"
                                onChange={(event) => {
                                    setConfirmNewEmail(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>
                    <Button type="submit" variant="contained" color="primary" className={"button"}
                            onClick={handleEmailChange}>
                        Update Email and Send Verification
                    </Button>
                    <Button type="submit" variant="contained" color="primary" className={"button"}
                            onClick={handleHomeClick}>
                        Skip
                    </Button>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }else if (error) {
        return <div>There was an authentication error.</div>;
    } else {
        return <div>There was an authentication error.</div>;
    }
}


