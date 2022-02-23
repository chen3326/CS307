// import React, { Component } from 'react';
// import AppLogo from '../../images/Boiler Breakouts-logos.jpeg';
// import PropTypes from 'prop-types';
// import {passwordChange, useAuth} from "../../firebase";
//
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
//
// const styles = {
//     form: {
//         textAlign: 'center'
//     },
//     image: {
//         margin: '70px auto 20px auto',
//         maxWidth: '200px',
//         maxHeight: '200px'
//     },
//     pageTitle: {
//         margin: '10px auto 10px auto'
//     },
//     textField: {
//         margin: '10px auto 10px auto'
//     },
//     button: {
//         marginTop: '10px auto 10px auto'
//     }
// };
//
// export default function forgotPassword() {
//     const [loading, setLoading] = useState(false);
//     const currentUser = useAuth();
//     const emailRef = useRef();
//     const passwordRef = useRef();
//     const confirmPasswordRef = useRef();
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//
//     async function changePassword() {
//         if (passwordRef === confirmPasswordRef) {
//             await useAuth(currentUser)
//         }
//     }
//
//     return (
//     //     <Grid container className={classes.form}>
//     //         <Grid item sm />
//     //         <Grid item sm>
//     //             <img src={AppLogo} alt="hammer" className={classes.image}/>
//     //             <Typography variant="h2" className={classes.pageTitle}>
//     //                 Forgot Password
//     //             </Typography>
//     //             <form noValidate onSubmit={this.handleSubmit}>
//     //                 <TextField id = "newPassword" name = "newPassword" type="newPassword" label="newPassword"
//     //                            className={classes.textField} value={this.state.newPassword}
//     //                            onChange={this.handleChange} fullWidth/>
//     //                 <TextField id = "confirmNewPassword" name = "confirmNewPassword" type="confirmNewPassword" label="confirmNewPassword"
//     //                            className={classes.textField} value={this.state.confirmNewPassword}
//     //                            onChange={this.handleChange} fullWidth/>
//     //                 <Button type="submit" variant = "contained" color="primary" className={classes.button}>
//     //                     Confirm Changes
//     //                 </Button>
//     //                 <Button type="reset" variant='contained' color='secondary' className={classes.button} >Back</Button>
//     //             </form>
//     //         </Grid>
//     //         <Grid item sm />
//     //     </Grid>
//      )
// }