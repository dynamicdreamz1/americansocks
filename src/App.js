import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Orderform from './Pages/Orderform';
import Shop from "./Pages/Shop";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Orderform />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop-filter" element={<p>hi vaidehi</p>} />



      </Routes>
    </Router>
  );
}

export default App;
