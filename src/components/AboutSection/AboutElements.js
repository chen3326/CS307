import styled from 'styled-components';

export const AboutContainer = styled.div`
  background-color: rgb(234,159,68);

  display: flex;
  align-items: center;
  height: 1050px;
 


 
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;

  height: 900px;




`
export const AboutTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;


  width: 100vw;
  color: darkorchid;
  font-size: 5rem;
  font-weight: bold;

`

export const AboutText = styled.div`
  margin-top: 5vw;

  line-height: 170%;
  font-size: 2.5rem;
  color: white;
  width: 80vw;
  max-width: 1200px;

  
`

export const PostBtnLink = styled.a`
  display:inline-block;
  padding:0.35em 1.2em;
  border:0.1em solid #FFFFFF;
  margin:0.3em 0.3em 0.3em 0.3em;
  border-radius:0.12em;
  box-sizing: border-box;
  text-decoration:none;
  font-family:'Roboto',sans-serif;
  font-weight:300;
  color:#FFFFFF;
  text-align:center;
  transition: all 0.2s;
  &:hover {
    color:#000000;
    background-color:#FFFFFF;
  }

`