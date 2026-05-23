import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './../styles/App.css';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import AdminPanel from './AdminPanel';

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
          <Link to="/admin">Admin Panel</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/admin" component={AdminPanel} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;