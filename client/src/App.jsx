import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'



import { Navbar, Welcome, Footer, Convert, Transfer, Support } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
      <Footer />
    </div>

    
  </div>
);

export default App;

