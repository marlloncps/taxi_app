import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { closeSnackbar, SnackbarProviderProps } from "notistack";

export const snackbarProviderProps = {
  maxSnack: 3,
  autoHideDuration: 4000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
  style: {
    borderRadius: "10px",
    fontFamily: "sans-serif",
  },
  action: (snackbarId: string) => (
    <IconButton
      size="small"
      color="inherit"
      onClick={() => closeSnackbar(snackbarId)}
    >
      <Close
        sx={{
          fontSize: 20,
        }}
      />
    </IconButton>
  ),
} as SnackbarProviderProps;
