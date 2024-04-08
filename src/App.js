import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Orderform from './Pages/Orderform';
import Shop from "./Pages/Shop";
import Shopdetails from "./Pages/ShopDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Orderform />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shopdetails" element={<Shopdetails />} />



      </Routes>
    </Router>
  );
}

export default App;
