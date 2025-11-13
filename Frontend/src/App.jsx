import React from "react";
import Login from './Pages/Login'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import { UserData } from "./Context/User";
import Admin from "./Pages/Admin"

function App() {
const {user, isAuth}=UserData()
  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={ isAuth?<Home/>:<Login/>}></Route>
      <Route path="/Admin" element={ isAuth?<Home/>:<Admin/>}></Route> 
      <Route path="/login" element={ isAuth?<Home/>:<Login/>}></Route>
      <Route path="/register" element={isAuth?<Home/>:<Register/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
