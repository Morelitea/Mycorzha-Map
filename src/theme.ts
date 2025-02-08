import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#606c38",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "'Cabin', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: 16,
  },
});

export default theme;
