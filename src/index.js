import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/fonts.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Section from './components/section';
import Base from './components/base';
import Cutout from './components/cutout';
import { randomElement } from './utils';
import Home from './components/home';

export const pages = [
  {name: "Projects", path: "/", width: 60},
  {name: "Minigames", path: "/minigames", width: 80},
  {name: "Functions", path: "/functions", width: 72},
  {name: "Contact", path: "/contact", width: 58}
]

const root = ReactDOM.createRoot(document.getElementById('root'));

const colorPairs = [
  { primary: 'red', secondary: 'darkorange' },
  { primary: 'darkorange', secondary: 'yellow' },
  { primary: 'yellow', secondary: 'limegreen' },
  { primary: 'limegreen', secondary: 'cyan' },
  { primary: 'cyan', secondary: 'blue' },
  { primary: 'cornflowerblue', secondary: 'darkseagreen' },
  { primary: 'magenta', secondary: 'red' },
  { primary: 'orchid', secondary: 'white' },
  { primary: 'gold', secondary: 'darkred' },
  { primary: 'teal', secondary: 'olive' },
  { primary: 'coral', secondary: 'turquoise' },
  { primary: 'salmon', secondary: 'navajowhite' }
];

Object.entries(randomElement(colorPairs)).forEach(([key, value]) => {
  document.querySelector(':root').style.setProperty(`--${key}`, value)
  console.log(`--${key}: ${value}`)
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Base>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Base>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
