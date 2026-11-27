import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import Ambient from "./components/Ambient";
import Marquee from "./components/Marquee";
import Hero from "./sections/Hero/Hero";
import Roster from "./sections/Roster/Roster";
import BattleCup from "./sections/BattleCup/BattleCup";
import Gallery from "./sections/Gallery/Gallery";
import Comments from "./components/Comments";
import Footer from "./components/Footer";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Ambient />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Roster />
        <BattleCup />
        <Gallery />
        <Comments />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
