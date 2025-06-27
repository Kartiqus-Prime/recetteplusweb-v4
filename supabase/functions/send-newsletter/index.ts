
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

    // Récupérer tous les utilisateurs avec newsletter activée
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('email, display_name')
      .not('email', 'is', null)
      .eq('preferences->newsletter_enabled', true)

    if (usersError) {
      console.error('Erreur récupération utilisateurs:', usersError)
      throw new Error('Erreur récupération des utilisateurs')
    }

    console.log(`Envoi newsletter à ${users?.length || 0} utilisateurs`)

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'Aucun abonné à la newsletter' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Template HTML pour l'email
    const emailTemplate = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #F97316; }
        .logo { height: 60px; }
        .content { padding: 30px 0; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #eee; color: #666; font-size: 12px; }
        .unsubscribe { color: #666; text-decoration: none; }
        h1 { color: #F97316; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="https://uymqovqiuoneslmvtvti.supabase.co/storage/v1/object/public/assets/logo.png" alt="Recette+" class="logo">
          <h1>${title}</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>Vous recevez cet email car vous êtes abonné à la newsletter de Recette+</p>
          <p><a href="#" class="unsubscribe">Se désabonner</a></p>
          <p>© 2024 Recette+ - Toute la cuisine malienne à portée de main</p>
        </div>
      </div>
    </body>
    </html>
    `

    // Préparer les contacts pour Brevo
    const contacts = users.map(user => ({
      email: user.email,
      name: user.display_name || user.email
    }))

    // Envoyer via l'API Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/emailCampaigns', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': Deno.env.get('BREVO_API_KEY') || ''
      },
      body: JSON.stringify({
        name: title,
        subject: subject,
        htmlContent: emailTemplate,
        sender: {
          name: 'Recette+',
          email: 'noreply@recette-plus.com'
        },
        to: contacts.slice(0, 50), // Brevo limite à 50 destinataires par envoi
        scheduledAt: new Date().toISOString()
      })
    })

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text()
      console.error('Erreur Brevo:', errorText)
      throw new Error('Erreur envoi email')
    }

    // Enregistrer la campagne dans la base de données
    const { error: campaignError } = await supabase
      .from('newsletter_campaigns')
      .insert({
        title,
        subject,
        content,
        sent_at: new Date().toISOString(),
        sent_count: users.length,
        created_by: user.id
      })

    if (campaignError) {
      console.error('Erreur sauvegarde campagne:', campaignError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Newsletter envoyée à ${users.length} abonnés` 
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
