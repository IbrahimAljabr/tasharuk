import AddCircleIcon from '@mui/icons-material/AddCircle';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import { Create, CreateContainer, ModelBody, ModelButton, ModelContainer, ModelHeader, ModelSwitch } from '../Capabilities/capabilities.style';

import Modal from '@mui/material/Modal';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { TdDelete, TdEdit } from '../../components/Table/table.style';

function Rubric() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const herders = ['school Name', 'Country', 'Contract person',]

    return (
        <Container >
            <CreateContainer>
                <Create>
                    <AddCircleIcon />
                    <p onClick={handleOpen}>Create School</p>
                </Create>
                <h1>capabilities</h1>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                >
                    <ModelContainer >
                        <ModelHeader>
                            <AddCircleIcon />
                            <p >Create Sub-Capability</p>
                        </ModelHeader>

                        <ModelBody>
                            <ModelSwitch>
                                <p>Rubric Name</p>
                            </ModelSwitch>
                            <input type="text" />
                            <ModelSwitch>
                                <p>Rubric Description</p>
                            </ModelSwitch>
                            <textarea type="text" />
                            <ModelSwitch>
                                <p>Rubric Score</p>
                            </ModelSwitch>
                            <input type="text" />
                            <ModelButton >Add Capability</ModelButton>
                            <ModelButton onClick={handleClose} cancel='true'>Cancel</ModelButton>
                        </ModelBody>

                    </ModelContainer>
                </Modal>
            </CreateContainer>
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
                            <TableRow>
                                {herders.map((row) => (
                                    <TableCell>{row}</TableCell>

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
        </Container>
    )
}

export default Rubric