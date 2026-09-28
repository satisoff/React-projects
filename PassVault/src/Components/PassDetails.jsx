import { useEffect, useRef, useState } from "react";
import { PassCard } from "./PassCard";
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { ScratchNew } from "./ScratchNew";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const TOAST_DURATION = 1500;

export const PassDetails = ({ search = "" }) => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate("/");
    }, []);

    const [cardsList, setCardList] = useState([]);
    const passRef = collection(db, "passDb");

    const [isLoading, setIsLoading] = useState(true);
    const getPassList = async () => {
        if (!user) return;
        setIsLoading(true);
        const q = query(passRef, where("userId", "==", user?.uid));
        const data = await getDocs(q);
        setCardList(data.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
        setIsLoading(false);
    };

    useEffect(() => {
        getPassList();
    }, [user]);

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "passDb", id));
        await getPassList();
    };

    useEffect(() => {
        if (!isLoading && user && cardsList.length === 0) navigate("/add");
    }, [isLoading, user, cardsList]);

    const [showToast, setShowToast] = useState(false);
    const toastTimer = useRef(null);

    // Restart the timer on every copy so back-to-back copies keep one toast up
    const handleCopied = () => {
        clearTimeout(toastTimer.current);
        setShowToast(true);
        toastTimer.current = setTimeout(() => setShowToast(false), TOAST_DURATION);
    };

    useEffect(() => () => clearTimeout(toastTimer.current), []);

    const term = search.trim().toLowerCase();
    const visibleCards = term
        ? cardsList.filter(
              (card) =>
                  card.name?.toLowerCase().includes(term) ||
                  card.username?.toLowerCase().includes(term)
          )
        : cardsList;

    return (
        <>
            <motion.div
                className="pass-container"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {!isLoading && cardsList.length > 0 && visibleCards.length === 0 && (
                    <p className="pass-empty">No cards match "{search.trim()}"</p>
                )}
                {visibleCards.map((card) => (
                    <PassCard
                        key={card.docId}
                        docId={card.docId}
                        name={card.name}
                        username={card.username}
                        password={card.password}
                        onDelete={() => handleDelete(card.docId)}
                        onCopy={handleCopied}
                    />
                ))}
            </motion.div>

            <AnimatePresence>
                {showToast && (
                    <motion.div
                        className="toast"
                        role="status"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        Copied
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
