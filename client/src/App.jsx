
import Navbar from "./components/Navbar";
import {Routes,Route} from "react-router-dom";
import Home from './components/pages/Home';
import About from './components/pages/About';
import HowItWork from './components/pages/HowItWork';
import HowToUse from './components/pages/HowToUse';

function App() {
  return (
    <div className="w-[100%]">
        <Navbar />
        <Routes> 
          <Route exact path="/" element={<Home/>}/>
          <Route path="/pages/About" element={<About/>}/>
          <Route path="/pages/HowItWork" element={<HowItWork/>}/>
          <Route path="/pages/HowToUse" element={<HowToUse/>}/>
        </Routes>     
    </div>
  );
}

export default App;
// 