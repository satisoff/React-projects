import "./About.css"
import about_img from "../../assets/about.png"
import play_icon from "../../assets/play-icon.png"

function About({setPlayVideo}) {
    return (
        <div className="about">
            <div className="about-left">
                <img src={about_img} alt="About Image" className="about-img"/>
                <img src={play_icon} alt="Play Icon" className="play-icon" onClick={() => {setPlayVideo(true)}}/>
            </div>
            <div className="about-right">
                <h3>ABOUT UNIVERSITY</h3>
                <h2>Nurturing Tomorrow's Leaders Today</h2>
                <p>Embark on a transformative educational journey with our univerity's comprehensive education programs. Our cutting-edge curriculum is designed to empower students with the knowledge, skills & experiences needed to excel in the dynamic field of education</p>
                <p>With a focus on innovation, hands-on learning, and personalized mentorship, our programs prepare aspiring educators to make a meaningful impact in classrooms, schools & communities.</p>
                <p>Whether you aspire to become a teacher, administrator, counselor, or educational leader, our diverse range of programs offers the perfect pathway to achieve your goals and unlock your full potential in shaping the future of education.</p>
            </div>
        </div>
    )
}

export default About