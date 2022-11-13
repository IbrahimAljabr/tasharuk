import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import TableShare from "../../components/Table/Table";
import {
  Create,
  ModelBody,
  ModelButton,
  ModelContainer,
  ModelHeader,
  ModelSwitch
} from "../Capabilities/capabilities.style";

function SubCapability({ lang }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container dir={lang === "arabic" && "rtl"}>
      <Create>
        <AddCircleIcon />
        <p onClick={handleOpen}>Create Sub-Capability</p>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          disableEnforceFocus
        >
          <ModelContainer>
            <ModelHeader>
              <AddCircleIcon />
              <p>Create Sub-Capability</p>
            </ModelHeader>

            <ModelBody>
              <form>
                <ModelSwitch>
                  <p>Sub-Capability Name</p>
                </ModelSwitch>
                <input type='text' required />
                <ModelSwitch>
                  <p>Sub-Capability Wight</p>
                </ModelSwitch>
                <input type='text' required />
                <ModelButton type='submit'>
                  Add Capability
                </ModelButton>
                <ModelButton onClick={handleClose} cancel='true'>
                  Cancel
                </ModelButton>
              </form>
            </ModelBody>
          </ModelContainer>
        </Modal>
      </Create>
      <TableShare />
    </Container>
  );
}

export default SubCapability;
