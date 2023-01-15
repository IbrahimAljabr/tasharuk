import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

import Modal from "@mui/material/Modal";
import { ErrorText } from "../CreateSchool/create-school.style";
import {
  ModelBody,
  ModelButton,
  ModelContainer,
  ModelHeader,
  ModelSwitch
} from "./capabilities.style";

function CapabilitiesModal({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  formErrors,
  formValues,
  handleEditCapability,
  edit,
  loading
}) {
  console.log(`🚀🚀🚀🚀 ~~ edit`, edit);
  return (
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
          {edit ? <p>Edit Schema</p> : <p>Create a New Schema</p>}
        </ModelHeader>

        <ModelBody>
          <form>
            <ModelSwitch>
              <p>Capability Name</p>
            </ModelSwitch>
            <div>
              <input
                type='text'
                required
                name='name'
                onChange={handleChange}
                value={formValues?.name}
                autoComplete='off'
              />
              <ErrorText>{formErrors.name}</ErrorText>
            </div>

            <ModelButton
              disabled={loading}
              type='submit'
              onClick={edit ? handleEditCapability : handleSubmit}
            >
              {edit ? <>Edit Capability</> : <>Add Capability</>}
            </ModelButton>
            <ModelButton
              disabled={loading}
              onClick={handleClose}
              cancel='true'
            >
              Cancel
            </ModelButton>
          </form>
        </ModelBody>
      </ModelContainer>
    </Modal>
  );
}

export default CapabilitiesModal;
