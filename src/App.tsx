import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GateIn, GateOut } from '../src/pages';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GateIn />} />
        <Route path="/gate-in" element={<GateIn />} />
        <Route path="/gate-out" element={<GateOut />} />
      </Routes>
    </BrowserRouter>
  )
}
