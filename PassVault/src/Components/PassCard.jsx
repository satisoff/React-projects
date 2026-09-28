import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const fadeSlide = {
    initial: {
        opacity: 0,
        x: -10,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: "easeInOut",
            // No delay here; staggerChildren in parent will handle delay
        },
    },
};

const PASSWORD_MASK = "*".repeat(10);

const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

export const PassCard = (props) => {
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const [isEdit, setIsEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleCopy = async (value) => {
        if (isEdit) return; // Prevent copying when in edit mode
        await navigator.clipboard.writeText(value);
        props.onCopy();
    };

    const handleEdit = () => {
        if (isEdit) handleUpdate();
        setIsEdit(!isEdit);
    };

    const handleUpdate = async () => {
        // Read edits from the DOM on save; syncing state on every keystroke
        // re-renders the contentEditable and resets the caret
        const newUsername = usernameRef.current.innerText;
        const newPassword = passwordRef.current.innerText;
        setUsername(newUsername);
        setPassword(newPassword);

        const docRef = doc(db, "passDb", props.docId);
        await updateDoc(docRef, {
            username: newUsername,
            password: newPassword,
        });
    };

    // Editing always works on the real password, never on the mask
    const passwordText = isEdit || showPassword ? password : PASSWORD_MASK;

    return (
        <motion.div className="pass-card" variants={fadeSlide}>
            <motion.div className="pass-header">
                <span className="pass-avatar">
                    {props.name?.charAt(0).toUpperCase()}
                </span>
                <p className="pass-name" title={props.name}>
                    {props.name}
                </p>
            </motion.div>
            <motion.p className="pass-username pass-info">
                <span className="pass-label">Username</span>
                <span
                    // Remount on mode switch so React never patches user-edited DOM
                    key={isEdit ? "edit" : "view"}
                    ref={usernameRef}
                    onClick={() => handleCopy(username)}
                    contentEditable={isEdit}
                    suppressContentEditableWarning
                    className={`pass-value ${isEdit ? "is-editing" : "is-pointer"}`}
                >
                    {username}
                    {!isEdit && <span className="copy-icon"></span>}
                </span>
            </motion.p>
            <motion.p className="pass-password pass-info">
                <span className="pass-label">Password</span>
                <span className="pass-field">
                    <span
                        key={isEdit ? "edit" : "view"}
                        ref={passwordRef}
                        onClick={() => handleCopy(password)}
                        contentEditable={isEdit}
                        suppressContentEditableWarning
                        className={`pass-value ${isEdit ? "is-editing" : "is-pointer"}`}
                    >
                        {passwordText}
                        {!isEdit && <span className="copy-icon"></span>}
                    </span>
                    {!isEdit && (
                        <button
                            type="button"
                            className="pass-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            title={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                    )}
                </span>
            </motion.p>

            <motion.div className="pass-actions">
                <motion.button
                    className="pass-edit pass-action"
                    onClick={handleEdit}
                >
                    {isEdit ? "Save" : "Edit"}
                </motion.button>
                <motion.button
                    className="pass-delete pass-action"
                    onClick={props.onDelete}
                >
                    Delete
                </motion.button>
            </motion.div>
        </motion.div>
    );
};
