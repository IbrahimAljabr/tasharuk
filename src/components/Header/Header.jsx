import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { BlackNavBar, HeaderContainer, ListItem, NavBarImage, NavBarList, NavBarLogin, NavBarText, SubHeader } from './header.style';

function Header() {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <SubHeader>
        <NavBarImage>
          <img src={logo} alt='logo' />
        </NavBarImage>
        <HeaderContainer>
          <NavBarText>
            <NavBarList >
              <ListItem
                onClick={() => navigate('/school-management')}>School Management</ListItem>
              <ListItem
                onClick={() => navigate('/user-management')}>User Management</ListItem>
              <ListItem
                onClick={() => navigate('/capabilities')}>Capabilities</ListItem>
              <NavBarLogin>
                <li>Log out</li>
              </NavBarLogin>
            </NavBarList>
          </NavBarText>
          <BlackNavBar active={(pathname === '/school-management')}>
            <li onClick={() => navigate('/school-management')}>Schools</li>
            <li onClick={() => navigate('/create-survey')}>Survey Module</li>
          </BlackNavBar>
        </HeaderContainer>
      </SubHeader>
    </>
  )
}

export default Header