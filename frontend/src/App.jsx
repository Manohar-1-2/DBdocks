import React from 'react';
import Navbar from '../components/Navbar';
import img from '../assets/img1.jpeg'
import HeroSection from '../components/HeroSection';
import HomePage from '../pages/HomePage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import UserPage from '../pages/UserPage';
import ProtectedRoute from '../utils/ProtectedRoute';
import CreateInstancePage from '../pages/CreateInstancePage';
import ManageInstancePage from '../pages/ManageInstancePage';
import ConnectDbPage from '../pages/ConnectDbPage';
import DetDbPage from '../pages/DetDbPage';
import QueryPage from '../pages/QueryPage';

function App() {
  return (
    <BrowserRouter>
      <div className='bg-bluebg min-h-screen'>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<HeroSection />} />
            <Route element={<ProtectedRoute/>}>
              <Route path='userpage' element={<UserPage/>}>
                <Route index path='' element={<CreateInstancePage/>}/>
                <Route  path='managedb' element={<ManageInstancePage/>}/>
                <Route  path='connectdb' element={<ConnectDbPage/>}/>
                <Route  path='querypage' element={<QueryPage/>}/>
                <Route  path='detdb' element={<DetDbPage/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
