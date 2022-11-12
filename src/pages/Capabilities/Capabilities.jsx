import AddCircleIcon from '@mui/icons-material/AddCircle';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import React, { useState } from 'react';
import TableShare from '../../components/Table/Table';
import { Create, ModelBody, ModelButton, ModelContainer, ModelHeader, ModelSwitch } from './capabilities.style';

function Capabilities() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container >
            <Create>
                <AddCircleIcon />
                <p onClick={handleOpen}>Create a New Schema</p>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableEnforceFocus
                // hideBackdrop
                >
                    <ModelContainer >
                        <ModelHeader>
                            <AddCircleIcon />
                            <p >Create a New Schema</p>
                        </ModelHeader>

                        <ModelBody>
                            <ModelSwitch>
                                <p>Capability Schema Instance Name</p>
                                <Switch defaultChecked color="success" disabled />
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

export default Capabilities