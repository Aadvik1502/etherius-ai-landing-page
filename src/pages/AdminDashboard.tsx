import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, MousePointerClick, Clock, Download, RefreshCw, Calendar, Eye, DollarSign } from 'lucide-react';

interface AnalyticsEvent {
  id: number;
  event_type: string;
  event_data: string;
  page_url: string;
  session_id: string;
  created_at: string;
}

interface Lead {
  id: number;
  full_name: string;
  email: string;
  company_name: string;
  industry: string;
  company_size: string;
  investment_range: string;
  status: string;
  created_at: string;
}

interface DashboardMetrics {
  totalVisitors: number;
  totalLeads: number;
  conversionRate: string;
  avgTimeOnPage: number;
  totalPageViews: number;
  totalCTAClicks: number;
  totalSectionViews: number;
}

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('7d');
  const [eventTypeFilter, setEventTypeFilter] = useState('all');

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Fetching analytics data from:', API_BASE);

      const [analyticsRes, leadsRes] = await Promise.all([
        fetch(`${API_BASE}/admin/analytics`),
        fetch(`${API_BASE}/admin/leads`)
      ]);

      console.log('📡 Analytics response status:', analyticsRes.status);
      console.log('📡 Leads response status:', leadsRes.status);

      if (!analyticsRes.ok || !leadsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const analyticsData = await analyticsRes.json();
      const leadsData = await leadsRes.json();

      console.log('✅ Analytics data received:', analyticsData);
      console.log('✅ Leads data received:', leadsData);

      setAnalytics(analyticsData.data || analyticsData || []);
      setLeads(leadsData.data || leadsData || []);

      // Calculate metrics
      const analyticsArray = analyticsData.data || [];
      const pageViews = analyticsArray.filter((e: AnalyticsEvent) => e.event_type === 'page_view').length;
      const ctaClicks = analyticsArray.filter((e: AnalyticsEvent) => e.event_type === 'cta_click').length;
      const sectionViews = analyticsArray.filter((e: AnalyticsEvent) => e.event_type === 'section_view').length;
      const uniqueSessions = new Set(analyticsArray.map((e: AnalyticsEvent) => e.session_id)).size;

      const timeEvents = analyticsArray.filter((e: AnalyticsEvent) => e.event_type === 'time_on_page');
      const avgTime = timeEvents.length > 0
        ? Math.round(timeEvents.reduce((sum: number, event: AnalyticsEvent) => {
            const data = JSON.parse(event.event_data || '{}');
            return sum + (data.timeInSeconds || 0);
          }, 0) / timeEvents.length)
        : 0;

      const leadsArray = leadsData.data || [];
      setMetrics({
        totalVisitors: uniqueSessions,
        totalLeads: leadsArray.length,
        conversionRate: uniqueSessions > 0 ? ((leadsArray.length / uniqueSessions) * 100).toFixed(2) : '0',
        avgTimeOnPage: avgTime,
        totalPageViews: pageViews,
        totalCTAClicks: ctaClicks,
        totalSectionViews: sectionViews
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [dateRange]);

  const exportData = (type: 'analytics' | 'leads') => {
    const data = type === 'analytics' ? analytics : leads;
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${type}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Prepare chart data
  const eventTypeData = analytics.reduce((acc: any[], event) => {
    const existing = acc.find(item => item.name === event.event_type);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: event.event_type, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#CEFC55', '#22C55E', '#06B6D4', '#1E40AF', '#8B5CF6', '#EF4444', '#F59E0B'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-neon-yellow mx-auto mb-4" />
          <p className="text-xl text-white">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4 text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button onClick={loadData} className="bg-neon-yellow text-black hover:bg-neon-yellow/90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-darker-surface to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Analytics <span className="text-neon-yellow">Dashboard</span>
            </h1>
            <p className="text-gray-400">Real-time insights into your website performance</p>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] bg-darker-surface border-gray-700">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={loadData}
              variant="outline"
              className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Visitors</CardTitle>
              <Users className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{metrics?.totalVisitors || 0}</div>
              <p className="text-xs text-gray-400 mt-1">Unique sessions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Leads Generated</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{metrics?.totalLeads || 0}</div>
              <p className="text-xs text-gray-400 mt-1">{metrics?.conversionRate}% conversion rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">CTA Clicks</CardTitle>
              <MousePointerClick className="w-4 h-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{metrics?.totalCTAClicks || 0}</div>
              <p className="text-xs text-gray-400 mt-1">Call-to-action interactions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Time on Page</CardTitle>
              <Clock className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{metrics?.avgTimeOnPage || 0}s</div>
              <p className="text-xs text-gray-400 mt-1">Average session duration</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-darker-surface/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Event Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={eventTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {eventTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-darker-surface/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                {analytics.slice(-10).reverse().map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                    <div className="w-2 h-2 bg-neon-yellow rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{event.event_type}</p>
                      <p className="text-gray-400 text-xs">{event.page_url}</p>
                      <p className="text-gray-500 text-xs mt-1">{new Date(event.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Leads */}
        <Card className="bg-darker-surface/50 border-gray-700 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Recent Leads ({leads.length} total)</CardTitle>
            <Button
              onClick={() => exportData('leads')}
              variant="outline"
              size="sm"
              className="border-neon-yellow text-neon-yellow hover:bg-neon-yellow/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Company</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Industry</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Size</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Investment</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.slice(-20).reverse().map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-800 hover:bg-background/30">
                      <td className="py-3 px-4 text-white font-medium">{lead.full_name}</td>
                      <td className="py-3 px-4 text-gray-300 text-sm">{lead.email}</td>
                      <td className="py-3 px-4 text-gray-300">{lead.company_name}</td>
                      <td className="py-3 px-4 text-gray-300 capitalize">{lead.industry}</td>
                      <td className="py-3 px-4 text-gray-300 text-sm">{lead.company_size}</td>
                      <td className="py-3 px-4 text-gray-300">{lead.investment_range}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-neon-yellow/20 text-neon-yellow rounded text-xs font-medium">
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {leads.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No leads yet. Keep promoting your website!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-darker-surface/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Page Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neon-yellow">{metrics?.totalPageViews || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-darker-surface/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Section Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{metrics?.totalSectionViews || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-darker-surface/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{analytics.length}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};