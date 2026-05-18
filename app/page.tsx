'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

export default function Home() {
  const [campaigns, setCampaigns] = useState([])
  const [showNewCampaign, setShowNewCampaign] = useState(false)
  const [campaignName, setCampaignName] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const createCampaign = async () => {
    if (!campaignName || !emailSubject || !emailBody || !csvFile) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      // Read CSV file
      const text = await csvFile.text()
      const lines = text.split('\n')
      const headers = lines[0].split(',')
      const contacts = lines.slice(1).filter(line => line.trim()).map(line => {
        const values = line.split(',')
        return {
          email: values[0]?.trim(),
          name: values[1]?.trim(),
        }
      })

      // Create campaign in database
      const { data, error } = await supabase
        .from('campaigns')
        .insert([
          {
            name: campaignName,
            subject: emailSubject,
            body: emailBody,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (error) throw error

      const campaignId = data[0].id

      // Add contacts to campaign
      const contactRecords = contacts.map(c => ({
        campaign_id: campaignId,
        email: c.email,
        name: c.name,
      }))

      const { error: contactError } = await supabase
        .from('contacts')
        .insert(contactRecords)

      if (contactError) throw contactError

      alert('Campaign created! Ready to send.')
      setCampaignName('')
      setEmailSubject('')
      setEmailBody('')
      setCsvFile(null)
      setShowNewCampaign(false)
      loadCampaigns()
    } catch (err) {
      alert('Error: ' + (err as any).message)
    } finally {
      setLoading(false)
    }
  }

  const loadCampaigns = async () => {
    const { data } = await supabase.from('campaigns').select('*')
    setCampaigns(data || [])
  }

  const sendCampaign = async (campaignId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId }),
      })

      if (!response.ok) throw new Error('Send failed')
      alert('Campaign sent!')
      loadCampaigns()
    } catch (err) {
      alert('Error: ' + (err as any).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">EmailAuto</h1>
          <p className="text-gray-600 mb-6">Send, track, and retarget client outreach campaigns</p>

          <button
            onClick={() => setShowNewCampaign(!showNewCampaign)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {showNewCampaign ? 'Cancel' : '+ New Campaign'}
          </button>
        </div>

        {showNewCampaign && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Create Campaign</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="e.g., Q2 Outreach"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Your email subject here"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Body</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Your email message. Use {{name}} for personalization"
                  rows={6}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload CSV</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">CSV must have: email, name</p>
              </div>

              <button
                onClick={createCampaign}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Campaign'}
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          <h2 className="text-2xl font-bold text-gray-900">Campaigns</h2>
          {campaigns.length === 0 ? (
            <p className="text-gray-500">No campaigns yet. Create one to get started!</p>
          ) : (
            campaigns.map((campaign: any) => (
              <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
                    <p className="text-gray-600">{campaign.subject}</p>
                  </div>
                  <button
                    onClick={() => sendCampaign(campaign.id)}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
