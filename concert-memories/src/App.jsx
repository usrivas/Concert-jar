import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GalleryPage from "./pages/GalleryPage";
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery/:id" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}