import React, {useEffect, useState} from 'react';


import {auth, database} from "../../firebase";
import {getDocs, collection, deleteDoc, doc, addDoc} from "firebase/firestore";
import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";
//import {Comment, CommentDisplayContainer, CommentTextContainer} from "./CommentDisplayElements";
import Button from "@mui/material/Button";
import CardActions from '@mui/material/CardActions';
import LogoPhoto from '../../images/Boiler Breakouts-logos.jpeg';
import Cat_pic from '../../images/cat_pic.jpg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import profile_page from "../../pages/profile_page";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';


function PostDisplaySection() {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(database, "posts");

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const commentsCollectionRef = collection(database, "comments");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };

        getPosts();
    });

    const [commentText, setCommentText] = useState("");
    const createComment = async () => {
       // handleClose();
        await addDoc(commentsCollectionRef, {
            commentText:commentText,
            author: { name: auth.currentUser.email, id: auth.currentUser.uid },

        });

        window.location.pathname = "/home";

    };
    return (

        <PostDisplayContainer>

            {postLists.map((post) => {
                return (
                    <Post>
                        <PostHeader>
                            <PostHeaderTitle>
                                <h1> {post.title}</h1>
                            </PostHeaderTitle>
                            <PostHeaderTitle>
                                <Link
                                    to={{
                                        pathname: "/profile",
                                        state: post.author?.email

                                        // your data array of objects
                                    }}
                                >
                                    {post.author?.email}



                                </Link>


                            </PostHeaderTitle>

                            {/*<div className="deletePost">*/}
                            {/*    /!*{isAuth && post.author.id === auth.currentUser.uid && (*!/*/}
                            {/*        <button*/}
                            {/*            onClick={() => {*/}
                            {/*                // deletePost(post.id);*/}
                            {/*            }}*/}
                            {/*        >*/}
                            {/*            {" "}*/}
                            {/*            &#128465;*/}
                            {/*        </button>*/}
                            {/*    )}*/}
                            {/*</div>*/}
                        </PostHeader>
                        <PostDisplayContainer>
                            {post.postText}
                            <ImageList sx={{width: 500, height: 450}} cols={3} rowHeight={164}>
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
                            <CardActions>
                                <Button onClick={handleClick('bottom')}> Reply </Button>
                                <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Paper>
                                                <Typography variant="h6" component="h2" marginLeft='10px' marginTop='5px' width='450px'>
                                                    Create A Comment here
                                                </Typography>
                                                <Typography sx={{ p: 2 }}>
                                                    click the 'Reply' button again to close
                                                    <div className="inputGp" >

                                                        <textarea
                                                            style={{width:'400px', height:'80px', marginTop:'0px', marginBottom:'15px', border: '2px solid #0D67B5', borderRadius:'5px'}}
                                                            placeholder=" Comment..."
                                                            onChange={(event) => {
                                                            setCommentText(event.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                    <Stack  spacing={1} direction="row">
                                                        <label>
                                                            <Button onClick={createComment} style={{color:'#0D67B5'}}>SUBMIT</Button>
                                                        </label>



                                                    </Stack>
                                                </Typography>
                                            </Paper>
                                        </Fade>
                                    )}
                                </Popper>
                            </CardActions>

                        </PostDisplayContainer>



                        {/*<h3>@{post.author.name}</h3>*/}
                    </Post>



                );
            })}

        </PostDisplayContainer>


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
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: Cat_pic,
        title: 'Cat',
    }, {
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: LogoPhoto,
        title: 'BoilerBreakoutLogo',
    },


];

export default PostDisplaySection;
