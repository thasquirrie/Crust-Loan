import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar({ SnackbarMessage, openSnackbar, snackbarSeverity, handleClose }) {
    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                {SnackbarMessage}
            </Alert>
        </Snackbar>
    );
}
