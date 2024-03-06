import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Login from './pages/Login.js'; 
import Dashboard from './pages/Dashboard.js'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Your other routes... */}
      </Routes>
    </Router>
  );
}

export default App;