import * as React from 'react';
import {
    Button, Container, Switch,
    InputLabel, Select,
    FormControl, TextField, MenuItem, FormControlLabel, FormGroup
} from "@mui/material";
import Grid from '@mui/material/Grid';

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//react and firebase
import {
    addDoc,
    collection,
    doc,
    where,
    query,
    setDoc,
    getDocs,
    updateDoc,
    onSnapshot,
    orderBy
} from "firebase/firestore";
import {auth, useAuth, database} from "../../firebase";
import {useEffect, useState} from "react";

//local
import {
    SaveButton,
    SettingsContainer,
    ProfilePic, UserName, UserSettings,
} from './SettingsElements';
import pic from "../../images/cat_pic.jpg";
import {getAuth, onAuthStateChanged} from "firebase/auth";

//years class
const years = [
    {
        value: 'Freshman',
        label: 'Freshman',
    },
    {
        value: 'Sophomore',
        label: 'Sophomore',
    },
    {
        value: 'Junior',
        label: 'Junior',
    },
    {
        value: 'Senior',
        label: 'Senior',
    },
    {
        value: 'Super Senior',
        label: 'Super Senior',
    },
];

//function SettingsSection(userRef, uEmail, uName, uYear, uAge, uBio, uMajor) {
function SettingsSection() {

    //the page reloads everytime TT a change is made in the input box
    const auth = getAuth();
    const [uemail, setUemail] = useState("");
    const [email, setEmail] = useState("");
    const [queried, setQueried] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user&&!queried) {
            setUemail(user.email);
            setQueried(true);


        } else {

        }
    });

    const uEmail = "matcha@mm.com";//gets current user's email
    const pid = "OSdsNaiKBvlK7BluSo7E";
    const uName = "matcha";
    const uYear = "Junior";
    const uAge = 20;
    const uBio = "I love matcha<3";
    const uMajor = "drinks";


    const min = 1; //minimum for age input
    const [loading, setLoading] = useState(false);
    const userCollectionRef = collection(database, "users"); //collections in firebase keep the data tied to the user

    //https://firebase.google.com/docs/firestore/data-model
    //variables to keep user's input
    const [nickName, setnickName] = useState(uName);

    const [major, setMajor] = useState(uMajor);
    const [age, setAge] = useState(uAge)
    const [year, setYear] = useState(uYear);
    const [bio, setBio] = useState(uBio);
    const [privateUser, setPrivateUser] = React.useState(false);


    //add user to database in ./users
    const EditUser = async () => {
        //adds all user input into collection
        //matcha doc id = OSdsNaiKBvlK7BluSo7E

        //set doc overwrites the original doc,thus updating it

        await setDoc(doc(database, "users", pid), {
            id: auth.currentUser.uid,
            email: email,
            author: {
                nickName: nickName,
                age: age,
                major: major,
                year: year,
                bio: bio,
                privateUser: privateUser,
            },
        });

        window.location.pathname = "/profile"; //redirects now logged in user to homepage
    };

    //edit user doc in database authentication, but don't push to collections
    //firebase will error if unsuccessful inputs ie. email is already taken or isn't an email
    async function handleUserSettings() {
        setLoading(true);
        try {
            //valid email checks
            if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                //await signup(email, password);
                setLoading(false);

                EditUser(); //todo: for now just create new user to send data
            } else {
                alert("Please enter a Valid Email!")
            }
            //push inputs to ./users collection
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    const handlePrivateUser = async () => {
        setPrivateUser(!privateUser);
        //await updateDoc(privateCollectionRef, {
        //   privateStatus: privateUser
        //});
    };

    //forgot password, moves to forgot password page
    async function handleFPClick() {
        window.location = "/forgot_password";
    }

    //DISPLAY
    return (
        <SettingsContainer>
            <Container fixed>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={2}
                >
                    {/*LEFT COLUMN*/}
                    <Grid
                        //profile picture here
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        item xs={4}
                    >
                        <ProfilePic src={pic}/>
                    </Grid>


                    {/*RIGHT COLUMN*/}
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        item xs={8}
                    >
                        <Grid
                            //Display name
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            {/*TODO: Make this dynamically change based on if the user updates their name*/}
                            <UserName>Settings:</UserName>
                            <UserName>{uemail}</UserName>
                        </Grid>

                        {/*SETTINGS*/}
                        <UserSettings>
                            <Grid
                                //Settings section
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-start"
                                spacing={2}
                            >
                                {/*privacy settings */}
                                <Grid container
                                      wrap="nowrap"
                                      spacing={2}
                                      justifyContent="center"
                                      item xs={10}
                                >
                                    <Grid item xs>
                                        <FormGroup>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography>Public</Typography>
                                                <FormControlLabel control={
                                                    <Switch checked={privateUser}
                                                            onChange={handlePrivateUser}
                                                    />}
                                                                  label=""
                                                />
                                                <Typography>Private</Typography>
                                            </Stack>
                                        </FormGroup>
                                    </Grid>
                                </Grid>

                                {/*name*/}
                                <Grid container
                                      wrap="nowrap"
                                      spacing={2}
                                      justifyContent="center"
                                      item xs={10}
                                >
                                    <Grid item>
                                        <p>Name:</p>
                                    </Grid>
                                    <Grid item xs>
                                        {/*TODO: clean up the id's on this page*/}
                                        <TextField
                                            id="filled-start-adornment"
                                            sx={{m: 1, width: '25ch'}}
                                            value={nickName}
                                            variant="filled"
                                            inputProps={{maxLength: 50}}
                                            onChange={(event) => {
                                                setnickName(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/*email*/}
                                <Grid container
                                      wrap="nowrap"
                                      spacing={2}
                                      justifyContent="center"
                                      item xs={10}
                                >
                                    <Grid item>
                                        <p>Email:</p>
                                    </Grid>
                                    <Grid item xs>
                                        {/*TODO: change user's authem if viable*/}
                                        {/*TODO: take email check error from signin*/}
                                        <TextField
                                            id="filled-start-adornment"
                                            sx={{m: 1, width: '25ch'}}
                                            variant="filled"
                                            value={uemail}
                                            inputProps={{maxLength: 50}}
                                            onChange={(event) => {
                                                setUemail(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                </Grid>


                                {/*change password*/}
                                <Grid container
                                      wrap="nowrap"
                                      spacing={2}
                                      justifyContent="center"
                                      item xs={10}
                                >
                                    <Grid item>
                                        <p>Password:</p>
                                    </Grid>
                                    <Grid item xs>
                                        <SaveButton>
                                            <Button
                                                container
                                                direction="column"
                                                justifyContent="center"
                                                alignItems="center"
                                                variant="outlined"
                                                onClick={handleFPClick}
                                            >Change Password
                                            </Button>
                                        </SaveButton>
                                    </Grid>
                                </Grid>

                                {/*bio*/}
                                <Grid container
                                      wrap="nowrap"
                                      spacing={2}
                                      justifyContent="center"
                                      item xs={10}
                                >
                                    <Grid item>
                                        <p>Bio:</p>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="filled-start-adornment"
                                            sx={{m: 1, width: '50ch'}}
                                            variant="filled"
                                            value={bio}
                                            multiline
                                            rows={5}
                                            inputProps={{maxLength: 200}}
                                            onChange={(event) => {
                                                setBio(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                {/*Age*/}
                                <Grid container
                                      wrap="nowrap"
                                      spacing={2}
                                      justifyContent="center"
                                      item xs={4}
                                >
                                    <Grid item>
                                        <p>Age:</p>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="filled-number"
                                            sx={{m: 1, width: '15ch'}}
                                            //make sure that only unsigned int can be used as inputs
                                            type={"number"}
                                            inputProps={{min}} //min age
                                            value={age}
                                            onChange={(event) => {
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
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>

                                {/*Year*/}
                                <Grid container
                                      wrap="nowrap"
                                      spacing={2}
                                      justifyContent="center"
                                      item xs={4}
                                >
                                    <Grid item>
                                        <p>Year:</p>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
                                            <InputLabel id="select-filled-label"></InputLabel>
                                            <Select
                                                labelId="select-filled-label"
                                                id="select-filled"
                                                value={year}
                                                onChange={(event) => {
                                                    setYear(event.target.value);
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {years.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                {/*Major*/}
                                <Grid container
                                      wrap="nowrap"
                                      spacing={2}
                                      justifyContent="center"
                                      item xs={10}
                                >
                                    <Grid item>
                                        <p>Major:</p>
                                    </Grid>
                                    <Grid item xs>
                                        <TextField
                                            id="filled-number"
                                            sx={{m: 1, width: '50ch'}}
                                            variant="filled"
                                            value={major}
                                            inputProps={{maxLength: 100}}
                                            onChange={(event) => {
                                                setMajor(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                            </Grid>
                        </UserSettings>

                        {/*Submit button*/}
                        <Grid
                            // Save Settings Button
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid
                                // Follow Button container
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                            >
                                <SaveButton>
                                    <Button
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        variant="contained"
                                        onClick={handleUserSettings}
                                    >
                                        Save Settings
                                    </Button>
                                </SaveButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </SettingsContainer>
    );
}

export default SettingsSection;
