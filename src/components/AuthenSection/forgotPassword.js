import React, {useRef, useState, useEffect} from "react";
import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';
import PropTypes from 'prop-types';
import {auth, database, passwordChange, useAuth} from "../../firebase";

//MUX extentions
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {addDoc, collection, getDoc} from "firebase/firestore";

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
export default function ForgotPassword()
{
    const [loading, setLoading] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //collections in firebase keep the data tied to the user
    //https://firebase.google.com/docs/firestore/data-model
    //variables to keep user's input
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //get collection of users
    const userCollectionRef = collection(database, "users");

    const changePassword = async () => {
        //todo: <Link> add topics in window
        await getDoc(userCollectionRef, {
            id: auth.currentUser.uid,
            email: auth.currentUser.email
            //topics: { email: auth.currentUser.email,  },
        });
        //adds all user input into collection
        //password not passed into collection for security/privacy
        window.location.pathname = "/home"; //redirects now logged in user to homepage
    };

    async function handlePasswordChange() {
        try {
            if (confirmPassword === password) {
                await passwordChange(password);
                setLoading(false);
                window.location.pathname = "/home";
                //will move to next page if user creation w/email and password is ok, else page is same

            } else {
                alert("Passwords do not match!")
                console.log("Password do not match");
            }
             //push inputs to ./users collection

            //window.location.pathname = "/home"; //redirects now logged in user to homepage
        } catch {
            alert("Error!");
        }
    }
    async function handleBackClick() {
        setLoading(true);
        try {
            window.location.pathname = "/";
            //push inputs to ./users collection

            //window.location.pathname = "/home"; //redirects now logged in user to homepage
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }
    //actual loading of screen
    return (
        <Grid container className={"form"}>
            <Grid item sm />
            <Grid item sm>
                <center>
                    <img src={AppLogo} alt="logo" width='150px'/>
                </center>
                <Typography variant="h3" className={"pageTitle"}>
                    Forgot Password
                </Typography>
                {/* New password */}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label> New Password:</label>
                    <div className="inputGp">
                        <input
                            style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                            placeholder="New Password"
                            width=""
                            type="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                    </div>
                </Typography>
                {/*confirm password*/}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <label> Confirm Password:</label>
                    <div className="inputGp">
                        <input
                            style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                            placeholder="Confirm New Password"
                            width=""
                            type="password"
                            onChange={(event) => {
                                setConfirmPassword(event.target.value);
                            }}
                        />
                    </div>
                </Typography>
                <Button type="submit" variant = "contained" color="primary" className={"button"} onClick={handlePasswordChange}>
                        Confirm Changes
                </Button>
                <Button type="reset" variant='contained' color='secondary' className={"button"} onClick={handleBackClick}>Back</Button>
            </Grid>
            <Grid item sm />
        </Grid>
    );
}


