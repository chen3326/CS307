import styled from 'styled-components';
import Badge from '@mui/material/Badge';

export const PostDisplayContainer = styled.div`
  width: 100%;
  //min-height: calc(100vh - 80px);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export const PostDisplayContainerDark = styled.div`
  width: 100%;
  //min-height: calc(100vh - 80px);
  background: #121212;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export const Post = styled.div`
  width: 600px;
  height: auto;
  //max-height: 800px;
  max-width: 600px;
  background-color: rgb(250, 250, 250);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  //margin: 20px;
  margin: 10px 20px;
  padding: 20px;
  border-radius: 15px;
  @media screen and (max-width: 768px) {
    width: 350px;
    //margin: 10px 20px;
    padding: 10px;
    margin: 8px auto;
  }
`

export const PostDark = styled.div`
  width: 600px;
  height: auto;
  //max-height: 800px;
  max-width: 600px;
  color: rgba(255, 255, 255, 0.85);
  background-color: rgb(75, 75, 75);
  //box-shadow: rgba(250, 250, 250, 0.24) 0px 3px 8px;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
  @media screen and (max-width: 768px) {
    width: 350px;
    //margin: 20px;
    padding: 20px;
  }
`

export const PostHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const PostHeaderTitle = styled.div`
  flex: 50%;
  flex-direction: row;
`

export const PostHeaderTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //width: 100%;
  //@media screen and (max-width: 768px) {
  //  width: 350px;
  //  //margin: 20px;
  //  padding: 20px;
  //}
`
export const PostHeaderTopButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

export const LikeButton = styled.button`
  display: flex;
  flex-direction: row;
  //justify-content: flex-end;
  padding: 6px 0px;
  align-content: center;
  border: none;
  background-color: rgb(250, 250, 250);
`

export const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  //justify-content: flex-end;
  padding: 6px 0px;
  align-content: center;
  border: none;
  background-color: rgb(250, 250, 250);
`

export const PostTextContainer = styled.a`
  word-wrap: break-word;
  height: auto;
  max-height: 400px;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
  align-items: flex-start;
`
export const NewLine = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

// export const StyledBadge = styled(Badge)`
//     & .MuiBadge-badge {
//       //background-color: #8f8f8f;
//       //color: #8f8f8f;
//       //width: 12;
//       //height: 12;
//
//       border-radius: 50%;
//         '&::after': {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           border-radius: 50%;
//           // animation: 'ripple 1.2s infinite ease-in-out',
//           // border: '1px solid currentColor',
//           content: '""';
//       },
//     },
//     //@keyframes ripple {
//     //    0% {
//     //      transform: scale(.8);
//     //      opacity: 1;
//     //    },
//     //    100% {
//     //      transform: scale(2.4);
//     //      opacity: 0;
//     //    },
//     //},
// `;