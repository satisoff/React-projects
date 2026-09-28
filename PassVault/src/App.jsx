import "./App.css";
import { useState } from "react";
import { Title } from "./Components/Title";
import { PassDetails } from "./Components/PassDetails";
import { Main } from "./Components/Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ScratchNew } from "./Components/ScratchNew";

function App() {
    const [search, setSearch] = useState("");

    return (
        <div>
            <Router>
                <Title search={search} onSearchChange={setSearch} />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/card" element={<PassDetails search={search} />} />
                    <Route path="/add" element={<ScratchNew />} />
                </Routes>
            </Router>
            {/* Additional components can be added here */}
        </div>
    );
}

export default App;
