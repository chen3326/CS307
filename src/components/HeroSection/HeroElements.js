import styled from 'styled-components';


export const HeroContainer = styled.div`
  background: white;//rgb(234,159,68);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  //height: 100vh;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 75vh;
  margin-top: 35px;
  margin-bottom: 35px;
  @media screen and (max-width: 768px) {
    height: 40vh;
  }
`;

export const HeroContainer2 = styled.div`
  background: #121212;//rgb(234,159,68);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const HeroContainer2_sm = styled.div`
  background: #121212;//rgb(234,159,68);
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 5vh;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HeroH1 = styled.div`
  font-size: 100px;
  font-weight: bold;
  margin-bottom: 25px;
`;

export const HeroH1_2 = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 25px;
`;

export const HeroSLogo = styled.img`
  height: 75vh;
  @media screen and (max-width: 768px) {
    height: 40vh;
  }
`;











