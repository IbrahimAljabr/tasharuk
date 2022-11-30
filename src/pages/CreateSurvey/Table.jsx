import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TdEdit, TdError } from "../../components/Table/table.style";
function SurveyTable({ data }) {
  console.log(`🚀🚀 ~~ SurveyTable ~~ data`, data);
  const navigate = useNavigate();

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
              sx={{ borderRight: 1, borderColor: "lightgray" }}
              align='center'
            >
              Schema Name
            </TableCell>

            <TableCell
              sx={{ borderRight: 1, borderColor: "lightgray" }}
              align='center'
              style={{ width: 120 }}
            >
              Start Date
            </TableCell>
            <TableCell
              sx={{ borderRight: 1, borderColor: "lightgray" }}
              align='center'
              style={{ width: 120 }}
            >
              End Date
            </TableCell>
            <TableCell
              sx={{ borderRight: 1, borderColor: "lightgray" }}
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
                sx={{
                  borderRight: 1,
                  borderColor: "lightgray",
                  cursor: "pointer"
                }}
                align='center'
                onClick={() =>
                  navigate(`/positions/${row?.schema?.id}`, {
                    state: row
                  })
                }
              >
                {row?.schema?.name_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {new Date(row?.start_date)?.toLocaleDateString()}
              </TableCell>
              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {new Date(row?.end_date)?.toLocaleDateString()}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.is_active ? (
                  <TdEdit>
                    <DoneIcon />
                  </TdEdit>
                ) : (
                  <TdError>
                    <ErrorOutlineIcon />
                  </TdError>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SurveyTable;
