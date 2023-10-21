import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar, Welcome, Footer, Convert, Transfer, Support, Github, ErrorPage } from "./components";

const App = () => (
  <BrowserRouter>
  <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        
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

);

export default App;

