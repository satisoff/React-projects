import "./Testimonials.css"
import next_icon from "../../assets/next-icon.png"
import back_icon from "../../assets/back-icon.png"
import user_1 from "../../assets/user-1.png"
import user_2 from "../../assets/user-2.png"
import user_3 from "../../assets/user-3.png"
import user_4 from "../../assets/user-4.png"
import { useRef } from "react"

function Testimonials() {
    const ulRef = useRef(null);
    let tx=0;           //initial translation is 0

    function slideForward() {
        if (tx===-50) return;
        tx-=25;
        ulRef.current.style.transform = `translateX(${tx}%)`;
    }
    function slideBackward() {
        if (tx===0) return;
        tx+=25
        ulRef.current.style.transform = `translateX(${tx}%)`;
    }

    return(
        <div className="testimonials">
            <img src={next_icon} alt="" className="next-btn" onClick={slideForward}/>
            <img src={back_icon} alt="" className="back-btn" onClick={slideBackward}/>
            <div className="slider">
                <ul ref={ulRef}>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_1} alt="" />
                                <div>
                                    <h3>William Jackson</h3>
                                    <span>Edusity, USA</span>
                                </div>
                            </div>
                            <p>
                                Choosing to pursue my my degree at Edusity was one of the best decisions I've ever made. The supportive community, state-of-the-art facilities, and commitment to academic excellence have truly exceeded my expectations.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_2} alt="" />
                                <div>
                                    <h3>William Jackson</h3>
                                    <span>Edusity, USA</span>
                                </div>
                            </div>
                            <p>
                                Choosing to pursue my my degree at Edusity was one of the best decisions I've ever made. The supportive community, state-of-the-art facilities, and commitment to academic excellence have truly exceeded my expectations.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_3} alt="" />
                                <div>
                                    <h3>William Jackson</h3>
                                    <span>Edusity, USA</span>
                                </div>
                            </div>
                            <p>
                                Choosing to pursue my my degree at Edusity was one of the best decisions I've ever made. The supportive community, state-of-the-art facilities, and commitment to academic excellence have truly exceeded my expectations.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="slide">
                            <div className="user-info">
                                <img src={user_4} alt="" />
                                <div>
                                    <h3>William Jackson</h3>
                                    <span>Edusity, USA</span>
                                </div>
                            </div>
                            <p>
                                Choosing to pursue my my degree at Edusity was one of the best decisions I've ever made. The supportive community, state-of-the-art facilities, and commitment to academic excellence have truly exceeded my expectations.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Testimonials