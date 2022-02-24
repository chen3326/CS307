import React, {useEffect, useState} from 'react';


import {auth, database} from "../../firebase";
import {getDocs, collection, deleteDoc, doc, addDoc} from "firebase/firestore";
import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";

import OnePost from "./Post";


function PostDisplaySection() {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(database, "posts");
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };

        getPosts();
    });

    return (

        <PostDisplayContainer>

            {postLists.map((post) => {
                return(
                    <OnePost
                        postid = {post?.id}

                        title={post?.title}
                        postText={post?.postText}
                        authorEmail={post?.author?.email}
                        imageUrl={post?.imageUrl}
                        imageUrl2={post?.imageUrl2}
                        imageUrl3={post?.imageUrl3}
                        FileURl={post?.FileURl}

                    />
                    )
            })}

        </PostDisplayContainer>
    );
}


export default PostDisplaySection;
