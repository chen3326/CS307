// import React, {useEffect, useState} from 'react';
// import {collection, getDocs} from "firebase/firestore";
// import {Post, PostDisplayContainer, PostHeader, PostHeaderTitle} from "./PostDisplayElements";
// import {Link} from "react-router-dom";
// import ImageList from "@mui/material/ImageList";
// import ImageListItem from "@mui/material/ImageListItem";
// import CardActions from "@mui/material/CardActions";
// import Button from "@mui/material/Button";
// import Popper from "@mui/material/Popper";
// import Fade from "@mui/material/Fade";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
// import {map} from "react-bootstrap/ElementChildren";
// import {database} from "../../firebase";
// import {commentsCollectionRef} from "./index";
//
// function CommentDisplaySection(postid) {
//
//     const [commentLists, setCommentLists] = useState([]);
//     useEffect(() => {
//         const getComments = async () => {
//             const data = await getDocs(commentsCollectionRef);
//             setCommentLists(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
//         };
//
//         getComments();
//     });
//
//     return (
//
//         <PostDisplayContainer>
//
//             {commentLists.map((comment) => {
//
//                 return (
//                     <div>{comment.comment}</div>
//
//                 );
//             })}
//
//         </PostDisplayContainer>
//
//
//     );
// }
//
//
// export default CommentDisplaySection;
