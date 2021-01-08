// In theme.js
import { defaultTheme } from "react-admin";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import merge from "lodash/merge";


const rawTheme = {
  typography: {
      fontSize: 12
  },
};

const coloerTheme = {
  palette: {
    secondary: {
      main: "#000000" // Black
    }
  }
};

export const theme = createMuiTheme(
  merge({}, defaultTheme, rawTheme, coloerTheme)
);