import Section from "../../components/Section/Section";
import Cutout from "../../components/Cutout/Cutout";
import styles from "./Contact.module.css";

function Contact() {
    return (
        <div className="page-main">
            <Section id="contact">
                <div>
                    <Cutout id="contact">
                        <h1 className="page-title">Contact Jacob</h1>
                    </Cutout>

                    <div className={styles.form_container}>
                        <form
                            action="/"
                            method="post"
                            name="contact"
                            data-netlify="true"
                            netlify-honeypot="honeypot"
                            className={styles.contact_form}
                        >
                            <input
                                type="text"
                                name="honeypot"
                                className={styles.honeypot}
                            />

                            <div id="nm" className={styles.form_item}>
                                <h3>
                                    <label htmlFor="name">Name</label>
                                </h3>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Last name, First name"
                                />
                            </div>

                            <div id="em" className={styles.form_item}>
                                <h3>
                                    <label htmlFor="email">Email</label>
                                </h3>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="you@email.com"
                                    required
                                />
                            </div>

                            <div
                                className={[styles.form_item, styles.long].join(
                                    " ",
                                )}
                            >
                                <h3>
                                    <label htmlFor="subject">Subject</label>
                                </h3>
                                <select name="subject" id="subject">
                                    <option value="issue">
                                        There is an issue on one of your
                                        sites/games/apps
                                    </option>
                                    <option value="job">
                                        I want to discuss a job opportunity
                                    </option>
                                    <option value="partner">
                                        I want to discuss a partnership
                                        opportunity
                                    </option>
                                    <option value="hi">
                                        I just want to say hi
                                    </option>
                                    <option value="future">
                                        I am you from the future and need to
                                        warn you about something very important
                                    </option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div
                                id="msg"
                                className={[styles.form_item, styles.long].join(
                                    " ",
                                )}
                            >
                                <h3>
                                    <label htmlFor="message">Message</label>
                                </h3>
                                <textarea
                                    name="message"
                                    className={styles.contact_message}
                                    cols="30"
                                    rows="10"
                                    required
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <div
                                className={[
                                    styles.form_item,
                                    styles.long,
                                    styles.mid,
                                ].join(" ")}
                            >
                                <div data-netlify-recaptcha></div>
                            </div>

                            <div
                                className={[
                                    styles.form_item,
                                    styles.long,
                                    styles.mid,
                                ].join(" ")}
                            >
                                <input
                                    type="submit"
                                    value="Submit"
                                    className={styles.contact_submit}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </Section>
        </div>
    );
}

export default Contact;
