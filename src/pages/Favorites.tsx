
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Search, 
  Filter, 
  ChefHat, 
  Play, 
  Package,
  Trash2,
  ShoppingCart,
  Clock,
  Users,
  Star
} from 'lucide-react';
import { useSupabaseFavorites } from '@/hooks/useSupabaseFavorites';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import RecipeCard from '@/components/RecipeCard';
import VideoCard from '@/components/VideoCard';
import ProductCard from '@/components/ProductCard';

const Favorites = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('recipes');
  
  const { 
    data: favorites = [],
    isLoading, 
    removeFavorite 
  } = useSupabaseFavorites();

  const recipesFavorites = favorites?.filter(fav => fav.type === 'recipe') || [];
  const videosFavorites = favorites?.filter(fav => fav.type === 'video') || [];
  const productsFavorites = favorites?.filter(fav => fav.type === 'product') || [];

  const handleRemoveFavorite = async (itemId: string, type: 'recipe' | 'video' | 'product') => {
    try {
      await removeFavorite({ itemId, type });
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const filterItems = (items: any[], searchTerm: string) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <Heart className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-gray-900">Connexion requise</CardTitle>
            <CardDescription>
              Vous devez être connecté pour voir vos favoris
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              Se connecter
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Mes Favoris
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Retrouvez tous vos contenus préférés en un seul endroit
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Rechercher dans vos favoris..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 focus:border-orange-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recipes" className="flex items-center space-x-2">
                  <ChefHat className="h-4 w-4" />
                  <span>Recettes ({recipesFavorites.length})</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Vidéos ({videosFavorites.length})</span>
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center space-x-2">
                  <Package className="h-4 w-4" />
                  <span>Produits ({productsFavorites.length})</span>
                </TabsTrigger>
              </TabsList>

              {/* Recipes Tab */}
              <TabsContent value="recipes" className="mt-6">
                {recipesFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterItems(recipesFavorites, searchTerm).map((favorite) => (
                      <div key={favorite.id} className="relative group">
                        <RecipeCard
                          id={favorite.item_id}
                          title={favorite.recipes?.title || ''}
                          image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400"
                          cookTime={30}
                          servings={4}
                          difficulty="Moyen"
                          rating={4.5}
                          category="Plat principal"
                          description=""
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveFavorite(favorite.item_id, 'recipe')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <ChefHat className="h-24 w-24 text-orange-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Aucune recette favorite
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Commencez à ajouter des recettes à vos favoris pour les retrouver ici
                    </p>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      Découvrir les recettes
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos" className="mt-6">
                {videosFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterItems(videosFavorites, searchTerm).map((favorite) => (
                      <div key={favorite.id} className="relative group">
                        <VideoCard
                          id={favorite.item_id}
                          title={favorite.videos?.title || ''}
                          thumbnail="https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400"
                          duration={300}
                          views={1250}
                          category="Tutoriel"
                          chef="Chef Recette+"
                          description=""
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveFavorite(favorite.item_id, 'video')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Play className="h-24 w-24 text-orange-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Aucune vidéo favorite
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Ajoutez des vidéos tutoriels à vos favoris pour les retrouver ici
                    </p>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      Découvrir les vidéos
                    </Button>
                  </div>
                )}
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products" className="mt-6">
                {productsFavorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filterItems(productsFavorites, searchTerm).map((favorite) => (
                      <div key={favorite.id} className="relative group">
                        <ProductCard
                          id={favorite.item_id}
                          name={favorite.products?.name || ''}
                          price={0}
                          image="https://images.unsplash.com/photo-1516684732162-798a0062be99?w=300"
                          unit="kg"
                          category="Légumes"
                          rating={4.0}
                          inStock={true}
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveFavorite(favorite.item_id, 'product')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Package className="h-24 w-24 text-orange-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Aucun produit favori
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Ajoutez des produits à vos favoris pour les retrouver facilement
                    </p>
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      Découvrir les produits
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Favorites;
