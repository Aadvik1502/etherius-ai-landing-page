import React, { useState, useEffect } from 'react';

interface AnalyticsEvent {
  id: number;
  event_type: string;
  event_data: string;
  session_id: string;
  page_url: string;
  created_at: string;
}

interface Lead {
  id: number;
  full_name: string;
  company_name: string;
  industry: string;
  investment_range: string;
  status: string;
  created_at: string;
}

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') + '/api' || 'https://etherius-ai-backend.onrender.com/api';

  useEffect(() => {
    loadAnalytics();
    const interval = setInterval(loadAnalytics, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      const [analyticsResponse, leadsResponse] = await Promise.all([
        fetch(`${API_BASE}/admin/analytics`),
        fetch(`${API_BASE}/admin/leads`)
      ]);

      if (!analyticsResponse.ok || !leadsResponse.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const analyticsData = await analyticsResponse.json();
      const leadsData = await leadsResponse.json();

      setAnalytics(analyticsData);
      setLeads(leadsData.leads || leadsData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading analytics:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  // Calculate metrics
  const pageViews = analytics.filter(event => event.event_type === 'page_view').length;
  const totalLeads = leads.length;
  const conversionRate = pageViews > 0 ? ((totalLeads / pageViews) * 100).toFixed(2) : '0';

  const timeEvents = analytics.filter(event => event.event_type === 'time_on_page');
  const avgTime = timeEvents.length > 0
    ? Math.round(timeEvents.reduce((sum, event) => {
        try {
          const data = JSON.parse(event.event_data || '{}');
          return sum + (data.timeInSeconds || 0);
        } catch {
          return sum;
        }
      }, 0) / timeEvents.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-neon-yellow mb-4">📊 Analytics Dashboard</h1>
          <p className="text-xl text-neutral-gray">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-neon-yellow mb-8 text-center">📊 Analytics Dashboard</h1>
          <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-red-400 mb-2">❌ Error Loading Data</h3>
            <p className="text-red-300">{error}</p>
            <button
              onClick={loadAnalytics}
              className="mt-4 bg-neon-yellow text-black px-6 py-2 rounded-lg font-bold hover:bg-neon-yellow/90"
            >
              🔄 Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neon-yellow mb-4">📊 Etherius AI Analytics</h1>
          <p className="text-xl text-neutral-gray">Real-time website performance and lead tracking</p>
          <button
            onClick={loadAnalytics}
            className="mt-4 bg-neon-yellow text-black px-6 py-2 rounded-lg font-bold hover:bg-neon-yellow/90"
          >
            🔄 Refresh Data
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-deeper-surface border border-border/30 rounded-lg p-6 text-center">
            <h3 className="text-neon-yellow font-semibold mb-2">Total Visitors</h3>
            <div className="text-3xl font-bold">{pageViews}</div>
          </div>
          <div className="bg-deeper-surface border border-border/30 rounded-lg p-6 text-center">
            <h3 className="text-neon-yellow font-semibold mb-2">Leads Generated</h3>
            <div className="text-3xl font-bold">{totalLeads}</div>
          </div>
          <div className="bg-deeper-surface border border-border/30 rounded-lg p-6 text-center">
            <h3 className="text-neon-yellow font-semibold mb-2">Conversion Rate</h3>
            <div className="text-3xl font-bold">{conversionRate}%</div>
          </div>
          <div className="bg-deeper-surface border border-border/30 rounded-lg p-6 text-center">
            <h3 className="text-neon-yellow font-semibold mb-2">Avg. Time on Page</h3>
            <div className="text-3xl font-bold">{avgTime}s</div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-deeper-surface border border-border/30 rounded-lg p-6 mb-8">
          <h3 className="text-neon-yellow text-xl font-bold mb-4">📈 Recent Website Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-2 text-neon-yellow">Event Type</th>
                  <th className="text-left py-2 text-neon-yellow">Session</th>
                  <th className="text-left py-2 text-neon-yellow">Page URL</th>
                  <th className="text-left py-2 text-neon-yellow">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {analytics.slice(-10).reverse().map((event) => (
                  <tr key={event.id} className="border-b border-border/10">
                    <td className="py-2">{event.event_type}</td>
                    <td className="py-2">{event.session_id?.slice(-8) || 'N/A'}</td>
                    <td className="py-2">{event.page_url || 'N/A'}</td>
                    <td className="py-2">{new Date(event.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-deeper-surface border border-border/30 rounded-lg p-6">
          <h3 className="text-neon-yellow text-xl font-bold mb-4">🎯 Recent Leads</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left py-2 text-neon-yellow">Name</th>
                  <th className="text-left py-2 text-neon-yellow">Company</th>
                  <th className="text-left py-2 text-neon-yellow">Industry</th>
                  <th className="text-left py-2 text-neon-yellow">Investment Range</th>
                  <th className="text-left py-2 text-neon-yellow">Status</th>
                  <th className="text-left py-2 text-neon-yellow">Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(-10).reverse().map((lead) => (
                  <tr key={lead.id} className="border-b border-border/10">
                    <td className="py-2">{lead.full_name}</td>
                    <td className="py-2">{lead.company_name}</td>
                    <td className="py-2">{lead.industry}</td>
                    <td className="py-2">{lead.investment_range}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        lead.status === 'new' ? 'bg-green-500/20 text-green-400' :
                        lead.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-2">{new Date(lead.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;