import { motion } from "framer-motion";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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

export const ScratchNew = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const passRef = collection(db, "passDb");

    const schema = yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const saveData = async (data) => {
        await addDoc(passRef, {
            userId: user?.uid,
            ...data,
        });
        console.log("Saved");
        navigate("/");
    };

    return (
        <motion.div
            className="scratch-new"
            // variants={fadeSlide}
            // initial="initial"
            // whileInView="animate"
        >
            <form className="scratch-form" onSubmit={handleSubmit(saveData)}>
                <motion.p>
                    Name/Site:{" "}
                    <input
                        type="text"
                        placeholder="google.com"
                        {...register("name")}
                    />
                </motion.p>
                <motion.p>
                    Username:{" "}
                    <input
                        type="text"
                        placeholder="john.doe@example.com"
                        {...register("username")}
                    />
                </motion.p>
                <motion.p>
                    Password:{" "}
                    <input
                        type="text"
                        placeholder="abcd@1234"
                        {...register("password")}
                    />
                </motion.p>
                <button type="submit" value="Save" className="scratch-submit">
                    Save
                </button>
            </form>
        </motion.div>
    );
};
