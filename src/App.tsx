import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import ProductsDetails from './pages/products/product-details/ProductsDetails';
import Navigation from './components/navigation/Navigation';
import { LastVisitedProductProvider } from './contexts/LastVisitedProductContext';

function App() {
  return (
    <LastVisitedProductProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductsDetails />} />
      </Routes>
    </LastVisitedProductProvider>
  );
}

export default App;
