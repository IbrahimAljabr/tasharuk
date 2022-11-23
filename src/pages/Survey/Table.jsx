import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

function SurveyTable({ data, handleNavigate }) {
  console.log(`🚀🚀 ~~ SurveyTable ~~ data`, data);
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
            <TableCell
              sx={{
                borderRight: 1,
                borderColor: "lightgray"
              }}
              align='center'
            >
              Schema Name
            </TableCell>

            <TableCell
              sx={{
                borderRight: 1,
                borderColor: "lightgray"
              }}
              align='center'
              style={{ width: 180 }}
            >
              Start Date
            </TableCell>

            <TableCell
              sx={{
                borderRight: 1,
                borderColor: "lightgray"
              }}
              align='center'
              style={{ width: 180 }}
            >
              End Date
            </TableCell>

            <TableCell
              sx={{
                borderRight: 1,
                borderColor: "lightgray"
              }}
              align='center'
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((row) => (
            <TableRow key={row?.id}>
              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.capability_name_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.capability_name_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.capability_name_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              ></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SurveyTable;
