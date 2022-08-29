import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9461"
    },
    secondary: {
      main: "#ca5159"
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
