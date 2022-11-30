import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  );
});

export default function Snackbars({ type, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({ ...type, open: false });
  };

  const vertical = "bottom";
  const horizontal = "center";

  return (
    <Snackbar
      open={type?.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert
        onClose={handleClose}
        severity={type.type}
        sx={{ width: "100%" }}
      >
        {type?.message}
      </Alert>
    </Snackbar>
  );
}
