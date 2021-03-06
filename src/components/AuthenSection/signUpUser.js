//Sign up user creates a new account


//local files
import {auth, database, storage} from "../../firebase.js";
import {login, logout, signup, useAuth} from "../../firebase";
import AppLogo from '../../images/simpleLogo.png';

//MUX extentions
import {
    Typography, Button, Container, Box, FormControl, CssBaseline,
    FormControlLabel, Checkbox, Input, Paper
} from '@material-ui/core';
import {
    InputLabel, MenuItem, Select, Avatar, FormHelperText, TextField
} from '@mui/material';


import { orange, indigo } from '@mui/material/colors';
import HardwareIcon from '@mui/icons-material/Hardware';
import withStyles from '@material-ui/core/styles/withStyles';

import React, {useRef, useState, useEffect} from "react";

import {addDoc, setDoc, collection, doc, arrayUnion, arrayRemove, updateDoc,} from "firebase/firestore";
import Grid from "@mui/material/Grid";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import imageCompression from "browser-image-compression";
import {getAuth, updateProfile} from "firebase/auth";


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
    textField: {
        width: '90%', marginLeft: 'auto', marginRight: 'auto', color: 'white', paddingBottom: 0, marginTop: 0, fontWeight: 500,
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
    const [major, setMajor] = useState("");
    const [age, setAge] = useState(0)
    const [year, setYear] = useState("");
    const [bio, setBio] = useState("");
    //profile pic variables todo:default profile image
    const [profilePic, setProfilePic] = useState("https://firebasestorage.googleapis.com/v0/b/cs307-bdbca.appspot.com/o/files%2Fcat_pic.jpg?alt=media&token=86dc6a1d-f6a5-4f7e-be00-a25851f8e820");
    const [progress, setProgress] = useState(0);

    // Keep track of loggedIn status
    // const [userOnline, setUserOnline] = useState(false);

    //add user to database in ./users
    const createUser = async () => {
        //adds all user input into collection
        //password not passed into collection for security/privacy
        //automatically public user
        await setDoc(doc(database,"users",getAuth().currentUser.uid),{
            id: auth.currentUser.uid,
            email: email,
            loggedIn: true,
            author: {
                nickName: nickName,
                age: age,
                major: major,
                year: year,
                bio: bio,
                profilePic: profilePic,
                privateUser: false,
                darkTheme: false,
            },
            following:arrayUnion(),
            followingTopics:arrayUnion(),
            blockingUsers:arrayUnion(),
            blockingTopics:arrayUnion(),
            savedPosts: arrayUnion(),
            likedPosts:arrayUnion(),
            commentedPosts: arrayUnion(),
        });

        //set up current user variables for faster pull when creating posts
        await updateProfile(auth.currentUser, {
            displayName: nickName, photoURL: profilePic
        });

        window.location.pathname = "/email_verification"; //redirects now logged in user to email verification page
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

                    //topics window not working for now, put all on one page    Topics(email, nickName, age, major, year);
                    //set automatic profile pic as cat.jpeg
                    if (profilePic === ""){
                        setProfilePic('https://firebasestorage.googleapis.com/v0/b/cs307-bdbca.appspot.com/o/files%2Fcat_pic.jpg?alt=media&token=86dc6a1d-f6a5-4f7e-be00-a25851f8e820');
                    }
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

    const uploadFiles = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);

            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProfilePic(downloadURL);
                });
            }
        );
    };

    async function doUpload(event) {
        console.log("hello world");
        const inputFile = event.target.files[0];

        const maxSet = {
            useWebWorker: true
        }
        try {
            const afterCompressedFile = await imageCompression(inputFile, maxSet);
            await uploadFiles(afterCompressedFile);

        } catch (error) {
            console.log(error);
        }

    }

    //DISPLAY PAGE
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid container className={"form"}>
                    <Box
                        display="flex"
                        width={500} height={100}
                    >
                        <Box m="auto">
                            <Avatar sx={{width: 50, height: 60}} variant="square" src={AppLogo}/>
                        </Box>
                    </Box>

                    <Typography component="h1" variant="h4" align="center">
                        Create a new Boiler Breakers Account
                    </Typography>

                    {/*form for all user inputs*/}
                    <div> {/*essencial infor for authen*/}
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
                                <Typography variant={"caption"} display="inline">
                                    1. Minimum 6 characters
                                </Typography>
                                <Typography variant={"caption"} display="inline">
                                    2. At least 1 upper case English letter
                                </Typography>
                                <Typography variant={"caption"} display="inline">
                                    3. At least 1 lower case English letter
                                </Typography>
                                <Typography variant={"caption"} display="inline">
                                    4. At least 1 letter
                                </Typography>
                                <Typography variant={"caption"} display="inline">
                                    5. At least 1 special character (!,@,#,$,%,&,)");
                                </Typography>
                        </FormControl>
                    </div>

                    <div>{/*personal info*/}
                        {/*profile picture image*/}
                        <FormControl margin="normal" fullWidth>
                            <Typography variant={"h6"} >
                                Profile Info:
                            </Typography>
                            <Typography id="modal-modal-title" variant="subtitle1" component="subtitle1">
                                Let us know more about you!
                            </Typography>

                            <FormControl margin="normal" fullWidth>
                                <form onChange={event => doUpload(event)}>
                                    <input type="file" className="input" />

                                </form>
                                <hr />
                                <h4>Profile Picture Uploading {progress}% Done</h4>
                            </FormControl>

                            {/*Nickname*/}
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Nickname*"
                                className={"textField"}
                                inputProps={{ maxLength: 50 }}
                                onChange={(event) => {
                                    setnickName(event.target.value);
                                }}
                            />
                        </FormControl>

                        {/*bio*/}
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="outlined-multiline-static"
                                label="Bio"
                                multiline
                                rows={5}
                                inputProps={{ maxLength: 200 }}
                                onChange={(event) => {
                                    setBio(event.target.value);
                                }}
                            />
                        </FormControl>

                        {/*Major*/}
                        <FormControl margin="normal" fullWidth>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Major*"
                                className={"textField"}
                                inputProps={{ maxLength: 100 }}
                                onChange={(event) => {
                                    setMajor(event.target.value);
                                }}
                            />
                        </FormControl>

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
                                <InputLabel id="demo-controlled-open-select-label">Year*</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={year}
                                    label="Year*"
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
                    </div>

                    {/*SUBMIT button creates user id in authen and then pushes user inputs to users collection*/}
                    <FormControl margin="normal" fullWidth>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"

                            onClick={handleUserAuthen}
                        >
                            Next
                        </Button>
                    </FormControl>
                </Grid>


            </Box>
        </Container>
    );
}
export default withStyles(styles)(SignUpUser);
