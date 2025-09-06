import React from "react";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Navbar from './components/Navbar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
    </Routes>
  )
}
export default App;