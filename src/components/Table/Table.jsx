import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { TdDelete, TdEdit } from './table.style';

import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';

function TableShare() {
    const herders = ['Name',]

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={{ 'th': { fontWeight: 600 } }}
                    >
                        {herders.map((row) => (
                            <TableCell >{row}</TableCell>
                        ))}
                        <TableCell align="center">Edit</TableCell>
                        <TableCell align="center">Delete</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {herders.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {herders.map((row) => (
                                <TableCell >{row}</TableCell>

                            ))}
                            <TableCell style={{ width: 50 }} align="center">
                                <TdEdit><Edit /></TdEdit>
                            </TableCell>
                            <TableCell style={{ width: 50 }} align="center">
                                <TdDelete><Delete /></TdDelete>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


export default TableShare