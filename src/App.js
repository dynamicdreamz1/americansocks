import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Orderform from './Pages/Orderform';
import Shop from "./Pages/Shop";
import Shopdetails from "./Pages/ShopDetails";

function App() {
  return (
    <Router basename="/wordpress/2024/americansocks">
      <Routes>
        <Route path="/orderform" element={<Orderform />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="shopdetails" element={<Shopdetails />} />



      </Routes>
    </Router>
  );
}

export default App;
