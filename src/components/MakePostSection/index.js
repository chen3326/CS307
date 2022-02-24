import CreatePostIcon from '@mui/icons-material/Create';
import { Container, Button, Link } from 'react-floating-action-button'
import buttonInner from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { addDoc, collection } from "firebase/firestore";
import {auth, database, storage} from "../../firebase.js";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import imageCompression from "browser-image-compression";
import Alert from '@mui/material/Alert';

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

    const [imageUrl, setimageUrl] = useState("");
    const [imageUrl2, setimageUrl2] = useState("");
    const [imageUrl3, setimageUrl3] = useState("");


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
            author: { email: auth.currentUser.email, id: auth.currentUser.uid },
            imageUrl:imageUrl,
            imageUrl2:imageUrl2,
            imageUrl3:imageUrl3

        });

        window.location.pathname = "/home";

    };

    const [progress, setProgress] = useState(0);

    const [beforesize, setbeforesize] = useState(0);
    const [beforesizetwo, setbeforesizetwo] = useState(0);
    const [beforesizethree, setbeforesizethree] = useState(0);

    const [aftersize, setaftersize] = useState(0);
    const [aftersizetwo, setaftersizetwo] = useState(0);
    const [aftersizethree, setaftersizethree] = useState(0);


    //const [inputtext, setInputText] = useState(0);
    const [inputtext, setInputText] = useState(0);
    const [countnum, setCountnum] = useState(0);

    const formHandler = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
       // const file = resizeFile(image);
        uploadFiles(file);

    };
    const formHandler2 = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
       // const file = resizeFile(image);
        uploadFiles2(file);
    };
    const formHandler3 = (e) => {
        e.preventDefault();
        const file = e.target[0].files[0];
      //  const file = resizeFile(image);
        uploadFiles3(file);
    };

    const uploadFiles = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
                //const imageaftersize = ( snapshot.totalBytes);
                //setaftersize(imageaftersize);

            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setimageUrl(downloadURL);
                });
            }
        );
    };
    const uploadFiles2 = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
                //const imageaftersizetwo = ( snapshot.totalBytes);
                //setaftersizetwo(imageaftersizetwo);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setimageUrl2(downloadURL);
                });
            }
        );
    };
    const uploadFiles3 = (file) => {
        //
        if (!file) return;
        const sotrageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);


        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);

            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setimageUrl3(downloadURL);
                });
            }
        );
    };
    async function doUpload(event) {

        const inputFile = event.target.files[0];
        setbeforesize(`${(inputFile.size / 1024 / 1024).toFixed(2)} MB`);

        const maxSet = {
            useWebWorker: true
        }
        try {

            const afterCompressedFile = await imageCompression(inputFile, maxSet);

            setaftersize(`${(afterCompressedFile.size / 1024 / 1024).toFixed(2)} MB`);

            await uploadFiles(afterCompressedFile);
        } catch (error) {
            console.log(error);
        }

    }
    async function doUpload2(event) {

        const inputFile = event.target.files[0];
        setbeforesizetwo(`${(inputFile.size / 1024 / 1024).toFixed(2)} MB`);

        const maxSet = {
            useWebWorker: true
        }
        try {

            const afterCompressedFile = await imageCompression(inputFile, maxSet);

            setaftersizetwo(`${(afterCompressedFile.size / 1024 / 1024).toFixed(2)} MB`);

            await uploadFiles2(afterCompressedFile);
        } catch (error) {
            console.log(error);
        }

    }

    async function doUpload3(event) {

        const inputFile = event.target.files[0];
        setbeforesizethree(`${(inputFile.size / 1024 / 1024).toFixed(2)} MB`);

        const maxSet = {

            useWebWorker: true
        }
        try {

            const afterCompressedFile = await imageCompression(inputFile, maxSet);

            setaftersizethree(`${(afterCompressedFile.size / 1024 / 1024).toFixed(2)} MB`);

            await uploadFiles3(afterCompressedFile);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Container styles={{color: 'darkblue', marginRight: '-60px', marginBottom: '-15px'}}>

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

                    <form onChange={event => doUpload(event)}>
                        <input type="file" className="input" />

                    </form>
                    <hr />



                    <form onChange={event => doUpload2(event)}>
                        <input type="file" className="input" />

                    </form>
                    <hr />


                    <form onChange={event => doUpload3(event)}>
                        <input type="file" className="input"/>


                    </form>
                    <hr />

                    <h4>Uploading done {progress}%</h4>
                    <h7>Image 1 Before resize: {beforesize} bytes, After resize: {aftersize}; </h7>
                    <h7>Image 2 Before resize: {beforesizetwo} bytes, After resize: {aftersizetwo}; </h7>
                    <h7>Image 3 Before resize: {beforesizethree} bytes, After resize: {aftersizethree}; </h7>






                    <Stack spacing={1} direction="row">
                        <div>
                            <Badge color="primary" invisible={!invisible} variant="dot" >
                                <AdminPanelSettingsIcon/>
                            </Badge>
                            <FormControlLabel
                                sx={{ color: 'primary' }}
                                control={<Switch checked={invisible} onChange={AnonymousSet} />}
                                label="Anonymous"
                            />
                        </div>
                    </Stack>

                    <Stack  spacing={2} direction="row">

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



export default MakePost;