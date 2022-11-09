import styled from 'styled-components';

export const SectionLeft = styled.div`
  background-color: #6befa3;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: white;
  width: 40vw;
  position: fixed;
  height: 100vh;
  padding-left: 5vw;
`;

export const SectionRight = styled.div`
  background-color: #ebe8e8;
  color: #333333;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  border-top-left-radius: 500px 1500px;
  border-bottom-left-radius: 500px 1500px;
  position: absolute;
  right: 0;
  width: 75vw;
  padding-left: 5vw;

  footer {
    position: absolute;
    bottom: 10vh;
    right: 20vw;
  }

  ul {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }
`;

export const Numero = styled.li`
  background-color: white;
  list-style: none;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 76px;
  width: 76px;
  left: 275px;
  top: 544px;
  border-radius: 100%;
  color: #333333;
  margin: 1% 2% 0 2%;
`;
