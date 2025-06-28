
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabaseRecipes } from '@/hooks/useSupabaseRecipes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Users, ChefHat, Star, ShoppingCart, Play } from 'lucide-react';
import Header from '@/components/Header';
import FavoriteButton from '@/components/FavoriteButton';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipes = [] } = useSupabaseRecipes();
  
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Recette non trouvée</h2>
            <Button onClick={() => navigate('/recettes')} className="bg-orange-500 hover:bg-orange-600">
              Retour aux recettes
            </Button>
          </div>
        </div>
      </>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'facile': return 'bg-green-100 text-green-700';
      case 'moyen': return 'bg-yellow-100 text-yellow-700';
      case 'difficile': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/recettes')}
            className="mb-6 hover:bg-white/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux recettes
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recipe Header */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src={recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800'}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {recipe.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <FavoriteButton 
                      itemId={recipe.id} 
                      type="recipe"
                      className="bg-white/90 hover:bg-white"
                    />
                  </div>
                  {recipe.video_id && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                        <Play className="h-6 w-6 text-orange-500 ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {recipe.title}
                  </h1>

                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(recipe.rating || 0) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                      <span className="ml-2 text-gray-600">
                        ({recipe.rating?.toFixed(1) || '0.0'})
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-5 w-5" />
                        <span>{recipe.cook_time} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-5 w-5" />
                        <span>{recipe.servings} pers.</span>
                      </div>
                      <Badge className={getDifficultyColor(recipe.difficulty || '')}>
                        {recipe.difficulty || 'Non spécifié'}
                      </Badge>
                    </div>
                  </div>

                  {recipe.description && (
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {recipe.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Ingredients */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ChefHat className="h-6 w-6 text-orange-500" />
                    <span>Ingrédients</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {recipe.ingredients && typeof recipe.ingredients === 'object' && Object.values(recipe.ingredients).map((ingredient: any, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{ingredient.productId || ingredient.name || 'Ingrédient'}</span>
                        <span className="text-gray-600">{ingredient.quantity} {ingredient.unit}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-6" />
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Ajouter tous les ingrédients au panier
                  </Button>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-1">
                          {instruction}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recipe Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Informations</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Temps de préparation</span>
                      <span className="font-semibold">{recipe.cook_time} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Portions</span>
                      <span className="font-semibold">{recipe.servings} personnes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Difficulté</span>
                      <Badge className={getDifficultyColor(recipe.difficulty || '')}>
                        {recipe.difficulty || 'Non spécifié'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Tutorial */}
              {recipe.video_id && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Tutoriel vidéo</h3>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/video/${recipe.video_id}`)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Regarder la vidéo
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                      <ChefHat className="h-4 w-4 mr-2" />
                      Commencer à cuisiner
                    </Button>
                    <Button variant="outline" className="w-full">
                      Partager la recette
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
