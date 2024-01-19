import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { Container, Card, Table, Row, Col } from 'react-bootstrap';

import { formatMoney } from './utils';

// ... (previous imports)

const ItemList = ({ items, onItemSelect, onItemSell, cart }) => (
  <div>
    <div className="item-grid">
      {items.map((item, index) => (
        <div key={index} className="item-card">
          <img src={item.image} alt={item.name} />
          <div>
            <p>{item.name}</p>
            <p>{formatMoney(item.price)} spent</p>
            <div className="quantity-controls">
              <div className="button-container">
                <button onClick={() => onItemSell(item)} className='buttonsell'>Sell</button>
              </div>
              <div>
                <input
                  type="number"
                  value={cart.find((cartItem) => cartItem.name === item.name)?.quantity || 0}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10) || 0;
                    if (newQuantity >= 0) {
                      onItemSelect({ ...item, quantity: newQuantity });
                    }
                  }}
                />
              </div>
              <div className="button-container">
                <button onClick={() => onItemSelect(item)} className='buttonbuy'>Buy</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ... (remaining code)


const Receipt = ({ cart }) => (
  <Card className="total-section">
    <Card.Body>
      <Card.Title>Your Receipt</Card.Title>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>x{item.quantity}</td>
              <td>{formatMoney(item.totalPrice)} spent</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>Total: {formatMoney(cart.reduce((total, item) => total + item.totalPrice, 0))} spent</p>
    </Card.Body>
  </Card>
);

const App = () => {
  const [netWorth, setNetWorth] = useState(240000000000);
  const [cart, setCart] = useState([]);

  const items = [
    { name: 'McLaren GT', price: 540000, image: 'macl.jpg' },
    { name: 'Ferrari', price: 575000, image: 'ferrari.jpg' },
    { name: '10 Kg Gold Bars', price: 620000, image: 'gold.jpg' },
    { name: 'Lamborghini', price: 300000, image: 'lambor.jpg' },
    { name: 'MacBook Pro', price: 3500, image: 'mac.jpg' },
    { name: 'Diamond Necklace', price: 12000, image: 'neck.jpg' },
    { name: 'Vintage Rolex Watch', price: 18000, image: 'rolex.jpg' },
    { name: 'Private Jet', price: 2500000, image: 'jet.jpg' },
    { name: 'Luxury Yacht', price: 2500000, image: 'luxuryyacht.jpg' },
    { name: 'Mansion in Beverly Hills', price: 5000000, image: 'mansion.jpg' },
    { name: 'Platinum Credit Card', price: 100000, image: 'card.jpg' },
    { name: 'Tesla Model X', price: 80000, image: 'tesla.jpg' },
    { name: 'Trip to Space', price: 50000000, image: 'space.jpg' },

    { name: 'Engagement Ring', price: 15000, image: 'ring.jpg' },
    { name: 'Vintage Leather Jacket', price: 1200, image: 'jacket.jpg' },

    { name: 'Designer Sunglasses', price: 500, image: 'glasses.jpg' },

    { name: 'Pet Tiger', price: 150000, image: 'tiger.jpg' },
    { name: 'Private Island Getaway', price: 10000000, image: 'island.jpg' },
    { name: 'V.R Gaming Console', price: 1500, image: 'vr.jpg' },
    { name: 'Custom Designer Shoes', price: 1000, image: 'shoes.jpg' },

    { name: 'Hot Air Balloon Ride', price: 2500, image: 'hot.jpg' },

    { name: 'Rare Gemstone Collection', price: 250000, image: 'gems.jpg' },
    { name: 'Designer Wedding Dress', price: 5000, image: 'wedding.jpg' },

  ];
  
  

  const handleItemSelect = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
      setCart([...cart]);
    } else {
      const newItem = {
        ...item,
        quantity: 1,
        totalPrice: item.price,
      };
      setCart([...cart, newItem]);
    }

    setNetWorth(netWorth - item.price);
  };

  const handleItemSell = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);

    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity -= 1;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
      setCart([...cart]);
      setNetWorth(netWorth + item.price);
    }
  };

  return (
    <div>
      <div className="jumbotron text-center">
        <img
          src="elon.jpg"
          alt="Your Image Alt Text"
          className="img-fluid rounded-circle mb-3"

        />
        <h1 className="display-4">Spend Elon Musk Money</h1>
        <p className="lead">Explore the world of luxury spending!</p>
      </div>
      <Header netWorth={netWorth} />
      <Container style={{ marginTop: '20px' }}>
        <Row>
          <Col xs={12}>
            <ItemList items={items} onItemSelect={handleItemSelect} onItemSell={handleItemSell} cart={cart} />
            <button onClick={() => setCart([])} className='buttonclear'>Clear Cart</button>
            {cart.length > 0 && <Receipt cart={cart} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;