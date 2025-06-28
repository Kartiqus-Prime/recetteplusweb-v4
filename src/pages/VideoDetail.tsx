
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSupabaseVideos } from '@/hooks/useSupabaseVideos';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Play, Heart, Eye, ThumbsUp, Clock, Chef } from 'lucide-react';
import Header from '@/components/Header';
import FavoriteButton from '@/components/FavoriteButton';

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: videos = [] } = useSupabaseVideos();
  
  const video = videos.find(v => v.id === id);

  if (!video) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Vidéo non trouvée</h2>
            <Button onClick={() => navigate('/videos')} className="bg-orange-500 hover:bg-orange-600">
              Retour aux vidéos
            </Button>
          </div>
        </div>
      </>
    );
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/videos')}
            className="mb-6 hover:bg-white/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour aux vidéos
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-xl relative group">
                <img 
                  src={video.thumbnail || 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800'}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors cursor-pointer">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Play className="h-8 w-8 text-orange-500 ml-1" />
                  </div>
                </div>
                {video.duration && (
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{video.duration}</span>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 mb-3">
                      {video.category}
                    </Badge>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                      {video.title}
                    </h1>
                  </div>
                  <FavoriteButton 
                    itemId={video.id} 
                    type="video"
                    className="bg-gray-100 hover:bg-gray-200"
                  />
                </div>

                <div className="flex items-center space-x-6 mb-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>{formatViews(video.views || 0)} vues</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-5 w-5" />
                    <span>{video.likes || 0} likes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Chef className="h-5 w-5" />
                    <span>Chef Recette+</span>
                  </div>
                </div>

                {video.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {video.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Video Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Statistiques</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vues</span>
                      <span className="font-semibold">{formatViews(video.views || 0)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Likes</span>
                      <span className="font-semibold">{video.likes || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Durée</span>
                      <span className="font-semibold">{video.duration || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Recipe */}
              {video.recipe_id && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Recette associée</h3>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate(`/recette/${video.recipe_id}`)}
                    >
                      Voir la recette
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      <Play className="h-4 w-4 mr-2" />
                      Regarder maintenant
                    </Button>
                    <Button variant="outline" className="w-full">
                      Partager
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

export default VideoDetail;
