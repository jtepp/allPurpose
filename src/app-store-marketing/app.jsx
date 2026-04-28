function Feature({ title, desc }) {
    return (
        <div className="feature">
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
}

function MarketingPage() {
    const features = [
        {
            title: "Smart route recommendations",
            desc: "Combines live transit data with your preferences to find the best trip.",
        },
        {
            title: "Live Activity & reminders",
            desc: "Get step-by-step guidance and timely reminders when it matters.",
        },
        {
            title: "Offline-friendly",
            desc: "Cached routes and schedules when connectivity is limited.",
        },
    ];

    return (
        <div className="container">
            <header className="header">
                <img src="logo.svg" alt="Commute Copilot" className="logo" />
                <div>
                    <h1>Commute Copilot</h1>
                    <p className="tagline">
                        Smarter commutes with live transit data
                    </p>
                </div>
            </header>

            <main>
                <section className="hero card">
                    <img
                        src="hero.svg"
                        alt="App screenshot"
                        className="hero-img"
                    />
                    <div className="hero-ctas">
                        <a
                            className="btn"
                            href="https://apps.apple.com/app/idYOUR_APP_ID"
                        >
                            View on App Store
                        </a>
                        <a className="btn alt" href="/support/">
                            Get support
                        </a>
                    </div>
                </section>

                <section className="card features">
                    {features.map((f, i) => (
                        <Feature key={i} {...f} />
                    ))}
                </section>

                <section className="card small">
                    <h3>Screenshots</h3>
                    <p>
                        Use your App Store screenshots here. Host them in
                        `/assets/` and link directly.
                    </p>
                </section>
            </main>

            <footer>
                <p>© {new Date().getFullYear()} Commute Copilot</p>
            </footer>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<MarketingPage />);
