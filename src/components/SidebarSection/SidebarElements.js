import { Link as LinkS } from 'react-scroll';
import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';

export const Side = styled.nav`
  background: #0D67B5;

  backdrop-filter: saturate(180%) blur(20px);
  width: 62px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 768px) {
    display: none;
  }

`;

export const SideDark = styled.nav`
  background: slategrey;

  backdrop-filter: saturate(180%) blur(20px);
  width: 62px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: fixed;
  top: 0;
  z-index: 10;


`;

export const SidebarContainer = styled.div`


  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  margin-top: 40px;
  z-index: 1;
  width: 25vw;
  padding: 0 24px;
  max-width: 1200px;
`;

export const SideLogo = styled(LinkR)`


  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: Start;
  margin-top: 10px;
  font-weight: bold;
  text-decoration: none;
`;



export const SideMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
    margin-right: 0px;
  }
`;

export const SideItem = styled.li`
  height: 40px;
`;

export const SideBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const SideLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.5rem;
  height: 100%;
  cursor: pointer;

  &.active {
    //border-bottom: 3px solid white;
    font-weight: bold;
    //transition: all 0.5s ease-in-out;
  }
`;

export const SideBtnLink = styled.a`
  display:inline-block;
  padding:0.5em 1.2em;
 // border:0.1em solid #FFFFFF;
  margin:0.3em 0.3em 0.3em 0.3em;
  border-radius:0.12em;
  //box-sizing: border-box;
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
  
`;
