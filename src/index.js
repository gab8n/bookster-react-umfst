import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './Redux/configureStore';
import 'index.scss';
import { ToastContainer, toast } from 'react-toastify';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
