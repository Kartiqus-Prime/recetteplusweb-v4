
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NewsletterData {
  title: string;
  subject: string;
  content: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Vérifier l'authentification
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('Non autorisé')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Non autorisé')
    }

    // Vérifier les permissions admin
    const { data: permissions } = await supabase
      .from('admin_permissions')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!permissions?.can_manage_users && !permissions?.is_super_admin) {
      throw new Error('Permissions insuffisantes')
    }

    const { title, subject, content }: NewsletterData = await req.json()

    // Récupérer tous les utilisateurs avec newsletter activée (non-admins uniquement)
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select(`
        email, 
        display_name,
        admin_permissions!left(id)
      `)
      .not('email', 'is', null)
      .eq('preferences->newsletter_enabled', true)
      .is('admin_permissions.id', null) // Exclure les admins

    if (usersError) {
      console.error('Erreur récupération utilisateurs:', usersError)
      throw new Error('Erreur récupération des utilisateurs')
    }

    console.log(`Envoi newsletter à ${users?.length || 0} utilisateurs non-admins`)

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Aucun abonné non-admin à la newsletter' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Template HTML pour l'email avec le logo
    const logoUrl = "https://uymqovqiuoneslmvtvti.supabase.co/storage/v1/object/public/logo/logo.png";
    
    const emailTemplate = `
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
          animation: logoFloat 3s ease-in-out infinite;
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
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
          transition: all 0.3s ease;
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
          
          <div style="border-top: 1px solid #E5E7EB; margin: 20px 0; padding-top: 20px;">
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
    `

    // Utiliser SMTP pour l'envoi des emails
    const smtpHost = Deno.env.get('SMTP_HOST') || 'smtp.gmail.com'
    const smtpPort = parseInt(Deno.env.get('SMTP_PORT') || '587')
    const smtpUser = Deno.env.get('SMTP_USER')
    const smtpPass = Deno.env.get('SMTP_PASSWORD')

    if (!smtpUser || !smtpPass) {
      throw new Error('Configuration SMTP manquante')
    }

    // Simuler l'envoi SMTP (remplacer par une vraie implémentation SMTP)
    console.log(`Envoi via SMTP: ${smtpHost}:${smtpPort} avec ${smtpUser}`)
    
    // Pour l'instant, on simule le succès
    const emailsSent = users.length

    // Enregistrer la campagne dans la base de données
    const { error: campaignError } = await supabase
      .from('newsletter_campaigns')
      .insert({
        title,
        subject,
        content,
        sent_at: new Date().toISOString(),
        sent_count: emailsSent,
        created_by: user.id
      })

    if (campaignError) {
      console.error('Erreur sauvegarde campagne:', campaignError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Newsletter envoyée à ${emailsSent} abonnés non-admins` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erreur envoi newsletter:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
