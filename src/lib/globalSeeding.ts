
import { supabase } from '@/integrations/supabase/client';

// Fonction utilitaire pour obtenir des utilisateurs existants
const getExistingUsers = async () => {
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id')
    .limit(5);
  
  return profiles?.map(p => p.id) || [];
};

// Données de test pour les catégories de produits
const productCategories = [
  { name: 'Légumes', description: 'Légumes frais locaux', display_order: 1 },
  { name: 'Fruits', description: 'Fruits de saison', display_order: 2 },
  { name: 'Viandes', description: 'Viandes fraîches', display_order: 3 },
  { name: 'Poissons', description: 'Poissons frais', display_order: 4 },
  { name: 'Céréales', description: 'Céréales et grains', display_order: 5 },
  { name: 'Épices', description: 'Épices et condiments', display_order: 6 },
  { name: 'Produits laitiers', description: 'Lait, fromage, yaourt', display_order: 7 },
];

// Données de test pour les catégories de recettes
const recipeCategories = [
  { name: 'Plats traditionnels maliens', description: 'Recettes traditionnelles du Mali', display_order: 1 },
  { name: 'Soupes et potages', description: 'Soupes nutritives', display_order: 2 },
  { name: 'Plats végétariens', description: 'Recettes sans viande', display_order: 3 },
  { name: 'Desserts', description: 'Desserts traditionnels', display_order: 4 },
  { name: 'Boissons', description: 'Boissons traditionnelles', display_order: 5 },
];

// Données de test pour les produits
const products = [
  { name: 'Tomates', price: 750, unit: 'kg', category: 'Légumes', in_stock: true, rating: 4.5 },
  { name: 'Oignons', price: 500, unit: 'kg', category: 'Légumes', in_stock: true, rating: 4.2 },
  { name: 'Pommes de terre', price: 600, unit: 'kg', category: 'Légumes', in_stock: true, rating: 4.0 },
  { name: 'Carottes', price: 650, unit: 'kg', category: 'Légumes', in_stock: true, rating: 4.3 },
  { name: 'Mangues', price: 1200, unit: 'kg', category: 'Fruits', in_stock: true, rating: 4.8 },
  { name: 'Bananes', price: 800, unit: 'kg', category: 'Fruits', in_stock: true, rating: 4.6 },
  { name: 'Ananas', price: 1500, unit: 'pièce', category: 'Fruits', in_stock: true, rating: 4.7 },
  { name: 'Bœuf', price: 4500, unit: 'kg', category: 'Viandes', in_stock: true, rating: 4.9 },
  { name: 'Mouton', price: 5000, unit: 'kg', category: 'Viandes', in_stock: true, rating: 4.8 },
  { name: 'Poulet', price: 3500, unit: 'kg', category: 'Viandes', in_stock: true, rating: 4.7 },
  { name: 'Poisson capitaine', price: 3800, unit: 'kg', category: 'Poissons', in_stock: true, rating: 4.6 },
  { name: 'Tilapia', price: 2800, unit: 'kg', category: 'Poissons', in_stock: true, rating: 4.4 },
  { name: 'Riz', price: 1200, unit: 'kg', category: 'Céréales', in_stock: true, rating: 4.5 },
  { name: 'Mil', price: 1000, unit: 'kg', category: 'Céréales', in_stock: true, rating: 4.3 },
  { name: 'Fonio', price: 1800, unit: 'kg', category: 'Céréales', in_stock: true, rating: 4.7 },
  { name: 'Piment', price: 2000, unit: 'kg', category: 'Épices', in_stock: true, rating: 4.8 },
  { name: 'Gingembre', price: 2500, unit: 'kg', category: 'Épices', in_stock: true, rating: 4.6 },
  { name: 'Lait frais', price: 1500, unit: 'litre', category: 'Produits laitiers', in_stock: true, rating: 4.5 },
];

// Données de test pour les vidéos
const videos = [
  {
    title: 'Comment préparer le Tô',
    description: 'Technique traditionnelle de préparation du Tô',
    category: 'Plats traditionnels maliens',
    duration: '12:30',
    video_url: 'https://example.com/video1.mp4',
    views: 1250,
    likes: 89
  },
  {
    title: 'Préparation du Riz au Gras',
    description: 'Recette complète du riz au gras malien',
    category: 'Plats traditionnels maliens',
    duration: '18:45',
    video_url: 'https://example.com/video2.mp4',
    views: 2100,
    likes: 156
  },
  {
    title: 'Soupe de légumes nutritive',
    description: 'Une soupe riche en légumes locaux',
    category: 'Soupes et potages',
    duration: '10:15',
    video_url: 'https://example.com/video3.mp4',
    views: 980,
    likes: 67
  }
];

// Fonction principale de seeding
export const seedGlobalData = async () => {
  try {
    console.log('🌱 Début du seeding global...');
    
    // Obtenir les utilisateurs existants
    const userIds = await getExistingUsers();
    if (userIds.length === 0) {
      console.log('⚠️ Aucun utilisateur trouvé. Créez d\'abord des utilisateurs.');
      return;
    }
    
    console.log(`📊 ${userIds.length} utilisateurs trouvés`);

    // 1. Seeder les catégories de produits
    console.log('📦 Seeding des catégories de produits...');
    for (const category of productCategories) {
      await supabase
        .from('manageable_product_categories')
        .upsert(category, { onConflict: 'name' });
    }

    // 2. Seeder les catégories de recettes
    console.log('🍽️ Seeding des catégories de recettes...');
    for (const category of recipeCategories) {
      await supabase
        .from('manageable_recipe_categories')
        .upsert(category, { onConflict: 'name' });
    }

    // 3. Seeder les produits
    console.log('🥬 Seeding des produits...');
    for (const product of products) {
      await supabase
        .from('products')
        .upsert(product, { onConflict: 'name' });
    }

    // 4. Seeder les vidéos
    console.log('📹 Seeding des vidéos...');
    for (const video of videos) {
      await supabase
        .from('videos')
        .upsert(video, { onConflict: 'title' });
    }

    // 5. Récupérer les IDs des données créées pour les relations
    const { data: createdProducts } = await supabase
      .from('products')
      .select('id, name')
      .limit(10);

    const { data: createdVideos } = await supabase
      .from('videos')
      .select('id, title')
      .limit(3);

    // 6. Seeder les recettes avec des ingrédients réels
    if (createdProducts && createdProducts.length > 0) {
      console.log('🍲 Seeding des recettes...');
      
      const recipes = [
        {
          title: 'Riz au Gras Traditionnel',
          description: 'Plat traditionnel malien riche en saveurs',
          category: 'Plats traditionnels maliens',
          cook_time: 60,
          servings: 6,
          difficulty: 'Moyen',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400',
          ingredients: [
            { productId: createdProducts[0]?.id, quantity: '500', unit: 'g' },
            { productId: createdProducts[1]?.id, quantity: '2', unit: 'pièces' },
            { productId: createdProducts[2]?.id, quantity: '3', unit: 'pièces' }
          ],
          instructions: [
            'Laver le riz et le faire tremper 30 minutes',
            'Faire revenir les légumes dans l\'huile',
            'Ajouter le riz et mélanger',
            'Ajouter l\'eau et laisser cuire 45 minutes'
          ],
          created_by: userIds[0],
          video_id: createdVideos?.[0]?.id
        },
        {
          title: 'Soupe de Légumes Malienne',
          description: 'Soupe nutritive aux légumes locaux',
          category: 'Soupes et potages',
          cook_time: 45,
          servings: 4,
          difficulty: 'Facile',
          rating: 4.5,
          image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
          ingredients: [
            { productId: createdProducts[3]?.id, quantity: '300', unit: 'g' },
            { productId: createdProducts[4]?.id, quantity: '200', unit: 'g' },
            { productId: createdProducts[5]?.id, quantity: '1', unit: 'pièce' }
          ],
          instructions: [
            'Éplucher et couper tous les légumes',
            'Faire bouillir l\'eau avec les épices',
            'Ajouter les légumes et cuire 30 minutes',
            'Servir chaud avec du pain local'
          ],
          created_by: userIds[1] || userIds[0],
          video_id: createdVideos?.[1]?.id
        }
      ];

      for (const recipe of recipes) {
        await supabase
          .from('recipes')
          .upsert(recipe, { onConflict: 'title' });
      }
    }

    // 7. Seeder quelques commandes de test
    console.log('🛒 Seeding des commandes...');
    if (createdProducts && createdProducts.length > 0) {
      const orders = [
        {
          user_id: userIds[0],
          total_amount: 3750,
          status: 'pending',
          items: [
            { product_id: createdProducts[0]?.id, quantity: 2, price: 750, name: createdProducts[0]?.name },
            { product_id: createdProducts[1]?.id, quantity: 1, price: 500, name: createdProducts[1]?.name },
            { product_id: createdProducts[7]?.id, quantity: 0.5, price: 2250, name: createdProducts[7]?.name }
          ],
          delivery_address: {
            street: '123 Rue de la Paix',
            city: 'Bamako',
            postal_code: 'BP 2540',
            country: 'Mali'
          },
          delivery_notes: 'Livraison entre 9h et 12h'
        },
        {
          user_id: userIds[1] || userIds[0],
          total_amount: 2100,
          status: 'validated',
          items: [
            { product_id: createdProducts[4]?.id, quantity: 1, price: 1200, name: createdProducts[4]?.name },
            { product_id: createdProducts[5]?.id, quantity: 1, price: 800, name: createdProducts[5]?.name }
          ],
          delivery_address: {
            street: '456 Avenue du Mali',
            city: 'Bamako',
            postal_code: 'BP 1234',
            country: 'Mali'
          }
        }
      ];

      for (const order of orders) {
        await supabase
          .from('orders')
          .insert(order);
      }
    }

    // 8. Seeder quelques favoris
    console.log('❤️ Seeding des favoris...');
    if (createdProducts && createdProducts.length > 0) {
      const favorites = [
        { user_id: userIds[0], item_id: createdProducts[0]?.id, type: 'product' },
        { user_id: userIds[0], item_id: createdProducts[4]?.id, type: 'product' },
        { user_id: userIds[1] || userIds[0], item_id: createdProducts[7]?.id, type: 'product' }
      ];

      for (const favorite of favorites) {
        await supabase
          .from('favorites')
          .upsert(favorite, { onConflict: 'user_id,item_id,type' });
      }
    }

    // 9. Seeder des permissions admin pour le premier utilisateur
    console.log('🔐 Seeding des permissions admin...');
    await supabase
      .from('admin_permissions')
      .upsert({
        user_id: userIds[0],
        is_super_admin: true,
        can_manage_users: true,
        can_manage_products: true,
        can_manage_recipes: true,
        can_manage_videos: true,
        can_manage_categories: true,
        can_manage_orders: true,
        can_validate_orders: true,
        can_manage_deliveries: true
      }, { onConflict: 'user_id' });

    console.log('✅ Seeding global terminé avec succès !');
    console.log('📊 Données créées :');
    console.log(`   - ${productCategories.length} catégories de produits`);
    console.log(`   - ${recipeCategories.length} catégories de recettes`);
    console.log(`   - ${products.length} produits`);
    console.log(`   - ${videos.length} vidéos`);
    console.log(`   - 2 recettes`);
    console.log(`   - 2 commandes`);
    console.log(`   - 3 favoris`);
    console.log(`   - 1 admin super utilisateur`);

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    throw error;
  }
};

// Fonction pour nettoyer les données de test
export const clearTestData = async () => {
  try {
    console.log('🧹 Nettoyage des données de test...');
    
    // Attention : ceci supprime TOUTES les données de test
    // Utilisez avec précaution !
    
    await supabase.from('favorites').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('orders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('recipes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('videos').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('manageable_recipe_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('manageable_product_categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('admin_permissions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('✅ Données de test supprimées');
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
    throw error;
  }
};
