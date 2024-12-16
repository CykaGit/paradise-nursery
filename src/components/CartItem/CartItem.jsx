import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import './CartItem.css';

function CartItem({ item, currency, currencyData }) {
  const dispatch = useDispatch();
  const { symbol, rate } = currencyData;
  const convertedPrice = (item.price * rate).toFixed(2);
  const totalPrice = (item.price * item.quantity * rate).toFixed(2);

  const handleQuantityChange = (newQuantity) => {
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="cart-item-price">{symbol}{convertedPrice}</p>
      </div>
      <div className="cart-item-quantity">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="quantity-btn"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      <div className="cart-item-total">
        <p>{symbol}{totalPrice}</p>
      </div>
      <button onClick={handleRemove} className="remove-btn">
        <span className="material-icons">delete</span>
      </button>
    </div>
  );
}

export default CartItem; 