import React, { CSSProperties } from 'react';
import styled from 'styled-components';

export const ProfileContainer = styled.div`
  
  display: flex;
  //align-items: center;
  //height: 1050px;
  //margin-top: 80px;
  background: white;
  //margin: 80px auto 0 auto;
  //max-width: 1200px;
  

 
`;

export const ProfileContainerBlack = styled.div`
  
  display: flex;
  //align-items: center;
  height: 100%;
  background: #121212;
  //margin: 80px auto 0 auto;
  //max-width: 1200px;

 
`;

export const ProfileContentContainer = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  //align-items: center;
  margin: auto;
`;

export const ProfilePicContainer = styled.div`

  display: flex;
  flex-direction: column;
  //position: relative;
  //align-items: center;
  //height: 900px;
  
  width: 25%;
`;

export const ProfilePic = styled.img`
  
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  height: 20vh;
  border-radius: 10px;
  
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  position: relative;
  align-items: center;

  //height: 900px;
  width: 100%;
  

`
export const UserName = styled.div`
{/*display: flex;
  flex-direction: row;
  justify-content: center;
*/}

  width: 30vw;
  color: black;
  font-size: 4rem;
  font-weight: bold;
`

export const UserNameBlack = styled.div`
{/*display: flex;
  flex-direction: row;
  justify-content: center;
*/}

  width: 30vw;
  color: rgba(255, 255, 255, 0.85);
  font-size: 4rem;
  font-weight: bold;
`

export const ProfileText = styled.div`
  margin-top: 5vw;
  line-height: 170%;
  font-size: 2.5rem;
  color: white;
  width: 20vw;
  max-width: 1200px;
`


export const ProfileStats = styled.div`

`;

export const UserStats = styled.div`
  
  margin: 10px 0px 10px 0px;

    
` ;

export const PostsStat = styled.div`

`;
export const FollowersStat = styled.div`

`;
export const FollowingStat = styled.div`

`;
export const PostContainer = styled.div`

`;
export const Tabs = styled.div`

`;
export const Posts = styled.div`

`;
export const Liked = styled.div`

`;
export const TabCard = styled.div`
  margin: 10px 0px 10px 0px;

`;
export const FollowButton = styled.div`
    margin: 10px 0px 20px 0px;
`;

// /**@type {{gridRHS: {alignItems: string, justifyContent: string, direction: string}}}**/
export const styles = {
    modalBox: {
        width: '100%',
        maxWidth: 360,
        // display: "flex",
        // flexDirection: "column",
        // // justifyContent: "center",
        // alignItems: "center",
        // position: "relative",
        // textAlign: "center",
        // justifyItems: "center",
        // margin: "auto",
    },
    gridRHS: {
        // RHS Column
        direction: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
    }

};

export const test1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  //align-items: center;
  margin: auto;
`;




