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
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <Link to={`/products/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <h3>{product.title}</h3>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>${product.price}</p>
                <button style={{textDecoration:'none'}} >Buy Now</button>
              </div>

            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;