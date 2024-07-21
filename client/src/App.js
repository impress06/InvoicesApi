import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store, { persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import './App.css';

import AppRouter from './routers/AppRouter';

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
          </PersistGate>
        </Provider>
      <ToastContainer />
      
    </div>
  );
}

export default App;
