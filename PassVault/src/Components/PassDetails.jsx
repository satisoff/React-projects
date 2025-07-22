import { useEffect, useState } from "react";
import { PassCard } from "./PassCard";
import { motion } from "framer-motion";
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

export const PassDetails = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) navigate("/login");
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

    return (
        <motion.div
            className="pass-container"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
        >
            {cardsList.map((card) => (
                <PassCard
                    key={card.docId}
                    docId={card.docId}
                    name={card.name}
                    username={card.username}
                    password={card.password}
                    onDelete={() => handleDelete(card.docId)}
                />
            ))}
        </motion.div>
    );
};
