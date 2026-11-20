import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero/Hero";
import Roster from "./sections/Roster/Roster";
import BattleCup from "./sections/BattleCup/BattleCup";
import Gallery from "./sections/Gallery/Gallery";
import Comments from "./components/Comments";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Roster />
        <BattleCup />
        <Gallery />
        <Comments />
      </main>
    </MotionConfig>
  );
}

export default App;
