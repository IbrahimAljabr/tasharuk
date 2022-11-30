import styled from "styled-components";
import mq from "../../styles/media-query";

export const HeaderContainer = styled.div`
  height: 10rem;
  width: 100%;
  display: none;
  flex-direction: column;
  overflow: hidden;

  ${mq.desktop`
    display: flex;
  `};
`;

export const NavBarText = styled.div`
  display: flex;
  flex-direction: column;

  ${mq.desktop`
    width: 100%;
    height: 6rem;
  `};
`;

export const NavBarList = styled.ul`
  background-color: #81d1c8;
  height: 6rem;
  margin: 0;
  padding: 0;
  color: white;
  display: flex;
  list-style: none;
  justify-content: flex-end;
  align-items: center;
`;

export const ListItem = styled.li`
  margin-left: 3rem;
  font-size: 1.1rem;
  padding: 0.8rem;
  background-color: ${({ active }) => active && "#222222"};
  border-radius: 2rem;

  &:hover {
    background-color: #222222;
    cursor: pointer;
  }
`;

export const NavBarLogin = styled.div`
  background-color: #81d1c8;
  height: 6rem;
  margin: 0;
  padding: 0;
  color: white;
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  display: none;

  li {
    background-color: #f94743;
    font-size: 1.1rem;
    padding: 0.3rem 1rem;
    margin: 0 2rem;
    cursor: pointer;
    word-wrap: nowrap;
    width: 8rem;
    border-radius: 2rem;
    text-align: center;
  }

  ${mq.desktop`
    display: flex;
  `};
`;

export const NavBarImage = styled.div`
  background-color: white;
  border: none;
  padding: 0 8rem 0 4rem;
  color: white;
  width: 12rem;
`;

export const SubHeader = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  height: 10rem;
`;

export const BlackNavBar = styled.ul`
  background-color: black;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
  list-style: none;
  display: ${({ active }) => (active ? "flex" : "none")};

  li {
    color: white;
    margin-left: 5rem;
    cursor: pointer;
  }
`;
