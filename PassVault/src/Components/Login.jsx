import { motion } from "framer-motion";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export const Login = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) navigate("/");
    });

    const handleLogin = async () => {
        const response = await signInWithPopup(auth, provider);
        console.log(response);
        if (response.user) {
            navigate("/");
        }
    };
    return (
        <motion.section className="login-container">
            <motion.div className="login-card">
                <p>Sign in With Google to Continue</p>
                <button className="btn" onClick={handleLogin}>
                    Google
                </button>
            </motion.div>
        </motion.section>
    );
};
