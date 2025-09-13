import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashBoardPage from './components/DashBoardPage';
import LessonsPage from './components/LessonsPage';

function App() {

  // const[showLogin, setShowLogin] = useState(true);   
  const token = localStorage.getItem('token');  

    return (
      <Router>
          <Routes>
            <Route
            path="/"
            element={token ? <Navigate to="/dashboardpage" /> : <Navigate to="/loginpage" />}
          />
          
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/dashboardpage" element={<DashBoardPage />} />
          <Route path = "/LessonsPage" element = {<LessonsPage />} />

          </Routes>
      </Router>
    )
}

export default App;
