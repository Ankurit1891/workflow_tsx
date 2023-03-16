import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import FileManager from "./pages/FileManager";
import SideBar from "./components/SideBar";
import Canvas from "./pages/Canvas";

function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Canvas></Canvas>} />
          <Route path="/dashboard" element={<Dashboard></Dashboard>} />
          <Route path="/analytics" element={<Analytics></Analytics>} />
          <Route path="/filemanager" element={<FileManager></FileManager>} />
          <Route path="/canvas" element={<Canvas></Canvas>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
