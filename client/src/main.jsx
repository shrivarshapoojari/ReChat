import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import {Provider} from 'react-redux';
import store from './redux/store';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// All `Portal`-related components need to have the the main app wrapper element as a container
// so that the are in the subtree under the element used in the `important` option of the Tailwind's config.
const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider  store={store}>
    <HelmetProvider>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <div onContextMenu={(e)=>e.preventDefault()}> */}
        <App />
        {/* </div> */}
      </ThemeProvider>
    </StyledEngineProvider>
    </HelmetProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 