import React from "react";
import ReactDOM from "react-dom/client";
import "./css/globals.css";
import "./css/fonts.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "./components/BaseLayout/BaseLayout";
import Functions from "./pages/Functions/Functions";
import Contact from "./pages/Contact/Contact";
import Minigames from "./pages/Minigames/Minigames";
import TimeTrialsAppStoreMarketing from "./pages/TimeTrialsAppStoreMarketing/TimeTrialsAppStoreMarketing";
import TimeTrialsAppStoreSupport from "./pages/TimeTrialsAppStoreSupport/TimeTrialsAppStoreSupport";
import TimeTrialsPrivacyPolicy from "./pages/TimeTrialsPrivacyPolicy/TimeTrialsPrivacyPolicy";
import AppProvider from "./components/AppProvider/AppProvider";

function Root() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AppProvider>
                    <BaseLayout>
                        <Routes>
                            <Route
                                path="/time-trials/privacy-policy"
                                element={<TimeTrialsPrivacyPolicy />}
                            />
                            <Route
                                path="/time-trials/support"
                                element={<TimeTrialsAppStoreSupport />}
                            />
                            <Route
                                path="/time-trials"
                                element={<TimeTrialsAppStoreMarketing />}
                            />
                            <Route path="/minigames" element={<Minigames />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/functions" element={<Functions />} />
                            <Route path="*" element={<Home />} />
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
