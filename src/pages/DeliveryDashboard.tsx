
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { useAssignOrderToDelivery, useUpdateDeliveryLocation } from '@/hooks/useDeliveryTracking';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import Header from '@/components/Header';
import { QrCode, MapPin, Package, Truck, CheckCircle } from 'lucide-react';

const DeliveryDashboard = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [qrCode, setQrCode] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const { data: orders = [], refetch } = useOrders();
  const assignOrderMutation = useAssignOrderToDelivery();
  const updateStatusMutation = useUpdateOrderStatus();
  const updateLocationMutation = useUpdateDeliveryLocation();

  // Filtrer les commandes pour le livreur actuel
  const myOrders = orders.filter(order => 
    order.assigned_to === currentUser?.id || 
    ['validated', 'assigned', 'picked_up', 'in_transit'].includes(order.status)
  );

  const handleScanQR = async () => {
    if (!qrCode.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un code QR",
        variant: "destructive"
      });
      return;
    }

    try {
      // Extraire l'ID de commande du code QR (format: QR_orderId_timestamp)
      const parts = qrCode.split('_');
      if (parts.length >= 2) {
        const orderId = parts[1];
        await assignOrderMutation.mutateAsync({ orderId, qrCode });
        setQrCode('');
        refetch();
      } else {
        throw new Error('Format de code QR invalide');
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateStatus = async (orderId: string, status: any) => {
    try {
      await updateStatusMutation.mutateAsync({ orderId, status });
      
      // Si c'est le début du transport, démarrer le partage de localisation
      if (status === 'in_transit') {
        startLocationSharing(orderId);
      }
      
      refetch();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const startLocationSharing = (orderId: string) => {
    if (!navigator.geolocation) {
      toast({
        title: "Erreur",
        description: "La géolocalisation n'est pas supportée par votre navigateur",
        variant: "destructive"
      });
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        updateLocationMutation.mutate({
          orderId,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          status: 'en_route',
          notes: 'Position mise à jour automatiquement'
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000
      }
    );

    // Stocker l'ID de surveillance pour pouvoir l'arrêter plus tard
    (window as any).deliveryWatchId = watchId;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
      case 'picked_up': return 'bg-orange-100 text-orange-800';
      case 'in_transit': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextAction = (status: string) => {
    switch (status) {
      case 'assigned': return { action: 'picked_up', label: 'Marquer comme récupérée', icon: Package };
      case 'picked_up': return { action: 'in_transit', label: 'Commencer la livraison', icon: Truck };
      case 'in_transit': return { action: 'delivered', label: 'Marquer comme livrée', icon: CheckCircle };
      default: return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord livreur</h1>
            <p className="text-gray-600">Gérez vos livraisons et suivez vos commandes</p>
          </div>

          {/* Scanner QR */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <QrCode className="h-5 w-5" />
                <span>Scanner une commande</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="Code QR de la commande"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleScanQR}
                  disabled={assignOrderMutation.isPending}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {assignOrderMutation.isPending ? 'Traitement...' : 'Scanner'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Liste des commandes */}
          <div className="grid gap-6">
            <h2 className="text-xl font-semibold text-gray-900">Mes commandes</h2>
            
            {myOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">Aucune commande assignée pour le moment.</p>
                </CardContent>
              </Card>
            ) : (
              myOrders.map((order) => {
                const nextAction = getNextAction(order.status);
                
                return (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Commande #{order.id.slice(0, 8)}</CardTitle>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium">Adresse de livraison</div>
                          <div className="text-gray-600">
                            {order.delivery_address.street}<br />
                            {order.delivery_address.city}, {order.delivery_address.postal_code}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Montant</span>
                        <span className="font-semibold">
                          {new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency: 'EUR'
                          }).format(order.total_amount)}
                        </span>
                      </div>

                      {nextAction && (
                        <Button
                          onClick={() => handleUpdateStatus(order.id, nextAction.action)}
                          disabled={updateStatusMutation.isPending}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                        >
                          <nextAction.icon className="h-4 w-4 mr-2" />
                          {nextAction.label}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryDashboard;
