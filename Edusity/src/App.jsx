import Navbar from "./Components/Navbar/Navbar"
import Hero from "./Components/Hero/Hero"
import Program from "./Components/Programs/Programs"
import Title from "./Components/Title/Title"
import About from "./Components/About/About"
import Campus from "./Components/Campus/Campus"
import Testimonials from "./Components/Testimonials/Testimonials"
import Contact from "./Components/Contact/Contact"
import Footer from "./Components/Footer/Footer"
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer"
import { useState } from "react"

const App = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <>
    <Navbar></Navbar>
    <Hero></Hero>
    <div className="container">
      <Title subTitle="Our PROGRAM" title="What we offer"></Title>
      <Program></Program>
      <About setPlayVideo={setPlayVideo}></About>
      <Title subTitle="Gallery" title="Campus Photos"></Title>
      <Campus></Campus>
      <Title subTitle="TESTIMONIALS" title="What Student Says"></Title>
      <Testimonials></Testimonials>
      <Title subTitle="CONTACT US" title="Get in Touch"></Title>
      <Contact></Contact>
      <Footer></Footer>
      <VideoPlayer playVideo={playVideo} setPlayVideo={setPlayVideo}></VideoPlayer>
    </div>
    </>
  )
}

export default App