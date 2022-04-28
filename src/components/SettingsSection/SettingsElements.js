import styled from 'styled-components';

export const SettingsContainer = styled.div`
  display: flex;
  //align-items: center;
  //height: 1050px;
  //background: #232323;
  padding: 80px;
  //margin: 80px auto 0 auto;
  //max-width: 1200px;
  @media screen and (max-width: 768px) {
    padding: 0px;
  }
`;

export const SettingsContainerBlack = styled.div`
  display: flex;
  
  //align-items: center;
  height: 100%;
  background: #121212;
  //padding: 80px;// auto 0 auto;
  //max-width: 1200px;
`;

export const ProfilePic = styled.img`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  height: 20vh;
  width: 30vh;
  border-radius: 10px;
`;

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  position: relative;
  align-items: center;
  //height: 900px;
  width: 50%;
`;

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
  width: 30vw;
  color: rgba(255, 255, 255, 0.85);
  font-size: 5rem;
  font-weight: bold;
`;

export const UserSettings = styled.div`
  margin: 10px 0 10px 0;

    
` ;
export const PostContainer = styled.div`

`;
export const Tabs = styled.div`

`;
export const SaveButton = styled.div`
    margin: 10px 0 20px 0; 

`;