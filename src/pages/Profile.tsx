
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useSupabaseProfile, useUpdateSupabaseProfile } from '@/hooks/useSupabaseProfiles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Mail, Bell, Shield, ChefHat, Heart, ShoppingCart, Calendar, Settings } from 'lucide-react';
import { useUpdateUserNewsletterPreference } from '@/hooks/useNewsletters';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { currentUser } = useAuth();
  const { data: profile, isLoading } = useSupabaseProfile(currentUser?.id);
  const updateProfile = useUpdateSupabaseProfile();
  const updateNewsletterPref = useUpdateUserNewsletterPreference();
  const { toast } = useToast();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [bio, setBio] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(profile?.preferences?.dietaryRestrictions || []);
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>(profile?.preferences?.favoriteCategories || []);
  const [isDirty, setIsDirty] = useState(false);

  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setDietaryRestrictions(profile.preferences?.dietaryRestrictions || []);
      setFavoriteCategories(profile.preferences?.favoriteCategories || []);
    }
  }, [profile]);

  useEffect(() => {
    setIsDirty(
      displayName !== (profile?.display_name || '') ||
      JSON.stringify(dietaryRestrictions) !== JSON.stringify(profile?.preferences?.dietaryRestrictions || []) ||
      JSON.stringify(favoriteCategories) !== JSON.stringify(profile?.preferences?.favoriteCategories || [])
    );
  }, [displayName, dietaryRestrictions, favoriteCategories, profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser?.id || !isDirty) return;

    try {
      await updateProfile.mutateAsync({
        userId: currentUser.id,
        data: {
          display_name: displayName,
          preferences: {
            ...profile?.preferences,
            dietaryRestrictions: dietaryRestrictions,
            favoriteCategories: favoriteCategories
          }
        }
      });
      setIsDirty(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil.",
        variant: "destructive"
      });
    }
  };

  const handleNewsletterToggle = async (enabled: boolean) => {
    if (!currentUser?.id || isAdmin) return;
    
    try {
      await updateNewsletterPref.mutateAsync({
        userId: currentUser.id,
        enabled
      });
    } catch (error) {
      console.error('Erreur mise à jour newsletter:', error);
    }
  };

  const availableCategories = [
    'Plats principaux', 'Entrées', 'Desserts', 'Boissons', 'Soupes', 'Grillades', 'Végétarien', 'Traditionnel'
  ];

  const toggleCategory = (category: string) => {
    setFavoriteCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(prev => 
      prev.includes(restriction) 
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  const commonRestrictions = ['Sans gluten', 'Végétarien', 'Végan', 'Sans lactose', 'Halal', 'Sans noix'];

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-8">
            {/* Profile Header */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={currentUser?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-2xl">
                      {displayName?.charAt(0) || currentUser?.email?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {displayName || 'Utilisateur'}
                    </h1>
                    <p className="text-gray-600 mb-4">{currentUser?.email}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Membre depuis {new Date(profile?.created_at || '').toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      </Badge>
                      {isAdmin && (
                        <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-pink-500">
                          <Shield className="h-3 w-3 mr-1" />
                          Administrateur
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="h-5 w-5 text-orange-500" />
                    Informations personnelles
                  </CardTitle>
                  <CardDescription>
                    Modifiez vos informations de profil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom d'affichage</Label>
                      <Input
                        id="name"
                        placeholder="Votre nom d'affichage"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biographie</Label>
                      <Textarea
                        id="bio"
                        placeholder="Parlez-nous de votre passion pour la cuisine..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={!isDirty || updateProfile.isPending} 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      {updateProfile.isPending ? 'Mise à jour...' : 'Mettre à jour le profil'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Settings className="h-5 w-5 text-orange-500" />
                    Préférences culinaires
                  </CardTitle>
                  <CardDescription>
                    Personnalisez votre expérience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Favorite Categories */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Catégories favorites</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableCategories.map((category) => (
                        <Badge
                          key={category}
                          variant={favoriteCategories.includes(category) ? "default" : "outline"}
                          className={`cursor-pointer transition-all ${
                            favoriteCategories.includes(category) 
                              ? "bg-orange-500 hover:bg-orange-600" 
                              : "hover:bg-orange-50"
                          }`}
                          onClick={() => toggleCategory(category)}
                        >
                          <ChefHat className="h-3 w-3 mr-1" />
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Restrictions alimentaires</Label>
                    <div className="flex flex-wrap gap-2">
                      {commonRestrictions.map((restriction) => (
                        <Badge
                          key={restriction}
                          variant={dietaryRestrictions.includes(restriction) ? "default" : "outline"}
                          className={`cursor-pointer transition-all ${
                            dietaryRestrictions.includes(restriction) 
                              ? "bg-green-500 hover:bg-green-600" 
                              : "hover:bg-green-50"
                          }`}
                          onClick={() => toggleDietaryRestriction(restriction)}
                        >
                          {restriction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Communication Preferences - Only for non-admin users */}
            {!isAdmin && (
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Mail className="h-5 w-5 text-orange-500" />
                    Préférences de communication
                  </CardTitle>
                  <CardDescription>
                    Gérez vos notifications et communications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-4 w-4 text-orange-500" />
                        <h4 className="font-medium text-gray-900">Newsletter culinaire</h4>
                      </div>
                      <p className="text-sm text-gray-600">
                        Recevez nos dernières recettes, conseils de chefs et actualités culinaires
                      </p>
                    </div>
                    <Switch
                      checked={profile?.preferences?.newsletter_enabled ?? true}
                      onCheckedChange={handleNewsletterToggle}
                      disabled={updateNewsletterPref.isPending}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Admin Notice */}
            {isAdmin && (
              <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-purple-900">Compte administrateur</h3>
                      <p className="text-sm text-purple-700">
                        En tant qu'administrateur, vous n'êtes pas inscrit à la newsletter et avez accès aux fonctionnalités de gestion avancées.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 mx-auto mb-3 text-red-500" />
                  <h3 className="font-semibold mb-2">Mes Favoris</h3>
                  <p className="text-sm text-gray-600">Retrouvez vos recettes préférées</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <ShoppingCart className="h-8 w-8 mx-auto mb-3 text-green-500" />
                  <h3 className="font-semibold mb-2">Mes Commandes</h3>
                  <p className="text-sm text-gray-600">Suivez vos achats d'ingrédients</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <ChefHat className="h-8 w-8 mx-auto mb-3 text-orange-500" />
                  <h3 className="font-semibold mb-2">Mes Recettes</h3>
                  <p className="text-sm text-gray-600">Créez et partagez vos créations</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
