import React, { useEffect, useState } from "react";
import icon from "../../assets/TimeTrialsAppStoreSupport/icon.png";
import "./TimeTrialsAppStoreSupport.css";

const supportEmail = "jtepp+site@icloud.com";

export default function TimeTrialsAppStoreSupport() {
    const [message, setMessage] = useState("");
    const subject = encodeURIComponent("Time Trials support");
    const body = encodeURIComponent(
        message ||
            "Hi, I need help with Time Trials.\n\nApp version:\niPhone model and iOS version:\nWhat happened:",
    );
    const mailto = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    useEffect(() => {
        document.querySelector("body").classList.add("skip");
    }, []);
    return (
        <div className="page-shell">
            <nav className="topbar" aria-label="Main navigation">
                <a className="brand" href="#top">
                    <img src={icon} alt="" className="brand-icon" />
                    <span>TIME TRIALS</span>
                </a>
                <a className="top-link" href="#contact">
                    Get help <span aria-hidden="true">↗</span>
                </a>
            </nav>

            <main id="top">
                <section className="hero">
                    <div className="eyebrow">
                        <span className="live-dot"></span> SUPPORT DESK{" "}
                        <span className="eyebrow-rule"></span> HERE FOR THE LONG
                        WAY HOME
                    </div>
                    <h1>
                        Every commute
                        <br />
                        has a <span>next time.</span>
                    </h1>
                    <p className="intro">
                        Questions about a recording, your route history, or a
                        missing replay? Find a quick answer below or send a note
                        straight to the developer.
                    </p>
                    <a className="hero-link" href="#faq">
                        Browse common questions{" "}
                        <span aria-hidden="true">↓</span>
                    </a>
                    <div className="hero-stamp" aria-hidden="true">
                        <span>TT</span>
                        <i>↗</i>
                    </div>
                </section>

                <section className="content-grid" id="faq">
                    <div className="section-heading">
                        <span className="kicker">01 / QUICK ANSWERS</span>
                        <h2>A few things to check.</h2>
                    </div>
                    <div className="faq-list">
                        <article className="faq-item">
                            <span className="faq-number">01</span>
                            <div>
                                <h3>
                                    My route stopped recording in the
                                    background.
                                </h3>
                                <p>
                                    Time Trials needs location access while you
                                    record. On iPhone, open{" "}
                                    <b>
                                        Settings → Privacy &amp; Security →
                                        Location Services → Time Trials
                                    </b>{" "}
                                    and allow background access. Keep Background
                                    App Refresh enabled, and make sure Low Power
                                    Mode isn’t limiting activity. iOS may still
                                    pause location after you force-quit the app.
                                </p>
                            </div>
                        </article>
                        <article className="faq-item">
                            <span className="faq-number">02</span>
                            <div>
                                <h3>
                                    A commute is missing or the route looks
                                    incomplete.
                                </h3>
                                <p>
                                    Check that Location Services are on and that
                                    Time Trials has permission to access your
                                    location. GPS can be less reliable indoors,
                                    underground, or between tall buildings. Open
                                    the app before starting a commute and give
                                    it a moment to find your position.
                                </p>
                            </div>
                        </article>
                        <article className="faq-item">
                            <span className="faq-number">03</span>
                            <div>
                                <h3>
                                    How do I compare a new trip with an old one?
                                </h3>
                                <p>
                                    Choose a previous commute as your ghost
                                    before you start recording. Time Trials
                                    follows that run alongside your live trip so
                                    you can see how your pace compares.
                                </p>
                            </div>
                        </article>
                        <article className="faq-item">
                            <span className="faq-number">04</span>
                            <div>
                                <h3>Where is my commute history stored?</h3>
                                <p>
                                    Your commute history is stored on your
                                    device. Deleting the app may also remove its
                                    locally stored history, so keep the app
                                    installed if you want to retain your past
                                    trips.
                                </p>
                            </div>
                        </article>
                    </div>
                </section>

                <section className="contact-panel" id="contact">
                    <div className="contact-copy">
                        <span className="kicker">02 / STILL STUCK?</span>
                        <h2>
                            Let’s get you
                            <br />
                            back on track.
                        </h2>
                        <p>
                            Send a little context and we’ll take a look. Include
                            your iPhone model, iOS version, and what you were
                            doing when the issue happened.
                        </p>
                        <div className="reply-note">
                            <span className="reply-dot"></span> Messages go
                            directly to the developer
                        </div>
                    </div>
                    <div className="contact-form">
                        <label htmlFor="message">WHAT CAN WE HELP WITH?</label>
                        <textarea
                            id="message"
                            placeholder="Tell us what happened…"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <a className="send-button" href={mailto}>
                            Email support <span aria-hidden="true">↗</span>
                        </a>
                        <a
                            className="email-address"
                            href={`mailto:${supportEmail}`}
                        >
                            {supportEmail}
                        </a>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <a className="brand footer-brand" href="#top">
                    <img src={icon} alt="" className="brand-icon" />
                    <span>TIME TRIALS</span>
                </a>
                <span>Make the familiar a little faster.</span>
                <span>© {new Date().getFullYear()} Time Trials</span>
            </footer>
        </div>
    );
}
