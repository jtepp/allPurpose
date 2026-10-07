import React from "react";
import { Link } from "react-router-dom";
import icon from "../../TimeTrialsAppStoreMarketing/icon.png";
import "../../TimeTrialsAppStoreMarketing/TimeTrialsAppStoreMarketing.css";

const features = [
  { number: "01", title: "Make the everyday measurable.", text: "Record a commute with GPS and keep a history of your trips, grouped by route. See the time and distance add up over every run." },
  { number: "02", title: "Replay the whole route.", text: "Relive a past commute as an animated trail on the map. Scrub through the trip and see how your pace changed along the way." },
  { number: "03", title: "Race your own best.", text: "Pick a previous run as your ghost. While you record, follow its progress and see whether you’re ahead or behind your own pace." },
];

export default function TimeTrialsAppStoreMarketing() {
  return (
    <div className="tt-marketing">
      <nav className="tt-nav" aria-label="Main navigation">
        <a className="tt-brand" href="#top"><img src={icon} alt="" /><span>TIME TRIALS</span></a>
        <div className="tt-nav-links"><a href="#how-it-works">How it works</a><a href="#features">Features</a><Link className="tt-nav-cta" to="/support">Get support <span aria-hidden="true">↗</span></Link></div>
      </nav>

      <main id="top">
        <section className="tt-hero">
          <div className="tt-hero-copy">
            <div className="tt-overline"><span className="tt-pulse"></span> YOUR ROUTINE, WITH A PERSONAL BEST</div>
            <h1>Your commute.<br />Your <em>time.</em></h1>
            <p className="tt-lede">The familiar route gets a little more interesting. Record your everyday commute, replay every turn, and see if you can beat your best.</p>
            <div className="tt-hero-actions"><a className="tt-button" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a><span className="tt-platform">Made for iPhone</span></div>
            <div className="tt-status"><span></span> IN DEVELOPMENT <i>·</i> BUILT FOR THE ROAD AHEAD</div>
          </div>
          <div className="tt-visual" aria-label="Illustration of a commute map and a personal best time">
            <div className="tt-orbit orbit-one"></div><div className="tt-orbit orbit-two"></div>
            <div className="tt-map-card">
              <div className="tt-map-top"><span>HOME → OFFICE</span><span className="tt-map-live"><i></i> ROUTE SAVED</span></div>
              <svg className="tt-map" viewBox="0 0 440 400" role="img" aria-label="A route winding across a map">
                <path className="map-road road-a" d="M-10 93 C84 112 83 190 154 180 S240 72 307 104 S368 192 455 160" /><path className="map-road road-b" d="M34 -10 C51 66 8 120 67 177 S169 228 160 309 S212 367 206 420" /><path className="map-road road-c" d="M310 -10 C276 59 329 124 278 184 S243 274 322 308 S389 374 418 420" /><path className="map-road road-d" d="M-5 282 C80 248 121 279 171 256 S274 238 330 256 S404 239 450 216" />
                <path className="route-shadow" d="M67 327 C92 300 86 267 137 255 S194 240 197 199 S230 156 277 173 S313 151 327 113 S360 96 378 70" /><path className="route-line" d="M67 327 C92 300 86 267 137 255 S194 240 197 199 S230 156 277 173 S313 151 327 113 S360 96 378 70" />
                <circle cx="67" cy="327" r="8" className="route-start" /><circle cx="378" cy="70" r="12" className="route-end" /><circle cx="378" cy="70" r="4" className="route-end-core" /><circle cx="277" cy="173" r="6" className="ghost-dot" /><circle cx="277" cy="173" r="12" className="ghost-ring" />
              </svg>
              <div className="tt-map-label start-label">START</div><div className="tt-map-label finish-label">OFFICE</div>
              <div className="tt-time-card"><span className="tt-time-label">YOUR BEST</span><strong>24<span>:</span>18</strong><span className="tt-time-caption">Home to office <i>↗</i></span></div>
              <div className="tt-ghost-card"><span className="tt-ghost-mark"></span><span>GHOST RUN</span><b>−0:32 ahead</b></div>
            </div>
            <div className="tt-visual-caption"><span>01 — A route, remembered</span><span>TORONTO, ON</span></div>
          </div>
        </section>

        <section className="tt-how" id="how-it-works">
          <div className="tt-section-intro"><span className="tt-kicker">THE LOOP</span><h2>Same streets.<br />New stakes.</h2><p>There’s a route you know by heart. Time Trials helps you see it a little differently.</p></div>
          <div className="tt-steps">
            <article><span>01 / RECORD</span><div className="tt-step-icon icon-record"><i></i></div><h3>Take your usual route.</h3><p>Start a commute and Time Trials records your route and elapsed time, even when your phone is locked.</p></article>
            <article><span>02 / REPLAY</span><div className="tt-step-icon icon-replay">↻</div><h3>See every turn again.</h3><p>Open any past run to watch your route unfold as a moving trail on the map.</p></article>
            <article><span>03 / COMPARE</span><div className="tt-step-icon icon-compare"><i></i><b></b></div><h3>Chase your own pace.</h3><p>Bring a previous commute along as your ghost and track your time against it, live.</p></article>
          </div>
        </section>

        <section className="tt-feature-band" id="features">
          <div className="tt-feature-head"><span className="tt-kicker">BUILT AROUND YOUR ROUTINES</span><h2>A little more to<br />look forward to.</h2></div>
          <div className="tt-feature-list">{features.map((feature) => <article className="tt-feature" key={feature.number}><span>{feature.number}</span><div><h3>{feature.title}</h3><p>{feature.text}</p></div><b aria-hidden="true">↗</b></article>)}</div>
        </section>

        <section className="tt-closing"><div className="tt-closing-icon"><img src={icon} alt="Time Trials app icon" /></div><span className="tt-kicker">A NEW WAY TO SEE THE WAY THERE</span><h2>The route you know<br />by <em>heart.</em></h2><p>Time Trials is in development for iPhone.</p><Link to="/support" className="tt-text-link">Questions? Talk to the developer <span aria-hidden="true">↗</span></Link></section>
      </main>

      <footer className="tt-footer"><a className="tt-brand" href="#top"><img src={icon} alt="" /><span>TIME TRIALS</span></a><span>Make the familiar a little faster.</span><span>© {new Date().getFullYear()} Time Trials</span></footer>
    </div>
  );
}
