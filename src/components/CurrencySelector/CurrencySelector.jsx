import { useSelector, useDispatch } from 'react-redux';
import { setCurrency } from '../../store/slices/currencySlice';
import './CurrencySelector.css';

function CurrencySelector() {
  const dispatch = useDispatch();
  const { selected, currencies } = useSelector(state => state.currency);

  const handleChange = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  return (
    <select 
      className="currency-selector"
      value={selected}
      onChange={handleChange}
    >
      {Object.entries(currencies).map(([code, { symbol }]) => (
        <option key={code} value={code}>
          {code} {symbol}
        </option>
      ))}
    </select>
  );
}

export default CurrencySelector; 