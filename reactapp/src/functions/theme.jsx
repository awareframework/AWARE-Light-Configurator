import { createTheme } from "@mui/material/styles";

const customisedTheme = createTheme({
  palette: {
    main: {
      main: "#1FB3DF",
      contrastText: "white",
    },
    header: {
      main: "#62676E",
      contrastText: "white",
    },
  },
});

export default customisedTheme;
