import React from "react";
import { Provider } from "react-native-paper";
import App from "./src";
import { theme } from "./src/core/theme";
import { Provider as StoreProvider } from 'react-redux';
import store from './src/store/store';

const Main = () => (
  <Provider theme={theme}>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </Provider>
);

export default Main;
