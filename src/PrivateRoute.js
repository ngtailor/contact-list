import React ,{useState}from 'react';
import { BrowserRouter, Routes,Route,Navigate
  } from "react-router-dom";
  
const PrivateRoute = ({children}) => {
    const [login,setLogin]=useState(true)
    if (!login) {
        return <Navigate to="/" />
    }
    return children;
}

export default PrivateRoute
