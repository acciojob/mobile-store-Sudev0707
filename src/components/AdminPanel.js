import React, { useState, useEffect } from 'react';

const AdminPanel = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    thumbnail: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('https://dummyjson.com/products/category/smartphones')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    fetch(`https://dummyjson.com/products/${editingProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editingProduct.title,
        description: editingProduct.description,
        price: editingProduct.price,
        thumbnail: editingProduct.thumbnail
      })
    })
      .then(response => response.json())
      .then(updatedProduct => {
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setEditingProduct(null);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price) {
      alert('Please fill in at least name and price');
      return;
    }

    const productToAdd = {
      title: newProduct.title,
      description: newProduct.description || 'No description',
      price: parseFloat(newProduct.price),
      thumbnail: newProduct.thumbnail || 'https://via.placeholder.com/150',
      category: 'smartphones'
    };

    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToAdd)
    })
      .then(response => response.json())
      .then(addedProduct => {
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        const productWithId = { ...addedProduct, id: newId };
        setProducts([...products, productWithId]);
        setNewProduct({ title: '', description: '', price: '', thumbnail: '' });
      })
      .catch(error => {
        console.error('Error adding product:', error);
        // Fallback for demo purposes
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        const productWithId = { ...productToAdd, id: newId };
        setProducts([...products, productWithId]);
        setNewProduct({ title: '', description: '', price: '', thumbnail: '' });
      });
  };

  const handleViewDetails = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      
      <div className="add-product-form" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <h3>Add New Product</h3>
        <input
          className="form-control"
          type="text"
          placeholder="Product Name"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '5px', width: '200px' }}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '5px', width: '200px' }}
        />
        <input
          className="form-control"
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '5px', width: '200px' }}
        />
        <input
          className="form-control"
          type="text"
          placeholder="Image URL"
          value={newProduct.thumbnail}
          onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '5px', width: '200px' }}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <div className="products-list">
        <h3>Products ({products.length})</h3>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{product.title}</strong> - ${product.price}
            </div>
            <div>
              <button 
                onClick={() => handleViewDetails(product.id)}
                style={{ marginRight: '10px' }}
              >
                View Details
              </button>
              <button 
                className="float-right"
                onClick={() => handleEdit(product)}
                style={{ marginRight: '10px' }}
              >
                Edit
              </button>
              <button 
                className="float-right"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="edit-modal" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', border: '1px solid #ccc', zIndex: 1000 }}>
          <h3>Edit Product</h3>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={editingProduct.title}
            onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
            style={{ display: 'block', margin: '10px 0', padding: '5px', width: '250px' }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Description"
            value={editingProduct.description}
            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
            style={{ display: 'block', margin: '10px 0', padding: '5px', width: '250px' }}
          />
          <input
            className="form-control"
            type="number"
            placeholder="Price"
            value={editingProduct.price}
            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
            style={{ display: 'block', margin: '10px 0', padding: '5px', width: '250px' }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Image URL"
            value={editingProduct.thumbnail}
            onChange={(e) => setEditingProduct({ ...editingProduct, thumbnail: e.target.value })}
            style={{ display: 'block', margin: '10px 0', padding: '5px', width: '250px' }}
          />
          <div>
            <button onClick={handleSaveEdit} style={{ marginRight: '10px' }}>Save</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;