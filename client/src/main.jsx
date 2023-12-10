import React from 'react'
import ReactDOM from 'react-dom/client'
//import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import { TransactionsProvider } from './context/TransactionContext.jsx'
import './index.css'
import './i18n'

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionsProvider>
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
  </TransactionsProvider>,
)
