import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import SupplyChainpage from './pages/SupplyChainpage';

const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
        <Route exact path="/" element={<SupplyChainpage></SupplyChainpage> } />
        </Routes>
    </BrowserRouter>
  );
};



export default App;
