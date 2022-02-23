import React, { Component } from 'react';
import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';
import PropTypes from 'prop-types';
import {passwordChange} from "../../firebase";

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
            newPassword: "",
            confirmNewPassword: "",
            loading: false,
            errors: {}
        };
    }

    handleSubmit = (event) =>
    {
        event.preventDefault();
        this.setState({
            loading: true
        })
        if (this.state.newPassword === this.state.confirmNewPassword) {
            const newPassword = this.state.password;
            try {
                passwordChange(newPassword)
            } catch {
                alert("Error!")
            }
        }

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
                <Grid item sm>
                    <img src={AppLogo} alt="hammer" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Forgot Password
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id = "new password" name = "new password" type="new password" label="new password"
                                   className={classes.textField} value={this.state.newPassword}
                                   onChange={this.handleChange} fullWidth/>
                        <TextField id = "confirm new password" name = "confirm new password" type="confirm new password" label="confirm new password"
                                   className={classes.textField} value={this.state.confirmNewPassword}
                                   onChange={this.handleChange} fullWidth/>
                        <Button type="submit" variant = "contained" color="primary" className={classes.button}>
                            Confirm Changes
                        </Button>
                        <Button>Back</Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

//for functions
ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPassword);