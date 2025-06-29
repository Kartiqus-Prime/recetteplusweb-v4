import React, { useState } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUpdateSupabaseProfile } from '@/hooks/useSupabaseProfiles';
import { useUserOrders } from '@/hooks/useOrders';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpdateProfileForm } from '@/components/UpdateProfileForm';
import { OrderStatusCard } from '@/components/OrderStatusCard';
import { DeliveryTracker } from '@/components/DeliveryTracker';
import { ShoppingCart, Plus } from 'lucide-react';
import CreateOrderDialog from '@/components/CreateOrderDialog';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const { data: userProfile, isLoading, refetch } = useUserProfile();
  const updateProfile = useUpdateSupabaseProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  const [formValues, setFormValues] = useState({
    displayName: userProfile?.display_name || '',
    photoURL: userProfile?.photo_url || '',
    dietaryRestrictions: userProfile?.preferences?.dietaryRestrictions || [],
    favoriteCategories: userProfile?.preferences?.favoriteCategories || [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        userId: currentUser!.id,
        data: {
          display_name: formValues.displayName,
          photo_url: formValues.photoURL,
          preferences: {
            dietaryRestrictions: formValues.dietaryRestrictions,
            favoriteCategories: formValues.favoriteCategories,
          },
        },
      });
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const { data: userOrders = [] } = useUserOrders(currentUser?.id);

  const toggleCreateOrder = () => {
    setShowCreateOrder(!showCreateOrder);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <CardTitle>Mon Profil</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nom d'utilisateur:</Label>
                  <p className="font-semibold">{userProfile?.display_name || 'Non défini'}</p>
                </div>
                <div>
                  <Label>Email:</Label>
                  <p className="font-semibold">{currentUser?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="orders">Mes Commandes</TabsTrigger>
              <TabsTrigger value="preferences">Préférences</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informations du Profil</CardTitle>
                </CardHeader>
                <CardContent>
                  <UpdateProfileForm userProfile={userProfile} refetch={refetch} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5" />
                      <span>Mes Commandes</span>
                    </CardTitle>
                    <CreateOrderDialog>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvelle Commande
                      </Button>
                    </CreateOrderDialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {userOrders.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Vous n'avez pas encore passé de commande</p>
                      <CreateOrderDialog>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Passer ma première commande
                        </Button>
                      </CreateOrderDialog>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userOrders.map((order) => (
                        <div key={order.id}>
                          <OrderStatusCard order={order} />
                          {['assigned', 'picked_up', 'in_transit'].includes(order.status) && (
                            <div className="mt-4">
                              <DeliveryTracker orderId={order.id} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Préférences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>Restrictions alimentaires:</Label>
                    <p>{formValues.dietaryRestrictions.join(', ') || 'Aucune'}</p>
                  </div>
                  <div>
                    <Label>Catégories favorites:</Label>
                    <p>{formValues.favoriteCategories.join(', ') || 'Aucune'}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button onClick={handleLogout} variant="destructive">
                    Déconnexion
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
