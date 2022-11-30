import cookie from "cookiejs";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
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
                  path === "add-school-students" ||
                  path === "survey" ||
                  path === "link-school" ||
                  path === "create-survey" ||
                  path === "positions" ||
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
                  path === "schema" ||
                  path === "rubric" ||
                  path === "indicator"
                }
                onClick={() => navigate("/schema")}
              >
                Schema
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
          {/* <BlackNavBar active={pathname === "/school-management"}>
            <li onClick={() => navigate("/add-school-students")}>
              Add Users
            </li>
            <li onClick={() => navigate("/create-survey")}>Survey</li>
          </BlackNavBar> */}
        </HeaderContainer>
      </SubHeader>
    </>
  );
}

export default Header;
