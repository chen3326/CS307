import CreatePostIcon from '@mui/icons-material/Create';
import { Container, Button, Link } from 'react-floating-action-button'
import buttonInner from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { addDoc, collection } from "firebase/firestore";
import {auth, database} from "../../firebase.js";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CheckIcon from '@mui/icons-material/Check';
import LogoPhoto from "../../images/Boiler Breakouts-logos.jpeg";
import Cat_pic from "../../images/cat_pic.jpg";
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";

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
    display: "none",
});

function MakePost(){
    const [title, setTitle] = useState("");
    const [postText, setPostText] = useState("");

    const [file,setFile] = useState("");


    

    const postsCollectionRef = collection(database, "posts");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [invisible, setInvisible] = React.useState(false);
    const AnonymousSet = () => {
        setInvisible(!invisible);
    };


    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title:title,
            postText:postText,
            author: { name: auth.currentUser.email, id: auth.currentUser.uid },

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
                                style={{width:'450px', height:'250px', marginTop:'5px', marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                placeholder="Post..."
                                onChange={(event) => {
                                    setPostText(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>
                    <ImageList sx={{ height: 135 }} cols={3} rowHeight={135}>
                        {itemData.map((item) => (
                            <ImageListItem key={item.img}>
                                <img
                                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Stack spacing={1} direction="row">
                        <div>
                            <Badge color="primary" invisible={!invisible} variant="dot" >
                                <CheckIcon/>
                            </Badge>
                            <FormControlLabel
                                sx={{ color: 'primary' }}
                                control={<Switch checked={invisible} onChange={AnonymousSet} />}
                                label="Anonymous"
                            />
                        </div>
                    </Stack>

                    <Stack  spacing={3} direction="row">

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

const itemData = [
    {
        img: LogoPhoto,
        title: 'BoilerBreakoutLogo',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: LogoPhoto,
        title: 'BoilerBreakoutLogo',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    },


];

export default MakePost;