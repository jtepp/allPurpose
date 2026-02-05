import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "./css/fonts.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import Functions from "./pages/Functions";
import Contact from "./pages/Contact";
import Minigames from "./pages/Minigames";
import AppProvider from "./components/AppProvider";

function Root() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AppProvider>
                    <BaseLayout>
                        <Routes>
                            <Route path="*" element={<Home />} />
                            <Route path="/minigames" element={<Minigames />} />
                            <Route path="/contact" element={<Contact />} />{" "}
                            <Route path="/functions" element={<Functions />} />
                        </Routes>
                    </BaseLayout>
                </AppProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
