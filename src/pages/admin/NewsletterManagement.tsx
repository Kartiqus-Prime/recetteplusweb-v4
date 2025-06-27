
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Calendar, Users, Eye, X, Maximize2, Minimize2 } from 'lucide-react';
import { useNewsletterCampaigns, useSendNewsletter } from '@/hooks/useNewsletters';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const NewsletterManagement = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  const { data: campaigns, isLoading } = useNewsletterCampaigns();
  const sendNewsletter = useSendNewsletter();

  const handleSend = async () => {
    if (!title.trim() || !subject.trim() || !content.trim()) {
      return;
    }

    try {
      await sendNewsletter.mutateAsync({
        title,
        subject,
        content
      });
      
      // Reset form
      setTitle('');
      setSubject('');
      setContent('');
      setIsPreviewMode(false);
    } catch (error) {
      console.error('Erreur envoi:', error);
    }
  };

  const generateEnhancedPreview = () => {
    const logoUrl = "https://via.placeholder.com/150x60/F97316/FFFFFF?text=Recette%2B";
    
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #FEF3E2 0%, #FED7AA 100%);
          }
          .container { 
            max-width: 650px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          }
          .header { 
            text-align: center; 
            padding: 40px 30px; 
            background: linear-gradient(135deg, #F97316 0%, #DC2626 100%); 
            color: white; 
            position: relative;
          }
          .header-badge {
            position: absolute;
            top: 20px;
            right: 30px;
            background: rgba(255,255,255,0.2);
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
          }
          .logo { 
            height: 60px; 
            margin-bottom: 20px; 
          }
          .content { 
            padding: 40px 30px; 
          }
          .footer { 
            text-align: center; 
            padding: 30px; 
            background: #F9FAFB; 
            color: #6B7280; 
            font-size: 14px; 
            border-top: 1px solid #E5E7EB;
          }
          .unsubscribe { 
            color: #F97316; 
            text-decoration: none; 
          }
          h1 { 
            color: white; 
            margin: 0; 
            font-size: 32px; 
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          .content h2 { 
            color: #F97316; 
            font-size: 24px;
            margin-bottom: 20px;
          }
          .cta-section {
            background: #FEF3E2;
            border: 2px solid #F97316;
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
          }
          .cta-button {
            display: inline-block;
            background: #F97316;
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            margin-top: 15px;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 15px;
            color: #F97316;
            text-decoration: none;
            font-weight: 500;
          }
          .divider {
            border-top: 1px solid #E5E7EB;
            margin: 20px 0;
            padding-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-badge">Newsletter</div>
            <img src="${logoUrl}" alt="Recette+" class="logo" />
            <h1>${title}</h1>
          </div>
          <div class="content">
            <div style="color: #374151; font-size: 16px; line-height: 1.7;">
              ${content.replace(/\n/g, '<br>')}
            </div>
            
            <div class="cta-section">
              <h3 style="color: #F97316; font-size: 20px; margin: 0 0 15px 0; font-weight: 600;">
                📱 Téléchargez notre application mobile !
              </h3>
              <p style="color: #374151; margin: 0; font-size: 16px;">
                Emportez toutes vos recettes partout avec vous
              </p>
              <a href="#" class="cta-button">Télécharger maintenant</a>
            </div>
          </div>
          <div class="footer">
            <h4 style="color: #374151; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
              Restez connecté avec nous
            </h4>
            <div class="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">YouTube</a>
            </div>
            
            <div class="divider">
              <p style="margin: 0 0 10px 0;">
                Vous recevez cet email car vous êtes abonné à la newsletter de Recette+
              </p>
              <p style="color: #9CA3AF; font-size: 12px; margin: 0;">
                © 2024 Recette+ - Tous droits réservés<br/>
                <a href="#" class="unsubscribe">Se désabonner</a> | 
                <a href="#" class="unsubscribe">Modifier mes préférences</a>
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Mail className="h-8 w-8 text-orange-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Newsletters</h1>
          <p className="text-gray-600">Créez et envoyez des newsletters à vos abonnés</p>
        </div>
      </div>

      {/* Formulaire de création */}
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle Newsletter</CardTitle>
          <CardDescription>
            Créez et envoyez une newsletter à tous vos abonnés
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre de la newsletter</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Nouvelles recettes de janvier"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Objet de l'email</label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Découvrez nos nouvelles recettes"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Contenu</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Rédigez le contenu de votre newsletter..."
              rows={8}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              disabled={!title || !subject || !content}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreviewMode ? 'Masquer l\'aperçu' : 'Aperçu'}
            </Button>

            {isPreviewMode && (
              <Dialog open={isFullscreenPreview} onOpenChange={setIsFullscreenPreview}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-4 w-4 mr-2" />
                    Plein écran
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[90vh]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                      Aperçu complet de la newsletter
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFullscreenPreview(false)}
                      >
                        <Minimize2 className="h-4 w-4" />
                      </Button>
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-full w-full rounded-md border">
                    <div 
                      dangerouslySetInnerHTML={{ __html: generateEnhancedPreview() }}
                      className="p-4"
                    />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            )}
            
            <Button
              onClick={handleSend}
              disabled={!title.trim() || !subject.trim() || !content.trim() || sendNewsletter.isPending}
            >
              <Send className="h-4 w-4 mr-2" />
              {sendNewsletter.isPending ? 'Envoi...' : 'Envoyer la Newsletter'}
            </Button>
          </div>

          {isPreviewMode && !isFullscreenPreview && (
            <Card className="border-2 border-orange-200">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Aperçu de l'email</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPreviewMode(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div 
                    dangerouslySetInnerHTML={{ __html: generateEnhancedPreview() }}
                    style={{ 
                      transform: 'scale(0.7)', 
                      transformOrigin: 'top left', 
                      width: '142.86%', 
                      height: '500px',
                      overflow: 'hidden'
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Historique des newsletters */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des Newsletters</CardTitle>
          <CardDescription>
            Consultez les newsletters déjà envoyées
          </CardDescription>
        </CardHeader>
        <CardContent>
          {campaigns && campaigns.length > 0 ? (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{campaign.subject}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {campaign.sent_at 
                          ? format(new Date(campaign.sent_at), 'dd MMMM yyyy à HH:mm', { locale: fr })
                          : 'Brouillon'
                        }
                      </div>
                      {campaign.sent_count && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {campaign.sent_count} destinataires
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={campaign.sent_at ? 'default' : 'secondary'}>
                      {campaign.sent_at ? 'Envoyée' : 'Brouillon'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Aucune newsletter envoyée pour le moment</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManagement;
