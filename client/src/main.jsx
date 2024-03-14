import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { TransactionsProvider } from './context/TransactionContext.jsx'
import { SwapProvider } from './context/SwapContext.jsx'

import './i18n'

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionsProvider>
  
  <React.StrictMode>
    <ThemeProvider>
      <SwapProvider>
        <App />
      </SwapProvider>
    </ThemeProvider>
  </React.StrictMode>
  
  </TransactionsProvider>,
)
