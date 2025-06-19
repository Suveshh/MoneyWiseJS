import { useState } from "react";
import "./App.css";
import AIChat from "./components/AIAssistant/AIChat";
import OptionsSimulator from "./components/Games/OptionsSimulator";
import StartupIPO from "./components/Games/StartuoIPO";
import CrisisSimulator from "./components/Games/CrisisSimulator";
import BuildPortfolio from "./components/Games/BuildPortfolio";
import TimeTraveler from "./components/Games/TimeTraveler";
import ChartMaster from "./components/Games/ChartMaster";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  return (
    <>
      <AIChat
        isOpen={isOpen}
        isMinimized={isMinimized}
        onClose={() => setIsOpen(false)}
        onToggleMinimize={() => setIsMinimized((prev) => !prev)}
      />
      <CrisisSimulator />
      <BuildPortfolio/>
      <TimeTraveler/>
      <ChartMaster/>
    </>
  );
}

export default App;
