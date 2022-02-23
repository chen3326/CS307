import styled from 'styled-components';

export const CommentDisplayContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

 
`;

export const Comment = styled.div`
  width: 600px;
  height: auto;
  max-height: 300px;
  background-color: rgb(250, 250, 250);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;
`;





export const CommentTextContainer = styled.a`
  word-wrap: break-word;
  height: auto;
  max-height: 230px;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;

`;