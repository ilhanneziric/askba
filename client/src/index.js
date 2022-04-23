// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { toast } from 'react-toastify'

// import { Provider } from 'react-redux';
// import store from './redux/store';

// import socket from './Socket';

// toast.configure();

// socket.on('receive_notification', () => {
//   toast.info('You have a new notification!');
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store = {store}>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>
// );

// reportWebVitals();


import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals'

import {createRoot} from 'react-dom/client';

import { toast } from 'react-toastify'

import { Provider } from 'react-redux';
import store from './redux/store';

import socket from './Socket';

toast.configure();

socket.on('receive_notification', () => {
  toast.info('You have a new notification!');
});

const rootElement = document.getElementById('root');

const root = createRoot(rootElement);

root.render(
  <Provider store = {store}>
    <React.StrictMode>
     <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App/>);
