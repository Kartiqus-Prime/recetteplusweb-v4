
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Users, Star, ArrowRight, Play, Smartphone, Download, Clock, Award, TrendingUp, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-300 to-yellow-300 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative">
              <img 
                src="/lovable-uploads/fd4068e4-5395-416a-a0d9-2f2084813da4.png" 
                alt="Recette+" 
                className="h-28 w-auto drop-shadow-lg"
              />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
            Bienvenue sur <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Recette+</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Découvrez les saveurs authentiques du Mali et d'ailleurs. 
            Recettes traditionnelles, produits locaux et vidéos exclusives pour une expérience culinaire unique.
          </p>
          
          {/* App promotion banner */}
          <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-8 mb-12 text-gray-900 shadow-2xl animate-fade-in transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-center space-x-6 mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Smartphone className="h-10 w-10" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Application mobile disponible !</h3>
                <p className="text-lg opacity-90">Emportez vos recettes partout avec vous</p>
              </div>
            </div>
            <Link to="/download-app">
              <Button className="bg-white text-amber-600 hover:bg-gray-50 hover:text-amber-700 font-bold text-lg px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Download className="h-5 w-5 mr-3" />
                Télécharger maintenant
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Link to="/recettes">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <ChefHat className="h-6 w-6 mr-3" />
                Découvrir les recettes
              </Button>
            </Link>
            <Link to="/videos">
              <Button size="lg" variant="outline" className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-bold text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Play className="h-6 w-6 mr-3" />
                Regarder les vidéos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Pourquoi choisir <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Recette+</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une plateforme complète pour tous vos besoins culinaires
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg bg-gradient-to-br from-white to-amber-50/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-yellow-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <ChefHat className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Recettes Authentiques</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Découvrez les secrets de la cuisine malienne traditionnelle avec des recettes 
                  transmises de génération en génération par nos chefs experts.
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg bg-gradient-to-br from-white to-amber-50/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-yellow-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Communauté Active</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Rejoignez une communauté passionnée de cuisine et partagez vos créations 
                  avec d'autres amateurs de gastronomie du monde entier.
                </p>
              </CardContent>
            </Card>

            <Card className="group text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg bg-gradient-to-br from-white to-amber-50/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-yellow-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <Star className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Contenu Premium</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Accédez à des vidéos exclusives, des conseils de chefs professionnels 
                  et des techniques avancées pour perfectionner votre art culinaire.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Catégories <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">Populaires</span>
            </h2>
            <p className="text-xl text-gray-600">
              Explorez nos recettes par catégorie
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Plats principaux", count: "120+ recettes", color: "from-red-400 to-pink-500", icon: ChefHat },
              { name: "Desserts", count: "80+ sucreries", color: "from-pink-400 to-rose-500", icon: Star },
              { name: "Boissons", count: "50+ rafraîchissantes", color: "from-green-400 to-teal-500", icon: Clock },
              { name: "Entrées", count: "60+ saveurs", color: "from-amber-400 to-orange-500", icon: TrendingUp }
            ].map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 mb-3 px-4 py-1 text-sm font-medium">
                    {category.count}
                  </Badge>
                  <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-gray-900">
            Prêt à commencer votre 
            <br />
            <span className="bg-white bg-clip-text text-transparent">aventure culinaire</span> ?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-gray-800 leading-relaxed max-w-3xl mx-auto">
            Rejoignez notre communauté et découvrez le plaisir de cuisiner 
            avec Recette+. Une expérience complète et innovante vous attend !
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-50 hover:text-amber-700 font-bold text-xl px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                Créer un compte gratuit
                <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
            </Link>
            <Link to="/download-app">
              <Button size="lg" variant="outline" className="border-3 border-white bg-white/10 backdrop-blur-sm text-gray-900 hover:bg-white/20 font-bold text-xl px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                <Smartphone className="h-6 w-6 mr-3" />
                Télécharger l'app
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
