import React from 'react'
import './App.css'
import Auth from './pages/Auth/Auth'
import Registration from './pages/Registration/Registration'
import NavPanel from './components/NavPanel/NavPanel'
import { Route, Routes } from 'react-router-dom'

function App() {
    return (
        <Routes>
            <div className="App">
                <NavPanel></NavPanel>
                <Route path="/auth" element={<Auth />} />
                <Route path="/registration" element={<Registration />} />
            </div>
        </Routes>
    )
}

export default App
