import React from 'react'
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './componenets/Navbar';

function App() {
  return (
      <div>
         <Navbar/>
        <Routes>      
            <Route path="/" element={<HomePage/>} />
            <Route path="/create" element={<CreatePage/>} />
        </Routes>
      </div>
  )
}

export default App;
