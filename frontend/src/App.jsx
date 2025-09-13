import { useState } from "react"
import Navbar from "./Components/Navbar"
import { Outlet } from "react-router-dom"

function App() {
  const [transaction, setTransacion] = useState({text: '', amount: ''});
  const [isEditTransac, setIsEditTransc] = useState(false);
  const [editID, setEditID] = useState("");

  return (
    <div className="app_component">
        <Navbar />
        <div className="app">
          <Outlet context={{transaction, setTransacion, isEditTransac, setIsEditTransc, editID, setEditID}}/>
        </div>
    </div>
  )
}

export default App
