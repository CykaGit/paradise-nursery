import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import { clearCart } from '../../store/slices/cartSlice';
import './Cart.css';

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { selected: selectedCurrency, currencies } = useSelector(state => state.currency);
  const { symbol, rate } = currencies[selectedCurrency];

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const convertedTotal = (totalPrice * rate).toFixed(2);

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty!</h2>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h2>Shopping Cart ({totalItems} items)</h2>
        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <CartItem 
                key={item.id} 
                item={item}
                currency={selectedCurrency}
                currencyData={currencies[selectedCurrency]}
              />
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Total Items:</span>
              <span>{totalItems}</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount:</span>
              <span>{symbol}{convertedTotal}</span>
            </div>
            <button onClick={handleCheckout} className="checkout-btn">
              Proceed to Checkout
            </button>
            <Link to="/products" className="continue-shopping full-width">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart; 