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
    collection,
    doc,
    where,
    query,
    setDoc,
    onSnapshot,
} from "firebase/firestore";
import {useAuth, database, storage, auth} from "../../firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {getAuth, onAuthStateChanged, updateEmail} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {useState} from "react";


//local
import {
    SaveButton,
    SettingsContainer,
    ProfilePic, UserName, UserSettings,
} from './SettingsElements';
import imageCompression from "browser-image-compression";
//import PulseLoader from "react-spinners/PulseLoader";



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


//function SettingsSection(userRef, email, uName, uYear, uAge, uBio, uMajor) {
function SettingsSection() {
    //https://firebase.google.com/docs/firestore/data-model
    //variables to keep user's input
    const [ogEmail, setOgEmail] = useState("");
    const [ogName, setOgName] = useState("");
    const [email, setEmail] = useState(""); //email for user auth
    const [nickName, setnickName] = useState("");
    const [major, setMajor] = useState("");
    const [age, setAge] = useState(0)
    const [year, setYear] = useState(0);
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [progress, setProgress] = useState(0);
    const [privateUser, setPrivateUser] = React.useState(false);

    const [queried, setQueried] = useState(false); //lock
    const min = 1; //minimum for age input
    const [loading, setLoading] = useState(false);
    let [loadColor, setLoadColor] = useState("#F5A623");



    //get user's profile doc and set text boxes with data
    //based on  https://github.com/firebase/snippets-web/blob/1c4c6834f310bf53a98b3fa3c2e2191396cacd69/snippets/firestore-next/test-firestore/listen_document_local.js#L8-L13
    async function getUser(){
        //compare email to other users in collection
        const q = query(collection(database, "users"), where("email", "==", email));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                //set all the user's settings
                setOgName(doc.data().author.nickName);
                setnickName(doc.data().author.nickName);
                setBio(doc.data().author.bio);
                setAge(doc.data().author.age);
                setMajor(doc.data().author.major)
                setYear(doc.data().author.year);
                setProfilePic(doc.data().author.profilePic);
                setPrivateUser(doc.data().author.privateUser);
            });
        });
    }

    //add user to database in ./users
    const editUser = async () => {
        //set doc overwrites the original doc,thus updating it
        await setDoc(doc(database,"users",getAuth().currentUser.uid),{
            id: auth.currentUser.uid,
            email: email,
            author: {
                nickName: nickName,
                age: age,
                major: major,
                year: year,
                bio: bio,
                profilePic:profilePic,
                privateUser: privateUser,
            },
        });
        window.location.pathname = "/profile"; //redirects now logged-in user to homepage
    };

    //firebase will error if unsuccessful inputs ie. email is already taken or isn't an email
    async function handleUserSettings() {
        setLoading(true);
        try {
            //valid email checks
            if (email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                if (ogEmail !== email){
                    console.log("Updating Email...");
                    await updateEmail(auth.currentUser, email); //change email authen if needed
                    console.log("Email updated!");
                }
                setLoading(false);
                editUser();
            } else {
                alert("Please enter a Valid Email!")
            }
        } catch {
            alert("Error.");
        }
        setLoading(false);
    }

    //change privateUser var
    const handlePrivateUser = async () => {
        setPrivateUser(!privateUser);
    };

    //forgot password, moves to forgot password page
    async function handleFPClick() {
        window.location = "/forgot_password";
    }

    //upload new user's profile pic
    const uploadFiles = (file) => {
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

    //compress image file
    async function doUpload(event) {
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

    //creates loading page and controls display
    const [user, buffering, error] = useAuthState(auth);
    if (buffering) {
        return (
            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                Loading...
            </h1>
        );
    } else if (user) {
        //get current user's email and settings data
        if (user.email === "anonymous@unkown.com"){ //anon cant user settings
            window.location.pathname = "/";
        }
        onAuthStateChanged(auth, (user) => {
            if (user&&!queried) {
                setEmail(user.email); //sets user's email to email
                setOgEmail(user.email); //for comparison later
                getUser(); //set other user var
                setQueried(true); //stops overwriting var from firebase backend
            }
        });

        //DISPLAY
         if (ogName === ""){
            return (
                <h1 style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    Loading...
                </h1>
            );
        } else {
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
                            <ProfilePic src={profilePic}/>
                            <FormControl margin="normal" >
                                <form onChange={event => doUpload(event)}>
                                    <input type="file" className="input" />
                                </form>
                                <hr />
                                <h4>Profile Picture Loading... {progress}%</h4>
                            </FormControl>
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
                                <UserName>Settings:</UserName>
                                <UserName>{ogName}</UserName>
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
                                                                value={privateUser}
                                                                onChange={handlePrivateUser}
                                                        />
                                                    }
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
                                            <TextField
                                                id="filled-start-adornment"
                                                sx={{m: 1, width: '25ch'}}
                                                variant="filled"
                                                value={email}
                                                inputProps={{maxLength: 50}}
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
    } else if (error) {
        alert("There was an authentication error.")
        window.location.pathname = "/"
        //return <div>There was an authentication error.</div>;
    } else {
        window.location.pathname = "/"
    }

}

export default SettingsSection;