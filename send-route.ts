import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { campaignId } = await request.json()

    // Get campaign and contacts
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .single()

    const { data: contacts } = await supabase
      .from('contacts')
      .select('*')
      .eq('campaign_id', campaignId)

    if (!campaign || !contacts) {
      return new Response(
        JSON.stringify({ error: 'Campaign or contacts not found' }),
        { status: 404 }
      )
    }

    // Send emails
    let sent = 0
    for (const contact of contacts) {
      const personalizedBody = campaign.body.replace('{{name}}', contact.name || 'there')

      try {
        await resend.emails.send({
          from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
          to: contact.email,
          subject: campaign.subject,
          html: `
            <div>${personalizedBody}</div>
            <img src="${process.env.NEXT_PUBLIC_APP_URL}/api/track?campaignId=${campaignId}&contactId=${contact.id}" width="1" height="1" />
          `,
        })
        sent++

        // Update sent status
        await supabase
          .from('contacts')
          .update({ sent: true, sent_at: new Date().toISOString() })
          .eq('id', contact.id)
      } catch (err) {
        console.error(`Failed to send to ${contact.email}:`, err)
      }
    }

    // Update campaign status
    await supabase
      .from('campaigns')
      .update({ sent: true, sent_at: new Date().toISOString() })
      .eq('id', campaignId)

    return new Response(
      JSON.stringify({ success: true, sent }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as any).message }),
      { status: 500 }
    )
  }
}
