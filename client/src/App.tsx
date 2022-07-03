import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Registration from './pages/Registration/Registration'
import WorkSpace from './pages/WorkSpace/WorkSpace'
import { IRouter, publicRouters } from './router'

function App() {
    return (
        <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/workSpace" element={<WorkSpace />} />
        </Routes>
    )
}

export default App
