import './index.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.js'
import Login from './pages/auth/login.js'
import Signup from './pages/auth/signup.js'
import Profile from './pages/profile/profile.js'
import Marketplace from './pages/marketplace/marketplace.js'
import Projects from './pages/projects/projects.js'
import Events from './pages/events/events.js'
import Library from './pages/library/library.js';

function App() {
  return (
    <div className="App">
      <Router>
          {/* <Home /> */}
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/events" element={<Events />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/library" element={<Library />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
