import * as React from 'react';
import {Button, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from '@material-ui/core/Grid';

import AppLogo from "../../images/Boiler Breakouts-logos.jpeg";

//linked to login page when user wants to reset password
//after putting their email, they'll be taken to a private page to reset their password and then log in
//todo: https://support.google.com/firebase/answer/7000714?authuser=0
function forgotPassword() {

    return (
        <Grid container >
            <div>
                {/**todo:get smaller logo*/}
                <img src={AppLogo} alt="logo" width='150px'/>

                <Typography variant="h2">
                    Forgot your password?
                </Typography>
                <Typography variant="h4">
                    We’ll email you a link to help you reset your password.
                </Typography>

            </div>
            <div>
                <TextField
                    label="User Name"
                    id="filled-start-adornment"
                    sx={{ m: 1, width: '25ch' }}
                    variant="filled"
                />
            </div>
            <div>
                {/*send user reset password */}
                {/*RESET PASSWORD BUTTON*/}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    reset password
                </Button>
            </div>
        </Grid>
    );
}

export default forgotPassword;
