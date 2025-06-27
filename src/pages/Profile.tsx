
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Save, 
  Camera,
  Heart,
  ShoppingCart,
  Clock,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: currentUser?.user_metadata?.display_name || currentUser?.user_metadata?.full_name || '',
    email: currentUser?.email || '',
    phone: '',
    address: ''
  });

  const handleSave = () => {
    // Here you would typically save to your profiles table
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été sauvegardées avec succès."
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Recettes favorites', value: '24', icon: Heart, color: 'text-red-500' },
    { label: 'Commandes', value: '8', icon: ShoppingCart, color: 'text-green-500' },
    { label: 'Temps de cuisine', value: '45h', icon: Clock, color: 'text-blue-500' },
    { label: 'Note moyenne', value: '4.8', icon: Star, color: 'text-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Mon Profil
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage 
                      src={currentUser?.user_metadata?.avatar_url} 
                      alt={formData.displayName} 
                    />
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl">
                      {formData.displayName?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {formData.displayName || 'Utilisateur'}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {formData.email}
                </CardDescription>
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 mt-2">
                  Membre depuis 2024
                </Badge>
              </CardHeader>
            </Card>

            {/* Stats */}
            <Card className="mt-6 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <span className="text-sm text-gray-600">{stat.label}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      Informations personnelles
                    </CardTitle>
                    <CardDescription>
                      Gérez vos informations personnelles et vos préférences de compte
                    </CardDescription>
                  </div>
                  <Button
                    onClick={isEditing ? handleSave : () => setIsEditing(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </>
                    ) : (
                      <>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Modifier
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personnel</TabsTrigger>
                    <TabsTrigger value="preferences">Préférences</TabsTrigger>
                    <TabsTrigger value="security">Sécurité</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="displayName" className="text-sm font-medium text-gray-700">
                          Nom d'affichage
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="displayName"
                            value={formData.displayName}
                            onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                            disabled={!isEditing}
                            className="pl-10 border-orange-200 focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Adresse email
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            disabled
                            className="pl-10 bg-gray-50 border-gray-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Téléphone
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            disabled={!isEditing}
                            className="pl-10 border-orange-200 focus:border-orange-500"
                            placeholder="+223 XX XX XX XX"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                          Adresse
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            disabled={!isEditing}
                            className="pl-10 border-orange-200 focus:border-orange-500"
                            placeholder="Votre adresse de livraison"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preferences" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Préférences culinaires</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Plats épicés', 'Végétarien', 'Sans gluten', 'Cuisine traditionnelle', 'Plats rapides'].map((pref) => (
                          <Badge 
                            key={pref}
                            variant="outline"
                            className="cursor-pointer hover:bg-orange-100 hover:border-orange-300"
                          >
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Nouvelles recettes</span>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Promotions</span>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Suivi de commande</span>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Sécurité du compte</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start hover:bg-orange-50 border-orange-200">
                          Changer le mot de passe
                        </Button>
                        <Button variant="outline" className="w-full justify-start hover:bg-orange-50 border-orange-200">
                          Authentification à deux facteurs
                        </Button>
                        <Button variant="outline" className="w-full justify-start hover:bg-orange-50 border-orange-200">
                          Sessions actives
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
