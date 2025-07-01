
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Recipes from '@/pages/Recipes';
import RecipeDetail from '@/pages/RecipeDetail';
import Videos from '@/pages/Videos';
import VideoDetail from '@/pages/VideoDetail';
import Cart from '@/pages/Cart';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import About from '@/pages/About';
import PreconfiguredCarts from '@/pages/PreconfiguredCarts';
import Favorites from '@/pages/Favorites';
import NotFound from '@/pages/NotFound';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UserManagement from '@/pages/admin/UserManagement';
import ProductManagement from '@/pages/admin/ProductManagement';
import RecipeManagement from '@/pages/admin/RecipeManagement';
import VideoManagement from '@/pages/admin/VideoManagement';
import CategoryManagement from '@/pages/admin/CategoryManagement';
import OrderManagement from '@/pages/admin/OrderManagement';
import DeliveryManagement from '@/pages/admin/DeliveryManagement';
import NewsletterManagement from '@/pages/admin/NewsletterManagement';
import DeliveryDashboard from '@/pages/DeliveryDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/AdminLayout';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produits" element={<Products />} />
                <Route path="/produits/:id" element={<ProductDetail />} />
                <Route path="/recettes" element={<Recipes />} />
                <Route path="/recettes/:id" element={<RecipeDetail />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/videos/:id" element={<VideoDetail />} />
                <Route path="/panier" element={<Cart />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/paniers-preconfigures" element={<PreconfiguredCarts />} />
                <Route path="/favoris" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/delivery" 
                  element={
                    <ProtectedRoute requiredRole="delivery_person">
                      <DeliveryDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><AdminDashboard /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><UserManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/products" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><ProductManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/recipes" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><RecipeManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/videos" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><VideoManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/categories" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><CategoryManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/orders" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><OrderManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/delivery" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><DeliveryManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/newsletter" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout><NewsletterManagement /></AdminLayout>
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </Router>
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
