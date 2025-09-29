import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Services from "./components/Services"
import Work from "./components/Work"
import Contact from "./components/Contact"
import ChatBot from "./components/ChatBot"
import RatingTestimonial from "./components/RatingTestimonial"
import TestimonialList from "./components/TestimonialList"

const App = () => {
  return (
    <div className="bg-[#0e0c1e]">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Work />
      <RatingTestimonial />
      <TestimonialList showPending={true} />
      <Contact />
      <ChatBot />
    </div>
  )
}

export default App
