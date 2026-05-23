import React, { useState, useEffect } from 'react';

const ProductDetails = ({ match, history }) => {
  const { id } = match.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-details">
      <button className="btn" onClick={() => history.push('/')}>Back</button>
      <div style={{ marginTop: '20px' }}>
        <img src={product.thumbnail} alt={product.title} style={{ width: '300px' }} />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>Price: ${product.price}</h3>
      </div>
    </div>
  );
};

export default ProductDetails;