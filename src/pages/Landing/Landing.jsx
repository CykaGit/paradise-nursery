import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="landing-title">Welcome to Plantify</h1>
        <p className="landing-description">
          Discover our curated collection of beautiful houseplants that bring life 
          and freshness to your space. From easy-care succulents to exotic tropical 
          varieties, find the perfect green companion for your home.
        </p>
        <Link to="/products" className="get-started-btn">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Landing; 