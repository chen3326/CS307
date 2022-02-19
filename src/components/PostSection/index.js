import CreatePostIcon from '@mui/icons-material/Create';
import { Container, Button, Link } from 'react-floating-action-button'
import buttonInner from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
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
    width: 530,
    bgcolor: 'background.paper',
    border: '2px solid darkblue',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    variant: 'contained',
};

const Input = styled('input')({
    display: 'none',//"display-true",
});

function Post(){
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");
    

    const postsCollectionRef = collection(database, "posts");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title:title,
            postText:postText,

        });

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
                        <label> Title:</label>
                        <div className="inputGp">

                            <input
                                style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                placeholder="Title..."
                                width=""
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}

                            />
                        </div>

                        <label> Post:</label>
                        <div className="inputGp" >

                            <textarea
                                style={{width:'450px', height:'300px', marginTop:'5px', marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                placeholder="Post..."
                                onChange={(event) => {
                                    setPostText(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>
                    <Stack  spacing={3} direction="row" alignItems='center'>

                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" />
                            <buttonInner varient='contained' style={{color: 'purple'}} component='span'>Add Photos</buttonInner>
                        </label>
                        <label>
                            <buttonInner onClick={createPost} style={{color:'#0D67B5'}}>SUBMIT</buttonInner>
                        </label>
                        <label>
                            <buttonInner onClick={handleClose} style={{color:'red'}}> CLOSE </buttonInner>
                        </label>



                    </Stack>
                </Box>
            </Modal>
        </Container>

    );
}

export default Post;