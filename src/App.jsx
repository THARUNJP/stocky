import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './components/register/index';
import LoginPage from './components/Login/index';
import Home from "./components/home/index"

const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>
);


export default App;