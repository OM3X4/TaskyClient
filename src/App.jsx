/* eslint-disable */
import React from 'react';
import Register from './Register';
import Lander from './Lander';
import Dashboard from './Dashboard';
import { Routes , Route , Link , Navigate } from 'react-router';

function App() {
    return (
    <>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/lander' element={<Lander />}/>
      </Routes>
    </>
    );
}

export default App;