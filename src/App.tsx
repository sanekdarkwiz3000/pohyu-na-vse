import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero/Hero";
import Roster from "./sections/Roster/Roster";
import Gallery from "./sections/Gallery/Gallery";

function App() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Roster />
      <Gallery />
    </>
  );
}

export default App;