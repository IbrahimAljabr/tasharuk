import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

import { Switch } from "@mui/material";
import Modal from "@mui/material/Modal";
import {
  ModelBody,
  ModelButton,
  ModelContainer,
  ModelHeader,
  ModelSwitch
} from "../Capabilities/capabilities.style";
import { ErrorText } from "../CreateSchool/create-school.style";

function SchemaModal({
  open,
  handleClose,
  handleChange,
  handleSubmit,
  formErrors,
  handleEditCapability,
  edit,
  formValues
}) {
  console.log(`🚀🚀 ~~ formValues`, formValues);
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
          <p>Create a New Schema</p>
        </ModelHeader>

        <ModelBody>
          <form>
            <ModelSwitch>
              <p>Capability Schema Instance Name</p>
              <Switch color='success' disabled />
            </ModelSwitch>
            <div>
              <input
                type='text'
                required
                name='name'
                onChange={handleChange}
                value={formValues.name}
                autoComplete='off'
              />
              <ErrorText>{formErrors.name}</ErrorText>
            </div>
            <ModelSwitch>
              <p>Schema Description</p>
            </ModelSwitch>
            <div>
              <textarea
                type='text'
                required
                name='description'
                onChange={handleChange}
                value={formValues.description}
              />
              <ErrorText>{formErrors.description}</ErrorText>
            </div>
            <ModelButton
              type='submit'
              onClick={edit ? handleEditCapability : handleSubmit}
            >
              {edit ? <>Edit Schema</> : <>Add Schema</>}
            </ModelButton>
            <ModelButton onClick={handleClose} cancel='true'>
              Cancel
            </ModelButton>
          </form>
        </ModelBody>
      </ModelContainer>
    </Modal>
  );
}

export default SchemaModal;
