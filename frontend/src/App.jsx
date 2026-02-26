import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ModulePage from './pages/ModulePage';
import ProtectedRouter from './components/ProtectedRouter';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRouter><Dashboard /></ProtectedRouter>} />
        <Route path="/module/:entity" element={<ProtectedRouter><ModulePage /></ProtectedRouter>} />
      </Routes>
    </Router>
  )
}

export default App
