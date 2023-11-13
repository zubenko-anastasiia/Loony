import { useState, Suspense } from 'react'
import { useTranslation} from 'react-i18next';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar, Welcome, Footer, Convert, Transfer, Support, Github, ErrorPage } from "./components/index";

function App() {
  const { t, i18n } = useTranslation();
  return (
  <BrowserRouter>
  <div className='gradient-bg-welcome'>
  
      <div className=" relative  ">
        
        <Navbar />
        
                  <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/convert" element={<Convert />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/support" element={<Support />} />
            <Route path="/Github" element={<Github />} />
            <Route path="*" element={<ErrorPage />} />

          </Routes>
        <Footer />
        
      </div>
    </div>
    </BrowserRouter> 

);}

function WrappedApp() {
  return (
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  )
}

export default WrappedApp;

