import { motion } from "framer-motion";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Title = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(auth);
        navigate("/login");
    };
    return (
        <motion.div className="title">
            <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Password Tracker
            </motion.h1>

            {user && (
                <>
                    <div
                        className="user-icon"
                        style={{ backgroundImage: `url("${user.photoURL}")` }}
                        title="Logout"
                        onClick={handleSignOut}
                    ></div>

                    <div className="nav-cards">
                        <img
                            src="https://img.icons8.com/?size=100&id=8OdwzXFjBVH2&format=png&color=000000"
                            alt=""
                            className="nav-img"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    <div className="nav-add">
                        <img
                            src="https://img.icons8.com/?size=100&id=UUgYZvYwoZrF&format=png&color=000000"
                            alt=""
                            className="nav-img"
                            onClick={() => navigate("/add")}
                        />
                    </div>
                </>
            )}
        </motion.div>
    );
};
