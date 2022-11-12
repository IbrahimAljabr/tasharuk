import AddCircleIcon from '@mui/icons-material/AddCircle';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import React, { useState } from 'react';
import TableShare from '../../components/Table/Table';
import { Create, ModelBody, ModelButton, ModelContainer, ModelHeader, ModelSwitch } from '../Capabilities/capabilities.style';

function Capability() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container >
            <Create>
                <AddCircleIcon />
                <p onClick={handleOpen}>Create Capability</p>
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
                            <p >Create Capability</p>
                        </ModelHeader>

                        <ModelBody>
                            <ModelSwitch>
                                <p>Capability Name</p>
                            </ModelSwitch>
                            <input type="text" />
                            <ModelButton >Add Capability</ModelButton>
                            <ModelButton onClick={handleClose} cancel='true'>Cancel</ModelButton>
                        </ModelBody>

                    </ModelContainer>
                </Modal>
            </Create>
            <TableShare />
        </Container>
    )
}

export default Capability