import {Container} from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import buttonInner from "@mui/material/Button";
import {login, logout, signup, useAuth} from "../../firebase";
import React, {useRef, useState} from "react";

const styles = {
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

export default function forgotPassword() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function changePassword() {
        if (passwordRef === confirmPasswordRef) {
            await useAuth(currentUser)
        }
    }

    return (
        <Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles}>
                    <div id="fields">
                        <input ref={passwordRef} type= "password" placeholder="Password"/>
                        <input ref={confirmPasswordRef} placeholder=" Confirm Password"/>
                    </div>
                    <Stack  spacing={2} direction="row">
                        <label>
                            <buttonInner onClick={changePassword} style={{color:'#0D67B5'}}>SUBMIT</buttonInner>
                        </label>
                        <label>
                            <buttonInner onClick={handleClose} style={{color:'red'}}> CLOSE </buttonInner>
                        </label>
                    </Stack>
                </Box>
            </Modal>
        </Container>
    )
}