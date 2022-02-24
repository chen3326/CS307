//Sign up user creates a new account


//local files
import {auth, database} from "../../firebase.js";
import {login, logout, signup, useAuth} from "../../firebase";
import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';


//MUX extentions
import {
    Typography, TextField, Button, Container, Box, FormControl, CssBaseline,
    FormControlLabel, Checkbox, Input, Paper
} from '@material-ui/core';
import {
    InputLabel, MenuItem, Select, Avatar, FormHelperText
} from '@mui/material';


import PropTypes from 'prop-types';
import { orange, indigo } from '@mui/material/colors';
import HardwareIcon from '@mui/icons-material/Hardware';
import withStyles from '@material-ui/core/styles/withStyles';

import React, {useRef, useState, useEffect} from "react";
import { addDoc, collection } from "firebase/firestore";
import Grid from "@mui/material/Grid";


//stying margins for ux
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: '70px auto 20px auto',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


function SignUpUser() {
    const min = 1;

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //collections in firebase keep the data tied to the user
    //https://firebase.google.com/docs/firestore/data-model
    //variables to keep user's input
    const [nickName, setnickName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0)
    const [major, setMajor] = useState("");
    const [year, setYear] = useState("");

    //todo: profile image set up
    const [bio, setBio] = useState("");



    const userCollectionRef = collection(database, "users"); //collection of users

    //add user to database in ./users
    const createUser = async () => {
        //todo: <Link> add topics in window
        //adds all user input into collection
        //password not passed into collection for security/privacy
        await addDoc(userCollectionRef, {
            id: auth.currentUser.uid,
            email: email,
            nickName: nickName,
            age: age,
            major: major,
            year: year,
            bio: bio
            //topics: { email: auth.currentUser.email,  },
        });
        window.location.pathname = "/home"; //redirects now logged in user to homepage
    };

    //create user in database authentication, but don't push to collections
    //firebase will error if unsuccessful inputs ie. email is already taken or isn't an email
    async function handleUserAuthen() {
        setLoading(true);
        try {
            //valid email checks
            if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                //valid password recs as seen below in alert
                if (password.match(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/)) {
                    await signup(email, password);
                    setLoading(false); //will move to next page if user creation w/email and password is ok, else page is same
                    createUser();
                } else {
                    alert("Password Doesnt Meet Requirements of:\n1. Minimum 6 characters\n" +
                        "2. At least 1 upper case English letter\n" +
                        "3. At least 1 lower case English letter\n" +
                        "4. At least 1 letter\n" +
                        "5. At least 1 special character (!,@,#,$,%,&,)");
                }
            }
            else {
                alert("Please enter a Valid Email!")
            }
             //push inputs to ./users collection
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }



    //DISPLAY PAGE
    return (
        <Grid container className={"form"}>
            <Grid item sm/>
            <Grid item sm> {/*middle of grids so centered*/}
                    {/* rn temp logo marker*/}
                    <Avatar sx={{ bgcolor: orange[500] }} variant="rounded">
                        <HardwareIcon sx={{ color: indigo[500] }} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create an Account
                    </Typography>

                    {/*form for all user inputs*/}
                        {/*Nickname*/}
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Nickname*"
                                className={"textField"}
                                onChange={(event) => {
                                    setnickName(event.target.value);
                                }}
                            />
                        </FormControl>

                        {/*Email Address*/}
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Email Address*"
                                className={"textField"}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                }}
                            />
                        </FormControl>

                        {/*Password*/}
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Password*"
                                className={"textField"}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                            <Typography variant={"subtitle1"} display="inline">
                                1. Minimum 6 characters
                            </Typography>
                            <Typography variant={"subtitle1"} display="inline">
                                2. At least 1 upper case English letter
                            </Typography>
                            <Typography variant={"subtitle1"} display="inline">
                                3. At least 1 lower case English letter
                            </Typography>
                            <Typography variant={"subtitle1"} display="inline">
                                4. At least 1 letter
                            </Typography>
                            <Typography variant={"subtitle1"} display="inline">
                                5. At least 1 special character (!,@,#,$,%,&,)");
                            </Typography>
                        </FormControl>

                        {/*Major*/}
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Major*"
                                className={"textField"}
                                onChange={(event) => {
                                    setMajor(event.target.value);
                                }}
                            />
                        </FormControl>

                        {/*age and year*/}
                        {/*Age*/}
                        <FormControl margin="normal">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Age*"
                                className={"textField"}

                                //make sure that only unsigned int can be used as inputs
                                type={"number"}
                                inputProps={{ min }}
                                value={age}
                                onChange={(event) =>
                                {
                                    if (event.target.value === "") {
                                        setAge(event.target.value);
                                        return;
                                    }
                                    const value = +event.target.value;
                                    if (value < min) {
                                        setAge(min);
                                    } else {
                                        setAge(value);
                                    }
                                }}
                            />
                        </FormControl>

                        {/*Year*/}
                        <div>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel id="demo-controlled-open-select-label">Year</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={year}
                                    label="Year"
                                    onChange={(event) => {
                                        setYear(event.target.value);
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Freshman"}>Freshman</MenuItem>
                                    <MenuItem value={"Sophmore"}>Sophmore</MenuItem>
                                    <MenuItem value={"Junior"}>Junior</MenuItem>
                                    <MenuItem value={"Senior"}>Senior</MenuItem>
                                    <MenuItem value={"Super Senior"}>Super Senior</MenuItem>
                                </Select>
                            </FormControl>
                        </div>


                        {/*todo: profile img*/}
                        {/*todo: bio text section*/}


                        {/*SUBMIT button creates user id in authen and then pushes user inputs to users collection*/}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleUserAuthen}
                        >
                            Next
                        </Button>
            </Grid>
            <Grid item sm/>
        </Grid>
    );
}
export default withStyles(styles)(SignUpUser);
