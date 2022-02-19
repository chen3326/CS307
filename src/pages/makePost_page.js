/*

import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../firebase.js";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postsCollectionRef = collection(database, "posts");


    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            postText,

        });

        window.location.pathname = "/home";

    };
    const closePost = async () => {

        window.location.pathname = "/home";

    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
        /*
        <div className="createPostPage" style={{textAlign: 'center', background: '#DCEEFC', width:'60%' , marginLeft:'20%', marginTop:'10%'
        , borderRadius:'9px', justifyContent:'center'}}>

            <div className="cpContainer">
                <h1 style={{fontSize: '30px'}}>Create A Post</h1>

                <div className="inputGp">
                    <label> Title:</label>
                    <input
                        placeholder="Title..."
                        width=""
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                    />
                </div>

                <div className="inputGp">
                    <label> Post:</label>
                    <textarea
                        placeholder="Post..."
                        onChange={(event) => {
                            setPostText(event.target.value);
                        }}
                    />
                </div>
                <Stack  spacing={2} direction="row" >
                    <Button onClick={createPost} variant='contained' style={{marginLeft:'68%', width:'300px', marginBottom:'15px'}}> Submit Post</Button>
                    <Button onClick={closePost} variant='outlined' style={{background: "white",color:'red', marginRight:'5%', marginBottom:'15px'}}> Close </Button>
                </Stack>
            </div>
        </div>

    );
}

export default CreatePost;

*/
