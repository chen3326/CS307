import React, { CSSProperties } from 'react';
import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  padding: 80px;
  //align-items: center;
  //height: 1050px;
  //margin-top: 80px;
  background: white;
  //margin: 80px auto 0 auto;
  //max-width: 1200px;
  @media screen and (max-width: 768px) {
    //width: 90%;
    padding: 0px;
  }
`;

export const ProfileContainerBlack = styled.div`
  
  display: flex;
  padding: 80px;
  //align-items: center;
  height: 100%;
  background: #121212;
  //margin: 80px auto 0 auto;
  //max-width: 1200px;
  @media screen and (max-width: 768px) {
    //width: 90%;
    padding: 0px;
  }
 
`;

export const NameStatusIconContainer = styled.div`
  display: flex;
  //align-items: center;
  height: 100%;
  //background: #121212;
  //margin: 80px auto 0 auto;
  //max-width: 1200px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
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
  //width: 23vw;
  color: black;
  font-size: 4rem;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 2rem;
`

export const UserNameBlack = styled.div`
{/*display: flex;
  flex-direction: row;
  justify-content: center;
*/}
  width: 23vw;
  color: rgba(255, 255, 255, 0.85);
  font-size: 4rem;
  font-weight: bold;
  @media screen and (max-width: 768px) {
    font-size: 2rem;
`

export const ProfileText = styled.div`
  margin-top: 5vw;
  line-height: 170%;
  font-size: 2.5rem;
  color: white;
  width: 20vw;
  max-width: 1200px;
`

export const UserStats = styled.div`
  margin: 10px 0px 10px 0px;
` ;

export const PostContainer = styled.div`

`;

export const TabPanelBox = styled.div`
  padding: 24px;
  
  @media screen and (max-width: 768px) {
    padding: 0px;
`;

export const TabBox = styled.div`
  background-color: orange;
  
  @media screen and (max-width: 768px) {
    width: 95vw;
    margin: auto;
    background-color: orange;
    border-radius: 10px;
    //font-size: 2rem;
`;

export const TabDiv = styled.div`
  @media screen and (max-width: 768px) {
    margin: 0px;
    padding: 0px;
`;

export const TabCard = styled.div`
  margin: 10px 0px 10px 0px;
  @media screen and (max-width: 768px) {
    //margin: 10px 0px 20px 0px;
    padding: 0px;
    margin: 0px;
`;

export const FollowButton = styled.div`
    margin: 10px 0px 20px 0px;
  @media screen and (max-width: 768px) {
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




