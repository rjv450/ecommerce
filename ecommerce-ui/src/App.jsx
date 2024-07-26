
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import ProductDetail from './components/ProductDetailed';
import LayoutWithNavBar from './components/LayoutWithNavBar';
import ProductManagementDashboard from './pages/ProductManagement';
import Checkout from './components/Cart';
import CartUpdater from './components/CartUpdater';


function App() {;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<LayoutWithNavBar />}>
    
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/product-management" element={<ProtectedRoute element={<ProductManagementDashboard />} />} />
            <Route path="/product/:productId" element={<ProtectedRoute element={<ProductDetail />} />} />
            <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          </Route>

        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </div>
  )
}

export default App
