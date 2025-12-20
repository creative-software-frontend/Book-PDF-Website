import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar quantity={cartItems.length} />
      <Outlet context={{ cartItems, setCartItems }} />
    </div>
  );
}

export default App;
