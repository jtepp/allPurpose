import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/fonts.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home';
import Base from './components/base';
import Projects from './components/projects';

export const pages = [
  {name: "Projects", path: "/", width: 60},
  {name: "Minigames", path: "/minigames", width: 80},
  {name: "Functions", path: "/functions", width: 72},
  {name: "Contact", path: "/contact", width: 58}
]

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Base>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Base>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
