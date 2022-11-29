import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { TdDelete, TdEdit } from "../../components/Table/table.style";

import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";

function IndicatorTable({
  data,
  handleNavigate,
  handleDelete,
  handleEdit
}) {
  console.log(`🚀🚀 ~~ IndicatorTable ~~ data`, data);
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
              Indicator Description
            </TableCell>

            <TableCell
              sx={{ borderRight: 1, borderColor: "lightgray" }}
              align='center'
              style={{ width: 50 }}
            >
              Edit
            </TableCell>
            <TableCell
              sx={{ borderRight: 1, borderColor: "lightgray" }}
              align='center'
              style={{ width: 50 }}
            >
              Delete
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
                onClick={() => handleNavigate(row?.id)}
              >
                {row?.description_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                style={{ width: 50 }}
                align='center'
              >
                <TdEdit onClick={() => handleEdit(row)}>
                  <Edit />
                </TdEdit>
              </TableCell>
              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                style={{ width: 50 }}
                align='center'
              >
                <TdDelete onClick={() => handleDelete(row?.id)}>
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

export default IndicatorTable;
