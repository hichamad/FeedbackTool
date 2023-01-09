import { createTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// Button themes that are used in our Application

export const buttontheme = createTheme({
  palette: {
    primary: {
      main: "#008fde",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "17px",
    },
  },
});

export const GreenButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#45ac10",
  "&:hover": {
    backgroundColor: "#37890c",
  },
}));

export const BlackButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#323232",
  "&:hover": {
    backgroundColor: "#4c4c4c",
  },
}));

export const OrangeButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#fda101",
  "&:hover": {
    backgroundColor: "#ca8000",
  },
}));
