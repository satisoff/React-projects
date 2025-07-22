import "./App.css";
import { Title } from "./Components/title";
import { PassDetails } from "./Components/PassDetails";
import { Login } from "./Components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ScratchNew } from "./Components/ScratchNew";

function App() {
    return (
        <div>
            <Router>
                <Title />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PassDetails />} />
                    <Route path="/add" element={<ScratchNew />} />
                </Routes>
            </Router>
            {/* Additional components can be added here */}
        </div>
    );
}

export default App;
