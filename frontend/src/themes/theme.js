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

const sideBar = {
  sidebar: {
    width: 200, // The default value is 240
    closedWidth: 55, // The default value is 55
  }
}

export const theme = createMuiTheme(
  merge({}, defaultTheme, rawTheme, coloerTheme, sideBar)
);