import CreatePostIcon from '@mui/icons-material/Create';
import { Container, Button, Link } from 'react-floating-action-button'
import buttoninner from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firebase.js";
import Box from '@mui/material/Box';
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
    border: '2px solid darkblue',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

function Post(){
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const postsCollectionRef = collection(database, "posts");
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    return (
        <Container styles={{color: 'darkblue', marginRight: '-60px', marginBottom: '-15px'}}>
            {/*Make a Post Here*/}
            <Button
                tooltip="Click to make a new post"
                styles={{backgroundColor: 'darkblue' , color : 'white', width: '73px', height: '73px'}}
                onClick={handleOpen}//() => window.location.pathname = "/makePost" }
            >
                <CreatePostIcon fontSize='large'/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create A Post
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                    </Typography>
                    <Stack  spacing={2} direction="row" >
                        <buttoninner onClick={createPost} variant='contained' style={{marginLeft:'68%', width:'300px', marginBottom:'5px', color:'#0D67B5'}}>Submit</buttoninner>
                        <buttoninner onClick={closePost} variant='outlined' style={{background: "white",color:'red', marginRight:'5%', marginBottom:'5px'}}> Close </buttoninner>
                    </Stack>
                </Box>
            </Modal>
        </Container>

    );
}

export default Post;