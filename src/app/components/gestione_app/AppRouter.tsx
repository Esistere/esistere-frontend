import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appp from './Home';
import FormElement from './FormPaziente';
import ListaPazienti from './ListaPazienti';
import NavBar from './NavBar';
import LoginElement from './Login';
import SignUpElement from './SignUp';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Appp />} />
        <Route path="/Form" element={<FormElement />} />
        <Route path="/Lista" element={<ListaPazienti />} />
        <Route path="/SignUp" element={<SignUpElement />} />
        <Route path="/Login" element={<LoginElement />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
