//import logo from "./logo.svg";
//import "antd/dist/antd.css";
import { Button } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./page/Homepage";
import Items from "./page/Items";
import CartPage from "./page/CartPage";
import Register from "./page/Register";
import Login from "./page/Login";
import Customers from "./page/Customers";
import Bills from "./page/Bills";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
          <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
          <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


export function ProtectedRoute({children}){

    if(localStorage.getItem('pos-user'))
    {
      return children
    }
    else{
      return <Navigate to='/login' />
    }

}