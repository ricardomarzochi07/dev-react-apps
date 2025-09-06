import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Inicio</Link>
      <Link to="/login" style={{ marginRight: '10px' }}>Login sesión</Link>
      <Link to="/signup">Signup</Link>
    </nav>
  );
}