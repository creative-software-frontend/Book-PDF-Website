import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../page/home/Home';
import OrderComplete from '../page/order-complete/OrderComplete';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        // path: 'order-complete',
        element: <OrderComplete />,
      },
    ],
  },
]);

export default router;
