
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/SupabaseAuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Recipes from './pages/Recipes';
import Products from './pages/Products';
import Videos from './pages/Videos';
import Profile from './pages/Profile';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import Favorites from './pages/Favorites';
import DownloadApp from './pages/DownloadApp';
import ProductDetail from './pages/ProductDetail';
import RecipeDetail from './pages/RecipeDetail';
import VideoDetail from './pages/VideoDetail';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RecipeManagement from './pages/admin/RecipeManagement';
import ProductManagement from './pages/admin/ProductManagement';
import VideoManagement from './pages/admin/VideoManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import NewsletterManagement from '@/pages/admin/NewsletterManagement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/apropos" element={<About />} />
              <Route path="/recettes" element={<Recipes />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recette/:id" element={<RecipeDetail />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/produits" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/produit/:id" element={<ProductDetail />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/video/:id" element={<VideoDetail />} />
              <Route path="/download-app" element={<DownloadApp />} />
              <Route path="/telecharger-app" element={<DownloadApp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/favoris" element={<Favorites />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <UserManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/recipes" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <RecipeManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ProductManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/videos" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <VideoManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/categories" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <CategoryManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
              <Route path="/admin/newsletters" element={
                <ProtectedRoute>
                  <AdminLayout>
                    <NewsletterManagement />
                  </AdminLayout>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
