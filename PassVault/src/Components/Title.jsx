import { motion } from "framer-motion";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

export const Title = ({ search, onSearchChange }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        await signOut(auth);
        onSearchChange("");
        navigate("/");
    };
    return (
        <>
            {/* The home page has its own hero header */}
            {location.pathname !== "/" && (
                <motion.div className="title">
                    <div className="title-bar">
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            PassVault
                        </motion.h1>

                        {user && (
                            <>
                                {location.pathname === "/card" && (
                                    <label className="search-bar">
                                        <SearchIcon />
                                        <input
                                            type="search"
                                            placeholder="Search title or username"
                                            aria-label="Search cards by title or username"
                                            value={search}
                                            onChange={(e) => onSearchChange(e.target.value)}
                                        />
                                    </label>
                                )}

                                <div
                                    className="user-icon"
                                    style={{ backgroundImage: `url("${user.photoURL}")` }}
                                    title="Logout"
                                    onClick={handleSignOut}
                                ></div>
                            </>
                        )}
                    </div>
                </motion.div>
            )}

            {user && (
                <>
                    <div className="nav-cards">
                        <img
                            src={
                                location.pathname === "/"
                                    ? "https://img.icons8.com/?size=100&id=8OdwzXFjBVH2&format=png&color=000000"
                                    : "https://img.icons8.com/?size=100&id=euc8ZKJJqR5v&format=png&color=000000"
                            }
                            alt=""
                            className="nav-img"
                            onClick={() => {
                                location.pathname === "/"
                                    ? navigate("/card")
                                    : navigate("/");
                            }}
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
        </>
    );
};
