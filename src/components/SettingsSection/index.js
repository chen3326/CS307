import * as React from 'react';
import {
    AppBar, Box, Button, Container, useTheme,
    IconButton, Input, FilledInput, OutlinedInput, InputLabel, InputAdornment,
    FormHelperText, FormControl, TextField, MenuItem, FormControlLabel, FormGroup
} from "@mui/material";
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
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

    const [year, setYear] = React.useState('freshman');

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setYear(event.target.value);
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                            <UserName>Cat Dude</UserName>

                        </Grid>


                        <UserSettings>
                            <Grid
                                // Settings
                                container
                                direction="column"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                                spacing={2}
                            >
                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    item xs={4}
                                >
                                    <p>User Name:</p>

                                    {/*<FormControl fullWidth sx={{ m: 1 }}>*/}
                                    {/*    <InputLabel htmlFor="outlined-adornment-amount">User Name</InputLabel>*/}
                                    {/*    <OutlinedInput*/}
                                    {/*        id="outlined-adornment-amount"*/}
                                    {/*        value={values.amount}*/}
                                    {/*        onChange={handleChange('amount')}*/}
                                    {/*        startAdornment={<InputAdornment position="start">$</InputAdornment>}*/}
                                    {/*        label="Amount"*/}
                                    {/*    />*/}
                                    {/*</FormControl>*/}

                                    <TextField
                                        label="User Name"
                                        id="filled-start-adornment"
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
                                    <p>Password:</p>

                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                        <FilledInput
                                            id="filled-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid container
                                      direction="column"
                                      alignItems="flex-start"
                                      justifyContent="center"
                                      item xs={4}
                                >
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
                                    <p>Major:</p>
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
                                    <p>Year:</p>

                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
                                            <TextField
                                                id="filled-select-currency"
                                                select
                                                label="Select"
                                                value={year}
                                                onChange={handleChange}
                                                // helperText="Please select your currency"
                                                variant="filled"
                                            >
                                                {years.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </Box>
                                </Grid>

                                <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                    justifyContent="flex-start"
                                    item xs={4}
                                >
                                    <p>Classes:</p>
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
