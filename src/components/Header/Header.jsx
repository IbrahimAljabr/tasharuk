import cookie from "cookiejs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  BlackNavBar,
  HeaderContainer,
  ListItem,
  NavBarImage,
  NavBarList,
  NavBarLogin,
  NavBarText,
  SubHeader
} from "./header.style";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(`🚀🚀 ~~ Header ~~ pathname`, pathname);
  const path = pathname?.split("/")[1];
  return (
    <>
      <SubHeader>
        <NavBarImage>
          <img src={logo} alt='logo' />
        </NavBarImage>
        <HeaderContainer>
          <NavBarText>
            <NavBarList>
              <ListItem
                onClick={() => navigate("/school-management")}
                active={
                  path === "school-management" ||
                  path === "schema" ||
                  path === "add-school-students" ||
                  path === "survey" ||
                  path === "create-school"
                }
              >
                School Management
              </ListItem>
              <ListItem>User Management</ListItem>

              <ListItem
                active={
                  path === "capabilities" ||
                  path === "sub-capability" ||
                  path === "rubric" ||
                  path === "indicator"
                }
                onClick={() => navigate("/capabilities")}
              >
                Capabilities
              </ListItem>
              <NavBarLogin>
                <li
                  onClick={() => {
                    cookie("auth", null);
                    navigate("/");
                  }}
                >
                  Log out
                </li>
              </NavBarLogin>
            </NavBarList>
          </NavBarText>
          <BlackNavBar active={pathname === "/school-management"}>
            <li onClick={() => navigate("/schema")}>Schema</li>
            <li>Survey Module</li>
          </BlackNavBar>
        </HeaderContainer>
      </SubHeader>
    </>
  );
}

export default Header;
