import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

import { useNavigate } from "react-router-dom";
import { useSchool } from "../../contexts/UserContext";

function UsersTable({ data }) {
  console.log(`🚀🚀 ~~ UsersTable ~~ data`, data);
  const { setSchoolData } = useSchool();
  const navigate = useNavigate();
  const header = [
    "Name",
    "Position",
    "Country ",
    "Phone Number",
    "Email"
  ];

  return (
    <TableContainer component={Paper} sx={{ marginBottom: 15 }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow
            sx={{
              th: {
                fontWeight: 600,
                borderRight: 1,
                borderColor: "lightgray"
              }
            }}
          >
            {header.map((row) => (
              <TableCell
                key={row}
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((row) => (
            <TableRow key={row?.company_register_id}>
              <TableCell
                sx={{
                  borderRight: 1,
                  borderColor: "lightgray"
                  // cursor: "pointer"
                }}
                align='center'
              >
                {row?.first_name}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.position?.type_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.school?.country?.country_name_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.mobile_number}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.email}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UsersTable;
