import MultiPlayerBoard from "./components/MultiPlayerBoard";
import Board from "./components/Board";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="container mx-3">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/vsAi" element={<Board />} />
            <Route path="/vsPlayer" element={<MultiPlayerBoard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
