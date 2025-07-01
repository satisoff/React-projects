import "./Hero.css"
import dark_arrow from "../../assets/dark-arrow.png"

function Hero() {
    return (
        <div className="hero container">
            <div className="hero-text">
                <h1>
                    We ensure better education for a better world.
                </h1>
                <p>
                    Out cutting-edge curriculum is designed to empower students with knowledge, skills & experiences needed to excel in the dynamic field of education.
                </p>
                <button className="btn">
                    Explore more
                    <img src={dark_arrow} alt="Arrow Icon" />
                </button>
            </div>            
        </div>
    );
}

export default Hero