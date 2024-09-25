import './App.css'
import {AboutMe, Contact, Nav, Projects, Whatiuse} from "./components";
import { Route, Routes} from "react-router-dom"

function App() {
    return (
        <div>
            <Nav/>
            <Routes>
                <Route path="/" element={<AboutMe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/project" element={<Projects />} />
                <Route path="/whatiuse" element={<Whatiuse />} />
            </Routes>
        </div>
    )
}

export default App
