// import React, { Component } from 'react';
// import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//main welcome page with login and link to signing in
// class new_user_page extends Component
// {
//     render() {
//         return (
//             <Grid container className={classes.form}>
//                 <Grid item sm />
//                 <Grid item sm> {/*middle of grids so centered*/}
//                     <img src={AppLogo} alt="logo" width='150px'/>
//
//                     <Typography variant="h2" className={classes.pageTitle}>
//                         New User
//                     </Typography>
//                     <form noValidate onSubmit={this.handleSubmit}>
//
//                         <TextField
//                             id="First Name"
//                             name="First Name"
//                             type="First Name"
//                             label="First Name"
//                             className={classes.textField}
//                             value={this.state.firstName}
//                             onChange={this.handleChange}
//                             fullWidth
//                         />
//                         <TextField
//                             id="Last Name"
//                             name="Last Name"
//                             type="Last Name"
//                             label="Last Name"
//                             className={classes.textField}
//                             value={this.state.lastName}
//                             onChange={this.handleChange}
//                             fullWidth
//                         />
//                         <TextField
//                             id="email"
//                             name="email"
//                             type="email"
//                             label="email"
//                             className={classes.textField}
//                             value={this.state.email}
//                             onChange={this.handleChange}
//                             fullWidth
//                         />
//                         <TextField
//                             id="password"
//                             name="password"
//                             type="password"
//                             label="password"
//                             className={classes.textField}
//                             value={this.state.password}
//                             onChange={this.handleChange}
//                             fullWidth
//                         />
//                         <TextField
//                             id="Confirm Password"
//                             name="Confirm Password"
//                             type="Confirm Password"
//                             label="Confirm Password"
//                             className={classes.textField}
//                             value={this.state.password}
//                             onChange={this.handleChange}
//                             fullWidth
//                         />
//                         <TextField
//                             id="username"
//                             name="username"
//                             type="username"
//                             label="username"
//                             className={classes.textField}
//                             value={this.state.username}
//                             onChange={this.handleChange}
//                             fullWidth
//                         />
//                         <Button
//                             type="submit"
//                             variant="contained"
//                             color="primary"
//                             className={classes.button}
//
//                         >
//                             Next
//                         </Button>
//
//                         <Button
//                             href="login"
//
//                         >
//                             Back
//                         </Button>
//
//                     </form>
//                 </Grid>
//                 <Grid item sm/>
//             </Grid>
//         );
//     }
// }