import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrganizationHeader from './components/OrganizationHeader';
import Dashboard from './components/Dashboard';

// DO NOT import Login or Signup components here anymore!

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-bg text-white">
        <OrganizationHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* No other routes needed since Login is an external HTML file now */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;