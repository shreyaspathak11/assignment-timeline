import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.scss';
import ReportBuilder from './pages/ReportBuilder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={ReportBuilder} />
      </Routes>
    </Router>
  );
}

export default App;
