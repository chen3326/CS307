import styled from 'styled-components';

export const PostDisplayContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;

 
`;

export const Post = styled.div`
  width: 600px;
  height: auto;
  max-height: 800px;
  background-color: rgb(250, 250, 250);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 20px;
  padding: 20px;
  border-radius: 15px;




`
export const PostHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

`

export const PostHeaderTitle = styled.div`
  flex: 50%;

  
`

export const PostTextContainer = styled.a`
  word-wrap: break-word;
  height: auto;
  max-height: 400px;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;

`