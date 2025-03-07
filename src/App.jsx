import React from 'react';
import Criar from './Pages/Criar';
import Login from './Pages/Login';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import './App.css';
import Header from './Componentes/Header/Header';
import Post from './Pages/Posts/Post';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="criar" element={<Criar />} />
          <Route path="posts/:id" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
