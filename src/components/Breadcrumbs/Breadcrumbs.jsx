import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSchool } from "../../contexts/UserContext";
import { BreadcrumbsContainer } from "../Header/header.style";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function BasicBreadcrumbs() {
  const { history } = useSchool();
  console.log(`📌 📁 ~ history`, history);

  return (
    <BreadcrumbsContainer role='presentation' onClick={handleClick}>
      <Breadcrumbs aria-label='breadcrumb' separator='>'>
        {history?.map((link) => (
          <Link underline='hover' color='inherit' onClick={() => {}}>
            {link.split("/")[1]}
          </Link>
        ))}

        <Typography color='text.primary'>Breadcrumbs</Typography>
      </Breadcrumbs>
    </BreadcrumbsContainer>
  );
}

export default BasicBreadcrumbs;
