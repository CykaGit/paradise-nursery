import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard';
import { plants, categories } from '../../data/plants';
import './Products.css';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const { selected: selectedCurrency, currencies } = useSelector(state => state.currency);

  const filteredPlants = Object.values(plants)
    .flat()
    .filter(plant => {
      const matchesCategory = selectedCategory === 'All' || plant.category === selectedCategory;
      const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase());
      const plantPrice = plant.price * currencies[selectedCurrency].rate; // Convert price to selected currency
      const matchesPriceRange = (
        (!priceRange.min || plantPrice >= Number(priceRange.min)) &&
        (!priceRange.max || plantPrice <= Number(priceRange.max))
      );
      return matchesCategory && matchesSearch && matchesPriceRange;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price * currencies[selectedCurrency].rate) - (b.price * currencies[selectedCurrency].rate);
        case 'price-high':
          return (b.price * currencies[selectedCurrency].rate) - (a.price * currencies[selectedCurrency].rate);
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const handleClearPriceRange = () => {
    setPriceRange({ min: '', max: '' }); // Reset price range inputs
  };

  const handleClearSearch = () => {
    setSearchQuery(''); // Clear the search input
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <div className="search-and-filters">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search plants..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleClearSearch} className="clear-search-btn">❌</button>
            </div>
            <div className="filters">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="price-input"
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="price-input"
                />
                <button onClick={handleClearPriceRange} className="clear-price-btn">❌</button>
              </div>
            </div>
          </div>
        </div>
        <div className="categories">
          <button 
            className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {filteredPlants.map(plant => (
            <ProductCard 
              key={plant.id}
              plant={plant}
              currency={selectedCurrency}
              currencyData={currencies[selectedCurrency]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products; 