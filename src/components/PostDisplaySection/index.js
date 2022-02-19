import React, {useEffect, useState} from 'react';


import {database} from "../../firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";



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
                            </PostDisplayContainer>


                            {/*<h3>@{post.author.name}</h3>*/}
                        </Post>







                    );
                })}

        </PostDisplayContainer>


    );
}

export default PostDisplaySection;
