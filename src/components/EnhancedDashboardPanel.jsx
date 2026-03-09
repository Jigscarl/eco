import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import { Leaf, TrendingDown, TrendingUp, AlertTriangle, Target, Brain, Download } from 'lucide-react';
import { calculateGreenScore, predictNextMonthEmissions, generateRecommendations } from '../utils/carbonCalculator';

function EnhancedDashboardPanel() {
  const companyData = {
    name: 'XYZ Traders',
    employees: 50,
    industry: 'Retail'
  };

  // Sample historical data for charts
  const monthlyData = [
    { month: 'Aug', emissions: 280, target: 300 },
    { month: 'Sep', emissions: 320, target: 300 },
    { month: 'Oct', emissions: 290, target: 300 },
    { month: 'Nov', emissions: 310, target: 300 },
    { month: 'Dec', emissions: 350, target: 300 },
    { month: 'Jan', emissions: 330, target: 300 },
    { month: 'Feb', emissions: 300, target: 300 },
    { month: 'Mar', emissions: 290, target: 300 },
    { month: 'Apr', emissions: 320, target: 300 },
    { month: 'May', emissions: 310, target: 300 },
    { month: 'Jun', emissions: 320, target: 300 },
  ];

  const breakdownData = [
    { name: 'Electricity', value: 150.2, percentage: 47, color: '#10b981' },
    { name: 'Transport', value: 120.5, percentage: 37, color: '#3b82f6' },
    { name: 'Waste', value: 49.7, percentage: 16, color: '#f59e0b' },
  ];

  const yearlyComparison = [
    { year: '2022', emissions: 3800 },
    { year: '2023', emissions: 3600 },
    { year: '2024', emissions: 3400 },
  ];

  // Calculate current metrics
  const currentMonthEmissions = 320.4;
  const greenScore = calculateGreenScore(currentMonthEmissions, companyData.employees);
  const prediction = predictNextMonthEmissions(monthlyData);
  const recommendations = generateRecommendations(
    { electricity: 150.2, transport: 120.5, waste: 49.7 },
    greenScore
  );

  const getScoreColor = (score) => {
    const colors = {
      'A': 'text-green-600 bg-green-100',
      'B': 'text-blue-600 bg-blue-100',
      'C': 'text-amber-600 bg-amber-100',
      'D': 'text-red-600 bg-red-100'
    };
    return colors[score] || 'text-gray-600 bg-gray-100';
  };

  const getTrendIcon = (trend) => {
    return trend === 'decreasing' ? 
      <TrendingDown className="w-4 h-4 text-green-600" /> : 
      <TrendingUp className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome to EcoTrack!</h1>
        <p className="text-gray-600 mt-2">Your Monthly Carbon Footprint Analytics</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-linear-to-r from-green-400 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Emissions</p>
              <p className="text-2xl font-bold">{currentMonthEmissions} kg CO₂</p>
              <p className="text-green-100 text-sm mt-1">This month</p>
            </div>
            <Leaf className="w-8 h-8 text-white opacity-50" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Green Score</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-lg font-bold mt-2 ${getScoreColor(greenScore.score)}`}>
                {greenScore.score}
              </div>
              <p className="text-gray-500 text-xs mt-1">{greenScore.description}</p>
            </div>
            <Target className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Per Employee</p>
              <p className="text-2xl font-bold text-gray-800">{greenScore.emissionsPerEmployee} kg</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(prediction?.trend)}
                <span className="text-xs text-gray-500 ml-1">{prediction?.trend}</span>
              </div>
            </div>
            <TrendingDown className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Next Month Forecast</p>
              <p className="text-2xl font-bold text-gray-800">
                {prediction?.predicted || '--'} kg
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {prediction?.confidence || '--'} confidence
              </p>
            </div>
            <Brain className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Emissions Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="emissions" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emission Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {breakdownData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Yearly Comparison */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Yearly Comparison</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={yearlyComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="year" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="emissions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            AI-Powered Recommendations
          </h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.slice(0, 3).map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-800">{rec.category}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                  rec.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{rec.suggestion}</p>
              <p className="text-xs text-green-600 font-medium">
                Potential reduction: {rec.potentialReduction}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
          <Download className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <Target className="w-4 h-4" />
          <span>Set Targets</span>
        </button>
        <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          <TrendingDown className="w-4 h-4" />
          <span>View Trends</span>
        </button>
      </div>
    </div>
  );
}

export default EnhancedDashboardPanel;
