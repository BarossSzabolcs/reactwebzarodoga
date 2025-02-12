import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Open from './Open';
import Users from './Users';
import Diagram from './Diagram';
import Login from './Login';
import Logins from './Logins';
import Rangok from './Rangok';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/open" 
          element={
            <ProtectedRoute>
              <Open />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/diagram" 
          element={
            <ProtectedRoute>
              <Diagram />
            </ProtectedRoute>
          } 
        />
         <Route 
          path="/logins" 
          element={
            <ProtectedRoute>
              <Logins/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/rangok" 
          element={
            <ProtectedRoute>
              <Rangok/>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
