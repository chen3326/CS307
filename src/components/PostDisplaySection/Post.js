import React, {useEffect, useState} from 'react';
import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";

import {

    Link
} from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {CardActions, Fade, Paper, Popper} from "@mui/material";
import Button from "@material-ui/core/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {addDoc, collection, getDocs} from "firebase/firestore";
import data from "bootstrap/js/src/dom/data";
import {auth, database} from "../../firebase";

function OnePost({postid, title, postText, authorEmail, imageUrl, imageUrl2, imageUrl3}) {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();
    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const [commentText, setCommentText] = useState("");
    const [commentList, setCommentList] = useState([]);
    const commentsCollectionRef = collection(database, 'posts', postid, 'comments',)

    const createComment = async () => {

        await addDoc(commentsCollectionRef, {
            commentText: commentText,
            commentAuthorId: auth.currentUser.uid

        });

        window.location.pathname = "/home";

    };

    useEffect(() => {
        const getComments = async () => {
            const data = await getDocs(commentsCollectionRef);
            setCommentList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };

        getComments();
    });


    return (

        <Post>
            <PostHeader>
                <PostHeaderTitle>
                    <h1> {title}</h1>
                </PostHeaderTitle>
                <PostHeaderTitle>
                    <Link
                        to={{
                            pathname: "/profile",
                            state: authorEmail

                            // your data array of objects
                        }}
                    >
                        {authorEmail}

                    </Link>


                </PostHeaderTitle>


            </PostHeader>
            <PostDisplayContainer>
                {postText}
                <ImageList sx={{width: 500, height: 450}} cols={3} rowHeight={164}>

                    <ImageListItem>
                        {imageUrl !== "" &&
                            <img
                                src={`${imageUrl}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                loading="lazy"
                            />
                        }


                    </ImageListItem>
                    <ImageListItem>

                        {imageUrl2 !== "" &&
                            <img
                                src={`${imageUrl2}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${imageUrl2}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                loading="lazy"
                            />
                        }


                    </ImageListItem>
                    <ImageListItem>

                        {imageUrl3 !== "" &&
                            <img
                                src={`${imageUrl3}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${imageUrl3}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}

                                loading="lazy"
                            />
                        }

                    </ImageListItem>

                </ImageList>
                <CardActions>
                    <Button onClick={handleClick('bottom')}> Reply </Button>
                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                        {({TransitionProps}) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper>
                                    <Typography variant="h6" component="h2" marginLeft='10px' marginTop='5px'
                                                width='450px'>
                                        Create A Comment here
                                    </Typography>
                                    <Typography sx={{p: 2}}>
                                        click the 'Reply' button again to close
                                        <div className="inputGp">

                                                        <textarea
                                                            style={{
                                                                width: '400px',
                                                                height: '80px',
                                                                marginTop: '0px',
                                                                marginBottom: '15px',
                                                                border: '2px solid #0D67B5',
                                                                borderRadius: '5px'
                                                            }}
                                                            placeholder=" Comment..."
                                                            onChange={(event) => {
                                                                setCommentText(event.target.value);
                                                            }}
                                                        />
                                        </div>
                                        <Stack spacing={1} direction="row">
                                            <label>
                                                <Button onClick={createComment}
                                                        style={{color: '#0D67B5'}}>SUBMIT</Button>
                                            </label>


                                        </Stack>
                                    </Typography>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </CardActions>
                <div>
                    {commentList.map((comment) => {
                        return (


                            <div> {comment.commentText}</div>
                        )


                    })}


                </div>


            </PostDisplayContainer>


            {/*<h3>@{post.author.name}</h3>*/}
        </Post>

    );
}

export default OnePost;



