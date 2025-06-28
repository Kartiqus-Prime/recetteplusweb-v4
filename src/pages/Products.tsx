import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';
import { useSupabaseProducts } from '@/hooks/useSupabaseProducts';
import Header from '@/components/Header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: [0, 10000],
    ratings: [],
    inStock: false
  });
  const { data: products = [], isLoading, error } = useSupabaseProducts();

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'low' && product.price < 1000) ||
      (priceRange === 'medium' && product.price >= 1000 && product.price < 5000) ||
      (priceRange === 'high' && product.price >= 5000);
    
    // Filtres avancés
    const matchesAdvancedPrice = product.price >= advancedFilters.priceRange[0] && 
                                product.price <= advancedFilters.priceRange[1];
    const matchesRating = advancedFilters.ratings.length === 0 || 
                         advancedFilters.ratings.some((rating: number) => (product.rating || 0) >= rating);
    const matchesStock = !advancedFilters.inStock || product.in_stock;
    
    return matchesSearch && matchesCategory && matchesPrice && 
           matchesAdvancedPrice && matchesRating && matchesStock && product.in_stock;
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" />
            <p className="text-gray-600">Chargement des produits...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erreur lors du chargement des produits</p>
            <Button onClick={() => window.location.reload()} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
              Réessayer
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Nos Produits
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Plus de {products.length} ingrédients authentiques livrés directement chez vous
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input 
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg border-2 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Category and Price selects */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48 h-12">
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="w-full sm:w-48 h-12">
                    <SelectValue placeholder="Tous les prix" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les prix</SelectItem>
                    <SelectItem value="low">Moins de 1 000 F</SelectItem>
                    <SelectItem value="medium">1 000 - 5 000 F</SelectItem>
                    <SelectItem value="high">Plus de 5 000 F</SelectItem>
                  </SelectContent>
                </Select>

                {/* Advanced filters */}
                <ProductFilters 
                  onFiltersChange={setAdvancedFilters}
                  currentFilters={advancedFilters}
                />
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center animate-fade-in">
            <Badge 
              variant={selectedCategory === 'all' ? 'default' : 'outline'} 
              className="cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 px-4 py-2 text-sm font-semibold bg-orange-500 text-white"
              onClick={() => setSelectedCategory('all')}
            >
              Tous ({products.filter(p => p.in_stock).length})
            </Badge>
            {categories.slice(0, 6).map((category) => {
              const count = products.filter(p => p.category === category && p.in_stock).length;
              return (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 px-4 py-2 text-sm font-semibold"
                  onClick={() => setSelectedCategory(category)}
                  style={selectedCategory === category ? { backgroundColor: '#F97316', color: 'white' } : {}}
                >
                  {category} ({count})
                </Badge>
              );
            })}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold text-orange-600">{filteredProducts.length}</span> produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </p>
              {searchTerm && (
                <Badge variant="secondary" className="px-3 py-1">
                  Recherche: "{searchTerm}"
                </Badge>
              )}
            </div>
            <Select defaultValue="popular">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Plus populaires</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
                <SelectItem value="name">Nom A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image || 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=300'}
                  unit={product.unit}
                  category={product.category}
                  rating={product.rating || 0}
                  inStock={product.in_stock}
                  promotion={product.promotion}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-12 w-12 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-500">
                {searchTerm 
                  ? `Aucun produit ne correspond à "${searchTerm}"`
                  : "Aucun produit disponible dans cette catégorie"
                }
              </p>
            </div>
          )}

          {/* Load More */}
          {filteredProducts.length > 0 && filteredProducts.length >= 16 && (
            <div className="text-center mt-16">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300">
                <Package className="h-5 w-5 mr-2" />
                Charger plus de produits
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
