import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/register';
import LoginPage from './components/Login';


const App = () => (
  <Router>
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
);

export default App;