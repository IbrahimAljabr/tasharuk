import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { TdDelete, TdEdit } from "./table.style";

import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

function TableShare({ data, columns }) {
  console.log(`🚀🚀 ~~ TableShare ~~ data`, data);
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
            {columns.map((row) => (
              <TableCell
                key={row}
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.header}
              </TableCell>
            ))}

            <TableCell
              sx={{ borderRight: 1, borderColor: "lightgray" }}
              align='center'
            >
              Edit
            </TableCell>
            <TableCell
              sx={{ borderRight: 1, borderColor: "lightgray" }}
              align='center'
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data?.map((row) => (
            <TableRow key={row}>
              {columns.map((cal) => (
                <TableCell
                  sx={{ borderRight: 1, borderColor: "lightgray" }}
                  align='center'
                  key={row}
                >
                  {row[cal.field]}
                </TableCell>
              ))}

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                style={{ width: 50 }}
                align='center'
              >
                <TdEdit>
                  <Edit />
                </TdEdit>
              </TableCell>
              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                style={{ width: 50 }}
                align='center'
              >
                <TdDelete>
                  <Delete />
                </TdDelete>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableShare;
