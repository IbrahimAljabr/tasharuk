import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { TdDelete, TdEdit } from "../../components/Table/table.style";

import { useNavigate } from "react-router-dom";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { useSchool } from "../../contexts/UserContext";

function SchoolTable({ data, handleDelete }) {
  console.log(`🚀🚀 ~~ SchoolTable ~~ data`, data);
  const { setSchoolData } = useSchool();
  const navigate = useNavigate();
  const header = [
    "School Name",
    "Country",
    "Contract Person",
    "Phone Number",
    "Date",
    "Status"
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
            <TableRow key={row?.company_register_id}>
              <TableCell
                sx={{
                  borderRight: 1,
                  borderColor: "lightgray",
                  cursor: "pointer"
                }}
                align='center'
                onClick={() => {
                  setSchoolData(row);
                  navigate(
                    `/add-school-students/${row?.company_register_id}`,
                    {
                      state: { row }
                    }
                  );
                }}
              >
                {row?.school_name_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.country?.country_name_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              ></TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              ></TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              ></TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                {row?.is_active ? "True" : "False"}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                style={{ width: 50 }}
                align='center'
              >
                <TdEdit
                  onClick={() => {
                    setSchoolData(row);
                    navigate(`/create-school/${row?.id}`, {
                      state: { row }
                    });
                  }}
                >
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

export default SchoolTable;
