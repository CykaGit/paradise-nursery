import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CurrencySelector from '../CurrencySelector';
import './Header.css';

function Header() {
  const cartItems = useSelector(state => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1 className="company-name">Plantify</h1>
        </Link>
        <nav className="nav">
          <CurrencySelector />
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/cart" className="cart-icon">
            <span className="material-icons">shopping_cart</span>
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header; 