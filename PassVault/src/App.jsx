import "./App.css";
import { Title } from "./Components/Title";
import { PassDetails } from "./Components/PassDetails";
import { Main } from "./Components/Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ScratchNew } from "./Components/ScratchNew";

function App() {
    return (
        <div>
            <Router>
                <Title />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/card" element={<PassDetails />} />
                    <Route path="/add" element={<ScratchNew />} />
                </Routes>
            </Router>
            {/* Additional components can be added here */}
        </div>
    );
}

export default App;
