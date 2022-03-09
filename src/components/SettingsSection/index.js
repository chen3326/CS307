import * as React from 'react';
import {
    Button, Container, Switch,
    InputLabel, Select,
    FormControl, TextField, MenuItem, FormControlLabel, FormGroup
} from "@mui/material";
import Grid from '@mui/material/Grid';

import {
    SaveButton,
    SettingsContainer,
    ProfilePic, UserName, UserSettings,
} from './SettingsElements';

import pic from "../../images/cat_pic.jpg";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {addDoc, collection, getDocs, updateDoc} from "firebase/firestore";
import {auth, database} from "../../firebase";
import {useState} from "react";
//import {useLocation} from "react-router-dom";

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
    const min = 1;

    //const { state } = useLocation();
    const privateCollectionRef = collection(database, "users");

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
    const [privateUser, setPrivateUser] = React.useState(false);




    const handlePrivateUser = async () => {
        setPrivateUser(!privateUser);

        //await updateDoc(privateCollectionRef, {
        //   privateStatus: privateUser
        //});


    };
    const handlePublicUser = async () => {
        setPrivateUser(!privateUser);

        //await updateDoc(privateCollectionRef, {
        //    privateStatus: privateUser
        //});


    };


    async function handleFPClick() {
        window.location = "/forgot_password";
    }

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
                                        {/*TODO: link this setting to the database*/}
                                        <FormGroup>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography>Public</Typography>
                                                <FormControlLabel control={<Switch checked={privateUser} onChange={handlePrivateUser}/>} label="" />
                                                <Typography>Private</Typography>
                                            </Stack>
                                        </FormGroup>
                                    </Grid>
                                </Grid>

                                {/*username*/}
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
                                            variant="filled"
                                            inputProps={{ maxLength: 25 }}
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
                                            disabled
                                            id="filled-disabled"
                                            sx={{ m: 1, width: '25ch' }}
                                            variant="filled"
                                            inputProps={{ maxLength: 25 }}
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
                                            id="outlined-multiline-static"
                                            label="Bio"
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
                                        variant="outlined">Save Settings</Button>
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

/** old classes section
<Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="flex-start"
    spacing={2}
>
    <Grid
        // Classes: LHS Column
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        item xs={6}
    >
        <TextField
            label="Class 1"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
        />
        <TextField
            label="Class 2"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
        />
        <TextField
            label="Class 3"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
        />

    </Grid>

    <Grid
        // Classes: RHS Column
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        item xs={6}
    >

        <TextField
            label="Class 4"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
        />
        <TextField
            label="Class 5"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
        />
        <TextField
            label="Class 6"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
        />
    </Grid>
</Grid>
*/
