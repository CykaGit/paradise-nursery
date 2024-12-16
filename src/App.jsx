import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <div className="app">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
