import CreatePostIcon from '@mui/icons-material/Create';
import { Container, Button, Link } from 'react-floating-action-button'
import buttonInner from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { addDoc, collection } from "firebase/firestore";
import {auth, database, signup} from "../../firebase.js";
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


function Topics(email, nickName, age, major, year) {
    console.log(email);

    //collections in firebase keep the data tied to the user
    //https://firebase.google.com/docs/firestore/data-model
    const [loading, setLoading] = useState(false);
    const [topic1, setTopic1] = useState("");
    const [topic2, setTopic2] = useState("");
    const [topic3, setTopic3] = useState("");
    const [topic4, setTopic4] = useState("");
    const [topic5, setTopic5] = useState("");

    const topicCollectionRef = collection(database, "topics");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [invisible, setInvisible] = React.useState(false); //ask helen what this does

    const userCollectionRef = collection(database, "users"); //collection of users


    //add user to database in ./users
    const createUser = async () => {
        //todo: <Link> add topics in window
        //adds all user input into collection
        //password not passed into collection for security/privacy
        await addDoc(userCollectionRef, {
            topic1: topic1,
            topic2: topic2,
            topic3: topic3,
            topic4: topic4,
            topic5: topic5,
            author: {
                id: auth.currentUser.uid,
                email: email,
                nickName: nickName,
                age: age,
                major: major,
                year: year,
            },
            //topics: { email: auth.currentUser.email,  },
        });
        window.location.pathname = "/home"; //redirects now logged in user to homepage
    };

    async function handleUserAuthen() {
        setLoading(true);
        try {
            //push inputs to ./users collection
            createUser();
        } catch {
            alert("Error!");
        }
        setLoading(false);
    }

    return(
        <Container styles={{color: 'darkblue', marginRight: '-60px', marginBottom: '-15px'}}>
            <Button
                styles={{backgroundColor: 'darkblue' , color : 'white', width: '73px', height: '73px'}}
                onClick={handleOpen}//() => window.location.pathname = "/Topics" }
            >
                <CreatePostIcon fontSize='large'/>
            </Button>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Your Topics
                    </Typography>
                    <Typography id="modal-modal-title" variant="subtitle1" component="subtitle1">
                        Here you can add some of your interests, classes, clubs, etc. that will be tied to your account. Lets start off with five topics for now. You can add more later.
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <label> Topic 1:</label>
                        <div className="inputGp">
                            <input
                                style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                placeholder="Topic..."
                                width=""
                                onChange={(event) => {
                                    setTopic1(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <label> Topic 2:</label>
                        <div className="inputGp">
                            <input
                                style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                placeholder="Topic..."
                                width=""
                                onChange={(event) => {
                                    setTopic2(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <label> Topic 3:</label>
                        <div className="inputGp">
                            <input
                                style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                placeholder="Topic..."
                                width=""
                                onChange={(event) => {
                                    setTopic3(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <label> Topic 4:</label>
                        <div className="inputGp">
                            <input
                                style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                placeholder="Topic..."
                                width=""
                                onChange={(event) => {
                                    setTopic4(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <label> Topic 5:</label>
                        <div className="inputGp">
                            <input
                                style={{width:'450px', height:'30px', marginTop:'5px',marginBottom:'20px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                placeholder="Topic..."
                                width=""
                                onChange={(event) => {
                                    setTopic5(event.target.value);
                                }}
                            />
                        </div>
                    </Typography>



                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"

                        onClick={handleUserAuthen}
                    >
                        SUBMIT
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
}
export default Topics;
