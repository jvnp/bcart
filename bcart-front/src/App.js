import React from "react";
import './App.css';
import Sidebar from "./components/Layout/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Page/Home";
import About from "./components/Page/About";
import Cart from "./components/Page/Cart";
import Login from './components/Authentication/Login';
import Logout from './components/Authentication/Logout';
import useToken from './components/Authentication/useToken';
import Products from "./components/Page/Products";

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
      <BrowserRouter>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/cart" element={<Cart />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
