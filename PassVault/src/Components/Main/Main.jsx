// src/main.jsx
import "./Main.css";
import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export const Main = () => {
    const navigate = useNavigate();
    // const [user] = useAuthState(auth);

    // useEffect(() => {
    //     if (user) navigate("/card");
    // });

    const handleLogin = async () => {
        const response = await signInWithPopup(auth, provider);
        if (response.user) {
            navigate("/card");
        }
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>PassVault</h1>
                <p>Your secure, local-only password manager</p>
            </header>

            <section id="what-is" className="home-section">
                <h2>What is PassVault?</h2>
                <p>
                    PassVault is a lightweight, client-side password manager
                    built in React. It encrypts all your credentials right in
                    your browser, so no sensitive data ever leaves your device.
                </p>
            </section>

            <section id="why" className="home-section">
                <h2>Why PassVault Exists</h2>
                <ul>
                    <li>Remembering dozens of passwords is a headache.</li>
                    <li>
                        Storing them in plain text or sticky notes is insecure.
                    </li>
                    <li>Cloud-only solutions can raise privacy concerns.</li>
                    <li>
                        PassVault gives you zero-trust, client-only encryption.
                    </li>
                </ul>
            </section>

            <section id="features" className="home-section">
                <h2>Features</h2>
                <ul>
                    <li>Encrypted LocalStorage using AES-256</li>
                    <li>One-click strong password generator</li>
                    <li>Organize entries with categories & tags</li>
                    <li>Real-time search & filters</li>
                    <li>Fully responsive on desktop & mobile</li>
                </ul>
            </section>

            <section id="how-to" className="home-section">
                <h2>How to Use</h2>
                <ol>
                    <li>Click the “Sign in with Google” button below.</li>
                    <li>
                        Authorize access – no setup, no password to remember.
                    </li>
                    <li>Create or import your first password entry.</li>
                    <li>
                        Browse, edit, or delete entries; all data stays
                        encrypted in your browser.
                    </li>
                </ol>
                <button className="sign-in-button" onClick={handleLogin}>
                    Sign in with Google
                </button>
            </section>
        </div>
    );
};

export default Main;
