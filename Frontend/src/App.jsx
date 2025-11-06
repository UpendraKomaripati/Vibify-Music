import React from "react";
import Login from './Pages/Login'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home";
import Register from "./Pages/Register";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
