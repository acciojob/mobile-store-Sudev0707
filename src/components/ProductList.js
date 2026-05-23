import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/smartphones')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div className="product-list">
      <h1>Mobile Store</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '250px' }}>
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <h3>{product.title}</h3>
              <p>{product.brand || 'Black'}</p>
              <p>Price: ${product.price}</p>
              <button 
                style={{ 
                  backgroundColor: '#007bff', 
                  color: 'white', 
                  border: 'none', 
                  padding: '5px 10px', 
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Added ${product.title} to cart!`);
                }}
              >
                Buy
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;