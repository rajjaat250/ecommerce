import React from "react";
import Productlist from "../pages/productlist";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import Productdetails from "../pages/productdetails";
function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Productlist/>}/>
        <Route path="/product/:id" element={<Productdetails/>}/>
      </Routes>
    </Router>
 )
}
export default App; 
 