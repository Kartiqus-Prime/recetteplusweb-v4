import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useUserProfile, useUpdateSupabaseProfile } from '@/hooks/useSupabaseProfiles';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Mail } from 'lucide-react';
import { useUpdateUserNewsletterPreference } from '@/hooks/useNewsletters';
import { Switch } from '@/components/ui/switch';

const Profile = () => {
  const { currentUser } = useAuth();
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateSupabaseProfile();
  const updateNewsletterPref = useUpdateUserNewsletterPreference();

  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>(profile?.preferences?.dietaryRestrictions || []);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || '');
      setDietaryRestrictions(profile.preferences?.dietaryRestrictions || []);
    }
  }, [profile]);

  useEffect(() => {
    setIsDirty(displayName !== (profile?.display_name || '') ||
      JSON.stringify(dietaryRestrictions) !== JSON.stringify(profile?.preferences?.dietaryRestrictions || []));
  }, [displayName, dietaryRestrictions, profile]);

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
            dietaryRestrictions: dietaryRestrictions
          }
        }
      });
      setIsDirty(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleNewsletterToggle = async (enabled: boolean) => {
    if (!currentUser?.id) return;
    
    try {
      await updateNewsletterPref.mutateAsync({
        userId: currentUser.id,
        enabled
      });
    } catch (error) {
      console.error('Erreur mise à jour newsletter:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-[#F97316] to-red-500 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#F97316] to-red-600 bg-clip-text text-transparent">
              Mon Profil
            </CardTitle>
            <CardDescription className="text-gray-600">
              Gérez vos informations personnelles et préférences
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Profile Form */}
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

              {/* Newsletter Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[#F97316]" />
                  Préférences de communication
                </h3>
                
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Newsletter</h4>
                    <p className="text-sm text-gray-600">
                      Recevez nos dernières recettes et actualités culinaires
                    </p>
                  </div>
                  <Switch
                    checked={profile?.preferences?.newsletter_enabled ?? true}
                    onCheckedChange={handleNewsletterToggle}
                    disabled={updateNewsletterPref.isPending}
                  />
                </div>
              </div>

              {/* Dietary Restrictions (Example) */}
              <div className="space-y-2">
                <Label>Restrictions alimentaires</Label>
                <Input
                  type="text"
                  placeholder="Séparées par des virgules"
                  value={dietaryRestrictions.join(', ')}
                  onChange={(e) => setDietaryRestrictions(e.target.value.split(',').map(item => item.trim()))}
                />
              </div>

              {/* Submit Button */}
              <Button disabled={!isDirty || updateProfile.isPending} className="w-full">
                {updateProfile.isPending ? 'Mise à jour...' : 'Mettre à jour le profil'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
