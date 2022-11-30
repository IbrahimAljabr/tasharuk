import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import Snackbars from "../../components/SnackBar";
import { addPosition, deletePosition } from "../../services/survey";
import { PositionInput } from "../CreateSchool/create-school.style";
function PositionsTable({ data, id}) {
  console.log(`🚀🚀 ~~ PositionsTable ~~ data`, data);
  const [snack, setSnack] = useState({
    open: false,
    type: "success",
    message: ""
  });

  const handleChange = async ({ target }, capId) => {
    const body = {
      school_schema_id: id?.id,
      capability_id: capId,
      position_id: +target?.id
    };
    if (target.checked) {
      console.log(`🚀🚀 ~~ handleChange ~~ body`, body);
      try {
        const res = await addPosition(body);
        console.log(`🚀🚀 ~~ handleChange ~~ res`, res);
        setSnack({
          ...snack,
          open: true,
          message: "Added Successfully",
          type: "success"
        });
      } catch (error) {
        console.log(
          `🚀🚀 ~~ handleChange ~~ error`,
          error.response.data
        );
        setSnack({
          ...snack,
          open: true,
          message: error?.response?.data?.error_message,
          type: "error"
        });
      }
    } else {
      try {
        const res = await deletePosition(body);
        console.log(`🚀🚀 ~~ handleChange ~~ res`, res);
        setSnack({
          ...snack,
          open: true,
          message: "Removed Successfully",
          type: "success"
        });
      } catch (error) {
        console.log(
          `🚀🚀 ~~ handleChange ~~ error`,
          error.response.data
        );
        setSnack({
          ...snack,
          open: true,
          message: "Removed Successfully",
          type: "success"
        });
      }
    }
  };
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
              style={{ width: 200 }}
            >
              Capability Name
            </TableCell>

            <TableCell
              sx={{ borderRight: 1, borderColor: "lightgray" }}
              align='center'
            >
              Positions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          
          {data?.map((row) => (
            <TableRow key={row?.id}>
              <TableCell
                sx={{
                  borderRight: 1,
                  borderColor: "lightgray"
                }}
                align='center'
              >
                {row?.capability_name_en}
              </TableCell>

              <TableCell
                sx={{ borderRight: 1, borderColor: "lightgray" }}
                align='center'
              >
                <PositionInput
                  type='checkbox'
                  checked= {row?.positions_ids.includes(12)}
                  onChange={(e) => handleChange(e, row?.id)}
                  id='12'
                />
                Student
                <PositionInput
                  type='checkbox'
                  checked= {row?.positions_ids.includes(13)}
                  onChange={(e) => handleChange(e, row?.id)}
                  id='13'
                />
                Teacher
                <PositionInput
                  type='checkbox'
                  checked= {row?.positions_ids.includes(14)}
                  onChange={(e) => handleChange(e, row?.id)}
                  id='14'
                />
                Management
                <PositionInput
                  type='checkbox'
                  checked= {row?.positions_ids.includes(15)}
                  onChange={(e) => handleChange(e, row?.id)}
                  id='15'
                />
                Parent
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbars setOpen={setSnack} type={snack} />
    </TableContainer>
  );
}

export default PositionsTable;
