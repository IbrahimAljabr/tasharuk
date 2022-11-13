import AddCircleIcon from "@mui/icons-material/AddCircle";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Delete } from "../../assets/icons/delete.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { TdDelete, TdEdit } from "../../components/Table/table.style";
import { Create } from "../Capabilities/capabilities.style";

function Survey({ lang }) {
  const navigate = useNavigate();

  const herders = ["Capability Name", "User Type"];

  return (
    <Container dir={lang === "arabic" && "rtl"}>
      <Create>
        <AddCircleIcon />
        <p onClick={() => navigate("/create-school")}>
          Create New Survey
        </p>
      </Create>
      <TableContainer component={Paper}>
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
              {herders.map((row) => (
                <TableCell
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
            {herders.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  sx={{ borderRight: 1, borderColor: "lightgray" }}
                  align='center'
                >
                  {row}
                </TableCell>

                <TableCell
                  sx={{ borderRight: 1, borderColor: "lightgray" }}
                  align='center'
                >
                  <Checkbox />
                  Management
                  <Checkbox />
                  Teacher
                  <Checkbox />
                  Parent
                  <Checkbox />
                  Student
                </TableCell>

                <TableCell
                  style={{ width: 50 }}
                  sx={{ borderRight: 1, borderColor: "lightgray" }}
                  align='center'
                >
                  <TdEdit>
                    <Edit />
                  </TdEdit>
                </TableCell>
                <TableCell
                  style={{ width: 50 }}
                  sx={{ borderRight: 1, borderColor: "lightgray" }}
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
    </Container>
  );
}

export default Survey;
