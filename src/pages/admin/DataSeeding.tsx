
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { seedGlobalData, clearTestData } from '@/lib/globalSeeding';
import { Database, Trash2, PlayCircle, AlertTriangle } from 'lucide-react';

const DataSeeding = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [lastSeedResult, setLastSeedResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSeedData = async () => {
    setIsSeeding(true);
    setLastSeedResult(null);
    
    try {
      await seedGlobalData();
      const message = 'Données de test créées avec succès !';
      setLastSeedResult(message);
      toast({
        title: "Seeding réussi",
        description: message,
      });
    } catch (error) {
      console.error('Erreur lors du seeding:', error);
      const errorMessage = `Erreur lors du seeding: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
      setLastSeedResult(errorMessage);
      toast({
        title: "Erreur de seeding",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClearData = async () => {
    if (!window.confirm('⚠️ ATTENTION: Ceci supprimera TOUTES les données de test. Êtes-vous sûr ?')) {
      return;
    }
    
    setIsClearing(true);
    
    try {
      await clearTestData();
      const message = 'Données de test supprimées avec succès !';
      setLastSeedResult(message);
      toast({
        title: "Nettoyage réussi",
        description: message,
      });
    } catch (error) {
      console.error('Erreur lors du nettoyage:', error);
      const errorMessage = `Erreur lors du nettoyage: ${error instanceof Error ? error.message : 'Erreur inconnue'}`;
      setLastSeedResult(errorMessage);
      toast({
        title: "Erreur de nettoyage",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Database className="h-8 w-8 mr-3 text-orange-500" />
            Gestion des Données de Test
          </h1>
          <p className="text-gray-600 mt-2">
            Alimentez votre base de données avec des données de test pour les démonstrations
          </p>
        </div>
      </div>

      {/* Alert d'information */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important :</strong> Le seeding utilise les utilisateurs existants dans votre base de données. 
          Assurez-vous d'avoir au moins un utilisateur enregistré avant de lancer le seeding.
        </AlertDescription>
      </Alert>

      {/* Actions principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seeding Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PlayCircle className="h-5 w-5 text-green-500" />
              <span>Créer des Données de Test</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Génère des données de test pour toutes les tables :
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Catégories de produits et recettes</li>
              <li>• Produits variés (légumes, fruits, viandes...)</li>
              <li>• Vidéos de démonstration</li>
              <li>• Recettes avec ingrédients</li>
              <li>• Commandes d'exemple</li>
              <li>• Favoris et permissions admin</li>
            </ul>
            <Button 
              onClick={handleSeedData}
              disabled={isSeeding}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              {isSeeding ? 'Création en cours...' : 'Créer les Données de Test'}
            </Button>
          </CardContent>
        </Card>

        {/* Clear Data Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-red-500" />
              <span>Nettoyer les Données de Test</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Supprime toutes les données de test créées.
            </p>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Attention :</strong> Cette action est irréversible et supprimera 
                TOUTES les données de test.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={handleClearData}
              disabled={isClearing}
              variant="destructive"
              className="w-full"
            >
              {isClearing ? 'Suppression en cours...' : 'Supprimer les Données de Test'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Résultat de la dernière action */}
      {lastSeedResult && (
        <Card>
          <CardHeader>
            <CardTitle>Résultat de la dernière action</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
              {lastSeedResult}
            </pre>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instructions d'utilisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Avant le seeding :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Assurez-vous d'avoir au moins un utilisateur enregistré dans le système</li>
              <li>• Vérifiez que vous avez les permissions d'administration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Après le seeding :</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Le premier utilisateur recevra automatiquement les permissions de super admin</li>
              <li>• Vous pourrez tester toutes les fonctionnalités avec les données créées</li>
              <li>• Les produits seront disponibles dans le modal d'ajout de recettes</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSeeding;
