import './App.css';
import { useState } from "react";
import LoginAndReg from './pages/LoginAndReg';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Profile from './pages/Profile';
import Notes from './pages/Notes';
import Courses from './pages/Courses';
import LessonList from './pages/LessonList';
import Settings from './pages/Settings';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function App() {
  const [showPrimaryNavigation, setShowPrimaryNavigation] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  function hideMenu(){
    setShowMenu(false);
  }
  function displayMenu(){
setShowMenu(true)  
}

  function handleMenuClick(){
    setShowPrimaryNavigation(!showPrimaryNavigation);
  }
  return (
    <div className="App">
      <Header handleMenuClick={handleMenuClick}  menuStatus={showMenu}/>
      <Navigation showPrimaryNavigation={showPrimaryNavigation}/>
      <Router>
            <Routes>
              <Route path="/" element={<LoginAndReg menu={hideMenu}/>} />
              <Route path="/home/:email" element={<Home menu={displayMenu}/>} />
              <Route path="/lessons/:chapterDetails" element={<Lessons menu={displayMenu} />} />
              <Route path="/profile" element={<Profile menu={displayMenu}/>}/>
              <Route path="/notes/:email" element={<Notes menu={displayMenu} />}/>
              <Route path="/courses" element={<Courses menu={displayMenu} />}/>
              <Route path="/course/:name" element={<LessonList menu={displayMenu}/>}/>
              <Route path="/settings/:email" element={<Settings menu={displayMenu}/>}/>
            </Routes>
      </Router>
    </div>
  );
}
