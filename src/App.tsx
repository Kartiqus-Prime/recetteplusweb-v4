
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseAuthProvider } from '@/contexts/SupabaseAuthContext';
import { Toaster } from '@/components/ui/toaster';

// Pages publiques
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Recipes from '@/pages/Recipes';
import RecipeDetail from '@/pages/RecipeDetail';
import Videos from '@/pages/Videos';
import VideoDetail from '@/pages/VideoDetail';
import Cart from '@/pages/Cart';
import PreconfiguredCarts from '@/pages/PreconfiguredCarts';
import Favorites from '@/pages/Favorites';
import About from '@/pages/About';
import DownloadApp from '@/pages/DownloadApp';
import MobileRedirect from '@/pages/MobileRedirect';
import Profile from '@/pages/Profile';

// Pages d'authentification
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import VerifyEmail from '@/pages/VerifyEmail';
import PhoneAuth from '@/pages/PhoneAuth';

// Pages d'administration
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UserManagement from '@/pages/admin/UserManagement';
import ProductManagement from '@/pages/admin/ProductManagement';
import RecipeManagement from '@/pages/admin/RecipeManagement';
import VideoManagement from '@/pages/admin/VideoManagement';
import CategoryManagement from '@/pages/admin/CategoryManagement';
import NewsletterManagement from '@/pages/admin/NewsletterManagement';
import OrderManagement from '@/pages/admin/OrderManagement';
import DeliveryManagement from '@/pages/admin/DeliveryManagement';
import DataSeeding from '@/pages/admin/DataSeeding';

// Autres pages
import DeliveryDashboard from '@/pages/DeliveryDashboard';
import NotFound from '@/pages/NotFound';

// Composants utilitaires
import ProtectedRoute from '@/components/ProtectedRoute';
import AccessDenied from '@/components/AccessDenied';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseAuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/videos/:id" element={<VideoDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/preconfigured-carts" element={<PreconfiguredCarts />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/about" element={<About />} />
              <Route path="/download" element={<DownloadApp />} />
              <Route path="/mobile" element={<MobileRedirect />} />

              {/* Routes d'authentification */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/phone-auth" element={<PhoneAuth />} />

              {/* Routes protégées */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

              {/* Routes d'administration */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="recipes" element={<RecipeManagement />} />
                <Route path="videos" element={<VideoManagement />} />
                <Route path="categories" element={<CategoryManagement />} />
                <Route path="newsletters" element={<NewsletterManagement />} />
                <Route path="orders" element={<OrderManagement />} />
                <Route path="deliveries" element={<DeliveryManagement />} />
                <Route path="data-seeding" element={<DataSeeding />} />
              </Route>

              {/* Routes de livraison */}
              <Route 
                path="/delivery-dashboard" 
                element={
                  <ProtectedRoute>
                    <DeliveryDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Pages d'erreur */}
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
        <Toaster />
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
