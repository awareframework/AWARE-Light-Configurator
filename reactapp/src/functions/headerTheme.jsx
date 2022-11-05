import { createTheme } from "@mui/material/styles";

const headerTheme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontSize: 24,
  },
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

export default headerTheme;
