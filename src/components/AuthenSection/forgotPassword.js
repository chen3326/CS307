import React, { Component } from 'react';
import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';
import PropTypes from 'prop-types';

//MUX extentions
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import {Link} from "react-router-dom";

//main welcome page with login and link to signing in
//stying margins for ux
const styles =  {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '70px auto 20px auto'
    },
    pageTitle: {
        margin: '30px auto 10px auto'
    },
    textField: {
        margin: '50px auto 10px auto'
    },
    button: {
        margin: '50px auto 10px auto'
    }
};

//privatized page that will be linked to email sent to user when they forgot their password
class ForgotPassword extends Component
{
    constructor()
    {
        super();
        //todo:make username section
        this.state={
            email: '',
            loading: false,
            errors: {}
        };
    }

    handleSubmit = (event) =>
    {
        console.log('hi');
    };
    handleChange = (event) =>
    {
        this.setState({[event.target.name]: event.target.value});
    };

    //actual loading of screen
    render()
    {
        const { classes } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm> {/*middle of grids so centered*/}

                    {/**todo:get smaller logo*/}
                    <img src={AppLogo} alt="logo" width='150px'/>
                    <Paper elevation={3}
                           style={{
                               padding: 10
                           }}
                    >
                        <Typography variant="h3" className={classes.pageTitle}>
                            Forgot your password?
                        </Typography>
                        <Typography variant="caption" className={classes.pageTitle}>
                            We’ll email you a link to help you reset your password.
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <div>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.passwordNew}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                {/*LONGIN SUBMIT BUTTON todo: backend connection authen*/}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Reset Password
                                </Button>
                            </div>

                            {/*todo:link signin page*/}
                            {/*RESET PASSWORD BUTTON*/}
                            <Button
                                href="forgot_password"
                            >
                                Log in
                            </Button>

                            {/*GUEST BUTTON*/}
                            <Button
                                href="home"
                            >
                                continue as guest
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

//for functions
ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPassword);