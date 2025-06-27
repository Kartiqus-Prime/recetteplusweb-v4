
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, Heart, MapPin, Phone, Mail } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion culinaire",
      description: "Nous croyons que la cuisine est un art qui unit les familles et les communautés"
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Créer une plateforme où les amoureux de la cuisine peuvent partager et apprendre"
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Utiliser la technologie pour simplifier l'expérience culinaire quotidienne"
    },
    {
      icon: Award,
      title: "Qualité",
      description: "Offrir des produits frais et des recettes authentiques de qualité supérieure"
    }
  ];

  const team = [
    {
      name: "Amadou Traoré",
      role: "Fondateur & CEO",
      description: "Passionné de technologie et de cuisine malienne traditionnelle"
    },
    {
      name: "Fatoumata Keita",
      role: "Chef Culinaire",
      description: "Expert en cuisine malienne avec 15 ans d'expérience"
    },
    {
      name: "Ibrahim Diallo",
      role: "Directeur Technique",
      description: "Spécialiste en développement d'applications mobiles"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/fd4068e4-5395-416a-a0d9-2f2084813da4.png" 
              alt="Recette+" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            À propos de Recette+
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Votre compagnon culinaire ultime pour découvrir, cuisiner et savourer la richesse de la cuisine malienne
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-12 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Recette+ a été créé pour célébrer et préserver la richesse culinaire du Mali tout en 
              facilitant l'accès aux ingrédients authentiques. Nous connectons les amoureux de la 
              cuisine malienne avec des recettes traditionnelles, des tutoriels vidéo et un service 
              de livraison d'ingrédients frais directement à domicile.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <Card className="mb-12 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900 mb-4">Notre Histoire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Né à Bamako en 2024, Recette+ est le fruit de la passion d'une équipe de technologues 
                  et de chefs maliens qui souhaitaient créer un pont entre la tradition culinaire et 
                  l'innovation numérique.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Nous avons remarqué que de nombreuses personnes, qu'elles vivent au Mali ou dans la 
                  diaspora, avaient des difficultés à trouver les ingrédients authentiques ou à maîtriser 
                  les techniques traditionnelles de cuisine malienne.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  C'est ainsi qu'est née l'idée de Recette+ : une plateforme qui combine recettes 
                  authentiques, tutoriels vidéo et livraison d'ingrédients pour rendre la cuisine 
                  malienne accessible à tous.
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop" 
                  alt="Cuisine malienne" 
                  className="rounded-2xl shadow-xl w-full max-w-md"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">{member.name}</CardTitle>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900 mb-4">Contactez-nous</CardTitle>
            <CardDescription className="text-center text-lg">
              Nous serions ravis d'avoir de vos nouvelles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Adresse</h3>
                  <p className="text-gray-600">ACI 2000, Bamako, Mali</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Téléphone</h3>
                  <p className="text-gray-600">+223 78 21 63 98</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">contact@recette-plus.com</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
