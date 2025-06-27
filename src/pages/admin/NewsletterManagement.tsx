
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Send, Calendar, Users, Eye } from 'lucide-react';
import { useNewsletterCampaigns, useSendNewsletter } from '@/hooks/useNewsletters';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const NewsletterManagement = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

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

  const previewHtml = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #F97316, #DC2626); color: white; }
        .logo { height: 60px; margin-bottom: 10px; }
        .content { padding: 40px 30px; }
        .footer { text-align: center; padding: 20px; background: #f8f9fa; color: #666; font-size: 14px; }
        .unsubscribe { color: #666; text-decoration: none; }
        h1 { color: white; margin: 0; font-size: 28px; }
        .content h2 { color: #F97316; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div style="width: 60px; height: 60px; background: white; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
            <span style="color: #F97316; font-weight: bold; font-size: 20px;">R+</span>
          </div>
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${content.replace(/\n/g, '<br>')}
        </div>
        <div class="footer">
          <p>Vous recevez cet email car vous êtes abonné à la newsletter de Recette+</p>
          <p><a href="#" class="unsubscribe">Se désabonner</a></p>
          <p>© 2024 Recette+ - Toute la cuisine malienne à portée de main</p>
        </div>
      </div>
    </body>
    </html>
  `;

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
            
            <Button
              onClick={handleSend}
              disabled={!title.trim() || !subject.trim() || !content.trim() || sendNewsletter.isPending}
            >
              <Send className="h-4 w-4 mr-2" />
              {sendNewsletter.isPending ? 'Envoi...' : 'Envoyer la Newsletter'}
            </Button>
          </div>

          {isPreviewMode && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-4">Aperçu de l'email :</h3>
              <div 
                className="bg-white rounded border"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
                style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%' }}
              />
            </div>
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
                <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium">{campaign.title}</h3>
                    <p className="text-sm text-gray-600">{campaign.subject}</p>
                    <div className="flex items-center space-x-4 mt-2">
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
                          {campaign.sent_count} destinaires
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant={campaign.sent_at ? 'default' : 'secondary'}>
                    {campaign.sent_at ? 'Envoyée' : 'Brouillon'}
                  </Badge>
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
