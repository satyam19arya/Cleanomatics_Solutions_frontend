import { Route, Routes } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <div>
      <p className="text-red-700 p-2 px-6">Note: I have deployed the backend on Render (free tier). Please be aware that Render spins down a free web service if it goes 15 minutes without receiving inbound traffic. Therefore, you might need to wait 30-40 seconds for it to spin back up and then use the calculator. Thank you for your patience.</p>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;