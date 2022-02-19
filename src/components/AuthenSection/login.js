import React, { Component } from 'react';
import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';
import PropTypes from 'prop-types';

//MUX extentions
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: '10px auto 10px auto'
    }
};

class Login extends Component
{
    constructor()
    {
        super();
        //todo:make username section
        this.state={
            email: '',
            password: '',
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
                    {/**todo:resize logo*/}
                    <img src={AppLogo} alt="logo" width='150px'/>

                    <Typography variant="h2" className={classes.pageTitle}>
                        LOGIN
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>

                        {/*LONGIN TXT FIELDS*/}
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />

                        {/*LONGIN BUTTON*/}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}

                        >
                            Login
                        </Button>

                        {/*GUEST BUTTON*/}
                        <Button
                            href="home"
                        >
                            continue as guest
                        </Button>

                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

//for functions
Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);