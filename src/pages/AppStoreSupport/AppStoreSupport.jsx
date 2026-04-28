import React, { useState } from "react";
import "../../app-store-support/styles.css";
import logo from "../../app-store-support/logo.svg";

export default function AppStoreSupport() {
    const [message, setMessage] = useState("");
    const mailto = `mailto:support@yourdomain.com?subject=Commute%20Copilot%20Support&body=${encodeURIComponent(message)}`;

    return (
        <div className="container">
            <header className="header">
                <img src={logo} alt="Commute Copilot" className="logo" />
                <h1>Commute Copilot — Support</h1>
            </header>

            <main>
                <section className="card">
                    <h2>Contact Support</h2>
                    <p>
                        If you need help, email us or use the quick message
                        below.
                    </p>
                    <textarea
                        placeholder="Describe your issue, app version, and device"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="actions">
                        <a className="btn" href={mailto}>
                            Email Support
                        </a>
                        <a
                            className="btn alt"
                            href="mailto:support@yourdomain.com"
                        >
                            support@yourdomain.com
                        </a>
                    </div>
                </section>

                <section className="card">
                    <h2>FAQ</h2>
                    <ul>
                        <li>
                            <strong>Crash on launch:</strong> Try reinstalling
                            the app and restart the device.
                        </li>
                        <li>
                            <strong>Missing notifications:</strong> Ensure
                            notifications are enabled for the app.
                        </li>
                        <li>
                            <strong>Live Activity not updating:</strong> Check
                            Location & Background permissions.
                        </li>
                    </ul>
                </section>

                <section className="card small">
                    <h3>Helpful Links</h3>
                    <ul>
                        <li>
                            <a href="/privacy.html">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/terms.html">Terms of Service</a>
                        </li>
                        <li>
                            <a href="/">Home</a>
                        </li>
                    </ul>
                </section>
            </main>

            <footer>
                <p>© {new Date().getFullYear()} Commute Copilot</p>
            </footer>
        </div>
    );
}
