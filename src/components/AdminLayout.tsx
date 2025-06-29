
import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useCurrentUserPermissions } from '@/hooks/useAdminPermissions';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ChefHat, 
  Video, 
  ShoppingCart, 
  Truck,
  Database,
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { data: permissions } = useCurrentUserPermissions();
  const { logout } = useAuth();

  if (!permissions) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Accès refusé</h1>
          <p className="text-gray-600">Vous n'avez pas les permissions nécessaires pour accéder à cette section.</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      path: '/admin',
      label: 'Tableau de bord',
      icon: LayoutDashboard,
      show: true
    },
    {
      path: '/admin/users',
      label: 'Utilisateurs',
      icon: Users,
      show: permissions.can_manage_users || permissions.is_super_admin
    },
    {
      path: '/admin/products',
      label: 'Produits',
      icon: Package,
      show: permissions.can_manage_products || permissions.is_super_admin
    },
    {
      path: '/admin/recipes',
      label: 'Recettes',
      icon: ChefHat,
      show: permissions.can_manage_recipes || permissions.is_super_admin
    },
    {
      path: '/admin/videos',
      label: 'Vidéos',
      icon: Video,
      show: permissions.can_manage_videos || permissions.is_super_admin
    },
    {
      path: '/admin/orders',
      label: 'Commandes',
      icon: ShoppingCart,
      show: permissions.can_manage_orders || permissions.can_validate_orders || permissions.is_super_admin
    },
    {
      path: '/admin/deliveries',
      label: 'Livraisons',
      icon: Truck,
      show: permissions.can_manage_deliveries || permissions.is_super_admin
    },
    {
      path: '/admin/categories',
      label: 'Catégories',
      icon: Settings,
      show: permissions.can_manage_categories || permissions.is_super_admin
    },
    {
      path: '/admin/data-seeding',
      label: 'Données de Test',
      icon: Database,
      show: permissions.is_super_admin
    }
  ];

  const visibleMenuItems = menuItems.filter(item => item.show);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Administration</h1>
        </div>
        
        <nav className="mt-6">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-50 border-r-2 border-orange-500 text-orange-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
          
          <button
            onClick={logout}
            className="w-full flex items-center px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
