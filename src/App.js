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
import Classroom from './pages/Classroom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { userEmail } from './pages/Home';
import { userEmailFromProfile } from './pages/Profile';
import { userEmailFromNotes } from './pages/Notes';
import { userEmailFromSettings } from './pages/Settings';
import { userEmailFromClassroom } from './pages/Classroom';
import { userEmailFromCourses } from './pages/Courses';
import { userEmailFromLessonList } from './pages/LessonList';
import { userEmailFromLessons } from './pages/Lessons';

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
      <Header handleMenuClick={handleMenuClick}  menuStatus={showMenu} showPrimaryNavigation={showPrimaryNavigation}/> 
      <Navigation email={userEmail || userEmailFromClassroom || userEmailFromNotes || userEmailFromProfile || userEmailFromSettings || userEmailFromCourses || userEmailFromLessonList || userEmailFromLessons} showPrimaryNavigation={showPrimaryNavigation}/>
      <Router>
            <Routes>
              <Route path="/" element={<LoginAndReg menu={hideMenu}/>} />
              <Route path="/home/:email" element={<Home menu={displayMenu} />} />
              <Route path="/lessons/:chapterDetails/:email" element={<Lessons menu={displayMenu} />} />
              <Route path="/profile/:email" element={<Profile menu={displayMenu} email={userEmail}/>}/>
              <Route path="/notes/:email" element={<Notes menu={displayMenu} />}/>
              <Route path="/courses/:email" element={<Courses menu={displayMenu}  />}/>
              <Route path="/course/:name/:email" element={<LessonList menu={displayMenu}/>}/>
              <Route path="/settings/:email" element={<Settings menu={displayMenu}/>}/>
              <Route path="/classroom/:email" element={<Classroom />}/>
            </Routes>
      </Router>
    </div>
  );
}
