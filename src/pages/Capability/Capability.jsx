import AddCircleIcon from "@mui/icons-material/AddCircle";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import { getAllCapability } from "../../services/capabilities";
import {
  Create,
  ModelBody,
  ModelButton,
  ModelContainer,
  ModelHeader,
  ModelSwitch
} from "../Capabilities/capabilities.style";
import CapabilityTable from "./Table";

function Capability({ lang }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState([]);

  const getCapability = async () => {
    const res = await getAllCapability();
    setData(res?.response_body);
  };

  useEffect(() => {
    getCapability();
  }, []);

  return (
    <Container dir={lang === "arabic" ? "rtl" : undefined}>
      <Create>
        <AddCircleIcon />
        <p onClick={handleOpen}>Create Capability</p>
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
              <p>Create Capability</p>
            </ModelHeader>

            <ModelBody>
              <form>
                <ModelSwitch>
                  <p>Capability Name</p>
                </ModelSwitch>
                <input type='text' required />
                <ModelButton>Add Capability</ModelButton>
                <ModelButton onClick={handleClose} cancel='true'>
                  Cancel
                </ModelButton>
              </form>
            </ModelBody>
          </ModelContainer>
        </Modal>
      </Create>
      <CapabilityTable data={data} />
    </Container>
  );
}

export default Capability;
