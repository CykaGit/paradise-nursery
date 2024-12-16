import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import './ProductCard.css';

function ProductCard({ plant, currency, currencyData }) {
  const dispatch = useDispatch();
  const { symbol, rate } = currencyData;
  const convertedPrice = (plant.price * rate).toFixed(2);

  const handleAddToCart = () => {
    dispatch(addToCart(plant));
  };

  return (
    <div className="product-card">
      <img src={plant.image} alt={plant.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{plant.name}</h3>
        <p className="product-price">
          {symbol}{convertedPrice}
        </p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard; 