import { motion } from "framer-motion";
import { useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

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

export const PassCard = (props) => {
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");

    const [isCopied, setIsCopied] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const handleCopy = async (e) => {
        if (isEdit) return; // Prevent copying when in edit mode
        await navigator.clipboard.writeText(e.currentTarget.innerText);
        setIsCopied(true);
    };

    const handleEdit = () => {
        if (isEdit) handleUpdate();
        setIsEdit(!isEdit);
    };

    const handleUpdate = async () => {
        const docRef = doc(db, "passDb", props.docId);
        await updateDoc(docRef, {
            username: currentUsername,
            password: currentPassword,
        });
    };

    const handleUsernameInput = (e) => {
        setCurrentUsername(e.target.innerText);
    };

    const handlePasswordInput = (e) => {
        setCurrentPassword(e.target.innerText);
    };

    return (
        <motion.div className="pass-card" variants={fadeSlide}>
            <motion.p className="pass-name pass-info">
                Name/Site: <span>{props.name}</span>
            </motion.p>
            <motion.p className="pass-username pass-info">
                Username:
                <span
                    onClick={handleCopy}
                    contentEditable={isEdit}
                    className={isEdit ? "" : "is-pointer"}
                    onInput={handleUsernameInput}
                >
                    {props.username}
                    {!isEdit && <span className="copy-icon"></span>}
                </span>
            </motion.p>
            <motion.p className="pass-password pass-info">
                Password:
                <span
                    onClick={handleCopy}
                    contentEditable={isEdit}
                    className={isEdit ? "" : "is-pointer"}
                    onInput={handlePasswordInput}
                >
                    {props.password}
                    {!isEdit && <span className="copy-icon"></span>}
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
