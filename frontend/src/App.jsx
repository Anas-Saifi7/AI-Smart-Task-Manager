import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import TaskDetails from "./pages/TaskDetails";
import Team from "./pages/Team";
import TeamDetails from './pages/TeamDetails'
import TeamChat from './pages/TeamChat'
import CreateTask from './pages/CreateTask'
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import AssignTask from "./pages/AssignTask";
// import Footer from './components/Footer'


const App = () => {

 useEffect(() => {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
}, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
        <Route path = '/dashboard' element = {<Dashboard/>}/>
        <Route path="/task/:id" element={<TaskDetails />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team/:id" element={<TeamDetails />} />
        <Route path="/team-chat" element={<TeamChat/>} />
        <Route path="/create-task" element={<CreateTask />} />
         <Route path="/help" element={<HelpCenter />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path = '/assign-task' element = {<AssignTask/>}/>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  )
}

export default App
