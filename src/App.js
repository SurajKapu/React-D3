import "./styles/main.scss";
import Signup from "./components/Signup";
import Chart from "./components/Chart";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/chart" element={<Chart />} />
    </Routes>
  );
}

export default App;
