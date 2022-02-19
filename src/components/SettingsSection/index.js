import * as React from 'react';
import {
    Box, Button, Container,
    Input, FilledInput, OutlinedInput, InputLabel, InputAdornment, Select,
    FormHelperText, FormControl, TextField, MenuItem, FormControlLabel, FormGroup
} from "@mui/material";
import Grid from '@mui/material/Grid';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import {
    SaveButton,
    SettingsContainer,
    ProfilePic, UserName, UserSettings,
} from './SettingsElements';

import pic from "../../images/cat_pic.jpg";
import {Switch} from "react-router-dom";

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

    const [year, setYear] = React.useState('');

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const [age, setAge] = React.useState('');

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    // const [values, setValues] = React.useState({
    //     password: '',
    //     showPassword: false,
    // });

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword,
    //     });
    // };
    //
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

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
                    <Grid
                        // LHS Column
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        item xs={4}
                    >
                        <ProfilePic src={pic}/>
                    </Grid>

                    <Grid
                        // RHS Column
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        item xs={8}
                    >
                        <Grid
                            // User Name
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            {/*TODO: Make this dynamically change based on if the user updates their name*/}
                            <UserName>Cat Dude</UserName>

                        </Grid>

                        <UserSettings>
                            <Grid
                                // Settings
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="flex-start"
                                spacing={2}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="center"
                                    item xs={2}
                                >
                                    <p>User Name:</p>
                                </Grid>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    item xs={10}
                                >
                                    {/*TODO: clean up the id's on this page*/}
                                    <TextField
                                        label="User Name"
                                        id="filled-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        variant="filled"
                                    />
                                </Grid>
                                <Grid container
                                    // Change Password Button container
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="center"
                                    item xs={2}
                                >
                                    <p>Password:</p>
                                    {/*<SaveButton>*/}
                                    {/*    <Button*/}
                                    {/*        container*/}
                                    {/*        direction="column"*/}
                                    {/*        justifyContent="center"*/}
                                    {/*        alignItems="center"*/}
                                    {/*        variant="outlined">Change Password*/}
                                    {/*    </Button>*/}
                                    {/*</SaveButton>*/}
                                </Grid>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    item xs={10}
                                >
                                    <SaveButton>
                                        <Button
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            variant="outlined">Change Password
                                        </Button>
                                    </SaveButton>
                                </Grid>

                                <Grid container
                                    // Change Password Button container
                                      direction="column"
                                      alignItems="flex-start"
                                      justifyContent="center"
                                      item xs={2}
                                >
                                    <p>Email:</p>

                                    {/*TODO: Fix this so that the email populated is the one in database*/}
                                    {/*TODO: email should be visible, but not clickable*/}
                                    {/*<TextField*/}
                                    {/*    label="Email Address"*/}
                                    {/*    id="filled-start-adornment"*/}
                                    {/*    sx={{ m: 1, width: '25ch' }}*/}
                                    {/*    variant="filled"*/}
                                    {/*/>*/}

                                    {/*<SaveButton>*/}
                                    {/*    <Button*/}
                                    {/*        container*/}
                                    {/*        direction="column"*/}
                                    {/*        justifyContent="center"*/}
                                    {/*        alignItems="center"*/}
                                    {/*        variant="outlined"*/}
                                    {/*        >Change Email*/}
                                    {/*    </Button>*/}
                                    {/*</SaveButton>*/}
                                </Grid>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    item xs={6}
                                >
                                    <TextField
                                        label="Email Address"
                                        id="filled-start-adornment"
                                        sx={{ m: 1, width: '25ch' }}
                                        variant="filled"
                                    />
                                </Grid>
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    item xs={4}
                                >
                                    <SaveButton>
                                        <Button
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            variant="outlined"
                                        >Change Email
                                        </Button>
                                    </SaveButton>
                                </Grid>


                                <Grid container
                                      direction="column"
                                      alignItems="flex-start"
                                      justifyContent="center"
                                      item xs={12}
                                >
                                    {/*TODO: Why tf is this broken? Fix...*/}
                                    {/*TODO: link this setting to the database*/}
                                    <p>Profile Privacy:</p>
                                    <FormGroup>
                                        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
                                        <FormControlLabel disabled control={<Switch />} label="Disabled" />
                                    </FormGroup>
                                </Grid>

                                <Grid container
                                      direction="column"
                                      alignItems="flex-start"
                                      justifyContent="center"
                                      item xs={4}
                                >

                                    {/*TODO: Make it so that this does not allow values below 0...*/}
                                    {/*TODO: Styling looks odd here*/}
                                    <p>Age:</p>
                                    <TextField
                                        id="filled-number"
                                        // label="Number"
                                        type="number"
                                        sx={{ m: 1, width: '25ch' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                    />
                                </Grid>

                                <Grid container
                                      direction="column"
                                      alignItems="flex-start"
                                      justifyContent="center"
                                      item xs={4}
                                >
                                    {/*TODO: Should probably be an auto-list though*/}
                                    <p>Major:</p>
                                    <TextField
                                        label="Major"
                                        id="filled-number"
                                        sx={{ m: 1, width: '25ch' }}
                                        variant="filled"
                                    />
                                </Grid>

                                <Grid container
                                      direction="column"
                                      alignItems="flex-start"
                                      justifyContent="center"
                                      item xs={4}
                                >
                                    {/*TODO: Should populate with database saved setting too.*/}
                                    {/*TODO: Styling looks odd. Selection is shrunk for some reason.*/}
                                    <p>Year:</p>

                                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="select-filled-label">Year</InputLabel>
                                        <Select
                                            labelId="select-filled-label"
                                            id="select-filled"
                                            value={year}
                                            onChange={handleYearChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {/*<MenuItem value={10}>Ten</MenuItem>*/}
                                            {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                                            {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                                            {years.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/*<Box*/}
                                    {/*    component="form"*/}
                                    {/*    sx={{*/}
                                    {/*        '& .MuiTextField-root': { m: 1, width: '25ch' },*/}
                                    {/*    }}*/}
                                    {/*    noValidate*/}
                                    {/*    autoComplete="off"*/}
                                    {/*>*/}
                                    {/*    <div>*/}
                                    {/*        <InputLabel id="demo-simple-select-filled-label">Year</InputLabel>*/}
                                    {/*        <TextField*/}
                                    {/*            id="filled-select-year"*/}
                                    {/*            select*/}
                                    {/*            // label="Year"*/}
                                    {/*            value={year}*/}
                                    {/*            onChange={handleYearChange}*/}
                                    {/*            variant="filled"*/}
                                    {/*        >*/}
                                    {/*            <MenuItem value="">*/}
                                    {/*                <em>None</em>*/}
                                    {/*            </MenuItem>*/}
                                    {/*            {years.map((option) => (*/}
                                    {/*                <MenuItem key={option.value} value={option.value}>*/}
                                    {/*                    {option.label}*/}
                                    {/*                </MenuItem>*/}
                                    {/*            ))}*/}
                                    {/*        </TextField>*/}
                                    {/*    </div>*/}
                                    {/*</Box>*/}
                                </Grid>

                                <Grid
                                    // Classes user is taking
                                    container
                                    direction="row"
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    item xs={4}
                                >
                                    <p>Classes:</p>
                                </Grid>

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

                            </Grid>
                        </UserSettings>

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
