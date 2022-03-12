import * as React from 'react';
import {
    Button, Container, Switch,
    InputLabel, Select,
    FormControl, TextField, MenuItem, FormControlLabel, FormGroup
} from "@mui/material";
import Grid from '@mui/material/Grid';

import pic from "../../images/cat_pic.jpg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

//react and firebase
import {addDoc, collection, doc, where, query, setDoc, getDocs, updateDoc} from "firebase/firestore";
import {auth, database} from "../../firebase";
import {useState} from "react";
import {useLocation} from "react-router-dom";


//local
import {
    SaveButton,
    SettingsContainer,
    ProfilePic, UserName, UserSettings,
} from './SettingsElements';

const years = [
    {
        value: 'freshman',
        label: 'Freshman',
    },
    {
        value: 'sophomore',
        label: 'Sophomore',
    },
    {
        value: 'junior',
        label: 'Junior',
    },
    {
        value: 'senior',
        label: 'Senior',
    },
    {
        value: 'superSenior',
        label: 'Super Senior',
    },
];

function SettingsSection() {

    const { state } = useLocation(); //contains current user's email
    const min = 1; //minimum for age input

    const [loading, setLoading] = useState(false);
    const userCollectionRef = collection(database, "users"); //collections in firebase keep the data tied to the user
    //https://firebase.google.com/docs/firestore/data-model
    //variables to keep user's input
    const uEmail = auth.currentUser.email;
    console.log(uEmail);
    var uName, uMajor, uAge, uYear, uBio;
    getUser(); //get user's og inputs
    const [nickName, setnickName] = useState(uName);
    const [email, setEmail] = useState(uEmail);
    const [major, setMajor] = useState(uMajor);
    const [age, setAge] = useState(uAge)
    const [year, setYear] = useState("");
    const [bio, setBio] = useState(uBio);
    const [privateUser, setPrivateUser] = React.useState(false);


    //testing out getting firebase
    //db.collection("users").doc(doc.id).update({author: {age: 10}});

    //todo: for somereason, changes only happen when inputs are first changed
    console.log("START OF FUNCTION___________________________________________________________________________________");
    async function getUser(){
        const q = query(userCollectionRef, where("email", "==", uEmail));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            /*
            uName = doc.data().author.nickName;
            console.log(uName);

            uMajor = doc.data().author.major;
            uAge = doc.data().author.age;
            //uYear = doc.data().author.year;
            uBio = doc.data().author.bio;
            */
            setnickName(doc.data().author.nickName);
            setBio(doc.data().author.bio);
            setAge(doc.data().author.age);
            setYear(doc.data().author.year);
            setMajor(doc.data().author.major);
            console.log("End of loop!!!------------");
        });
        //get user's users doc and display original inputs



    };







    //add user to database in ./users
    const EditUser = async () => {
        //adds all user input into collection
        await addDoc(userCollectionRef, {
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
                            <UserName>Settings: Cat Dude</UserName>

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
                                            sx={{ m: 1, width: '25ch' }}
                                            value={nickName}
                                            variant="filled"
                                            inputProps={{ maxLength: 50 }}
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
                                            sx={{ m: 1, width: '25ch' }}
                                            variant="filled"
                                            value={email}
                                            inputProps={{ maxLength: 50 }}
                                            onChange={(event) => {
                                                setEmail(event.target.value);
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
                                            sx={{ m: 1, width: '50ch' }}
                                            variant="filled"
                                            value={bio}
                                            multiline
                                            rows={5}
                                            inputProps={{ maxLength: 200 }}
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
                                            sx={{ m: 1, width: '15ch' }}
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
                                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
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
                                            sx={{ m: 1, width: '50ch' }}
                                            variant="filled"
                                            value={major}
                                            inputProps={{ maxLength: 100 }}
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
