import React from "react";
import Productlist from "./pages/productlist";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Productdetails from "./pages/productdetails";
import Cart from "./pages/Cart";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";

function App(){
  return(
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Productlist/>}/>
              <Route path="/product/:id" element={<Productdetails/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="/reset-password" element={<ResetPassword/>}/>
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
 )
}
export default App;
 