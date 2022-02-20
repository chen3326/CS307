import React, {useEffect, useState} from 'react';


import {database} from "../../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";
import Button from "@mui/material/Button";
import CardActions from '@mui/material/CardActions';
import LogoPhoto from '../../images/Boiler Breakouts-logos.jpeg';
import Cat_pic from '../../images/cat_pic.jpg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



function PostDisplaySection( ) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(database, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    });



    return (

        <PostDisplayContainer>

                {postLists.map((post) => {
                    return (
                        <Post>
                            <PostHeader>
                                <PostHeaderTitle>
                                    <h1> {post.title}</h1>
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
                                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
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
                                    <Button> Reply </Button>
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
    },{
        img: Cat_pic,
        title: 'Cat',
    },
    {
        img: LogoPhoto,
        title: 'BoilerBreakoutLogo',
    },




];

export default PostDisplaySection;
