/* eslint-disable */
import React , {useState} from 'react';
import Register from './Register';
import Lander from './Lander';
import Dashboard from './Dashboard';
import { Routes , Route  , Navigate } from 'react-router';
import ProtectedRoute from './protectedRoute';

function App() {

    const isAuthenticated = useState(localStorage.getItem("access_token"))[0] // Check login status


    return (
    <>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Lander />} />
      </Routes>
    </>
    );
}

export default App;