import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Recipes from './pages/Recipes';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import ProductDetails from './pages/ProductDetails';
import RecipeDetails from './pages/RecipeDetails';
import CategoryView from './pages/CategoryView';
import ProtectedRoute from './components/ProtectedRoute';
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
      <SupabaseAuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/categories/:category" element={<CategoryView />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
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
      </SupabaseAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
