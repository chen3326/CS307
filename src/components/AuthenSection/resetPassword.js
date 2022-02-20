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
        margin: '30px auto 50px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        margin: '50px auto 10px auto'
    }
};

//privatized page that will be linked to email sent to user when they forgot their password
class ResetPassword extends Component
{
    constructor()
    {
        super();
        //todo:make username section
        this.state={
            passwordNew: '',
            passwordCon: '',
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
                            Reset Password
                        </Typography>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <div>
                                <TextField
                                    id="passwordNew"
                                    name="passwordNew"
                                    type="passwordNew"
                                    label="set password"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.passwordNew}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="passwordCon"
                                    name="passwordCon"
                                    type="passwordCon"
                                    label="repeat password"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.passwordCon}
                                    onChange={this.handleChange}
                                />
                            </div>


                            {/*LONGIN SUBMIT BUTTON todo: backend connection authen*/}
                            {/*automatically logs user into home*/}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                href={'home'}
                            >
                                Reset password
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
ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);