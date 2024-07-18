import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Orderform from './Pages/Orderform';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/orderform" element={<Orderform />} />
      </Routes>
    </Router>
  );
}

export default App;
