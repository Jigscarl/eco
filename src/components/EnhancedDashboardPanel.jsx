import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import { Leaf, TrendingDown, TrendingUp, AlertTriangle, Target, Brain, Download } from 'lucide-react';
import { calculateGreenScore, predictNextMonthEmissions, generateRecommendations } from '../utils/carbonCalculator';
import { useState } from 'react';

function EnhancedDashboardPanel({ checkPremiumAccess, userSubscription }) {
  const isFirstTimeUser = useState(() => {
    // Check if user has visited before
    const hasVisitedBefore = localStorage.getItem('ecotrack_user_visited');
    if (!hasVisitedBefore) {
      // Mark user as visited for future sessions
      localStorage.setItem('ecotrack_user_visited', 'true');
      return true;
    } else {
      return false;
    }
  })[0];

  const companyData = {
    name: isFirstTimeUser ? 'Your Company' : 'XYZ Traders',
    employees: isFirstTimeUser ? 1 : 50,
    industry: isFirstTimeUser ? 'General' : 'Retail'
  };

  // Sample historical data for charts (empty for first-time users)
  const monthlyData = isFirstTimeUser ? [] : [
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

  const breakdownData = isFirstTimeUser ? [] : [
    { name: 'Electricity', value: 150.2, percentage: 47, color: '#10b981' },
    { name: 'Transport', value: 120.5, percentage: 37, color: '#3b82f6' },
    { name: 'Waste', value: 49.7, percentage: 16, color: '#f59e0b' },
  ];

  const yearlyComparison = isFirstTimeUser ? [] : [
    { year: '2022', emissions: 3800 },
    { year: '2023', emissions: 3600 },
    { year: '2024', emissions: 3400 },
  ];

  // Calculate current metrics
  const currentMonthEmissions = isFirstTimeUser ? 0 : 320.4;
  const greenScore = calculateGreenScore(currentMonthEmissions, companyData.employees);
  const prediction = predictNextMonthEmissions(monthlyData);
  const recommendations = isFirstTimeUser ? 
    ["Start tracking your emissions to get personalized recommendations", "Begin with electricity usage monitoring", "Set up your company profile for better insights"] :
    generateRecommendations(
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
        <h1 className="text-3xl font-bold text-gray-800">
          {isFirstTimeUser ? 'Welcome to EcoTrack!' : 'Welcome to EcoTrack!'}
        </h1>
        <p className="text-gray-600 mt-2">
          {isFirstTimeUser ? 
            'Start your carbon footprint tracking journey - You currently have zero emissions!' : 
            'Your Monthly Carbon Footprint Analytics'
          }
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-linear-to-r from-green-400 to-green-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs sm:text-sm">Total Emissions</p>
              <p className="text-xl sm:text-2xl font-bold">{currentMonthEmissions} kg CO₂</p>
              <p className="text-green-100 text-xs sm:text-sm mt-1">
                {isFirstTimeUser ? 'No data yet' : 'This month'}
              </p>
            </div>
            <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-50" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Green Score</p>
              <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-base sm:text-lg font-bold mt-2 ${getScoreColor(greenScore.score)}`}>
                {greenScore.score}
              </div>
              <p className="text-gray-500 text-xs mt-1">{greenScore.description}</p>
            </div>
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Per Employee</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">{greenScore.emissionsPerEmployee} kg</p>
              <div className="flex items-center mt-1">
                {isFirstTimeUser ? (
                  <span className="text-xs text-green-600 ml-1">Perfect start!</span>
                ) : (
                  <>
                    {getTrendIcon(prediction?.trend)}
                    <span className="text-xs text-gray-500 ml-1">{prediction?.trend}</span>
                  </>
                )}
              </div>
            </div>
            <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs sm:text-sm">Next Month Forecast</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                {isFirstTimeUser ? '--' : (prediction?.predicted || '--')} kg
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {isFirstTimeUser ? 'Start tracking' : (prediction?.confidence || '--') + ' confidence'}
              </p>
            </div>
            <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Monthly Emissions Trend</h3>
          {isFirstTimeUser ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[250px] text-gray-400">
              <div className="text-center">
                <Leaf className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs sm:text-sm">No data yet</p>
                <p className="text-xs mt-1">Start tracking to see your trends</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
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
          )}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Emission Breakdown</h3>
          {isFirstTimeUser ? (
            <div className="flex items-center justify-center h-[200px] sm:h-[250px] text-gray-400">
              <div className="text-center">
                <Leaf className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs sm:text-sm">No data yet</p>
                <p className="text-xs mt-1">Start tracking to see your breakdown</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
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
          )}
          {!isFirstTimeUser && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3 sm:mt-4">
              {breakdownData.map((item) => (
                <div key={item.name} className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs sm:text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Yearly Comparison */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Yearly Comparison</h3>
        {isFirstTimeUser ? (
          <div className="flex items-center justify-center h-[150px] sm:h-[200px] text-gray-400">
            <div className="text-center">
              <Leaf className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
              <p className="text-xs sm:text-sm">No data yet</p>
              <p className="text-xs mt-1">Start tracking to see your yearly trends</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={yearlyComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip />
              <Bar dataKey="emissions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
            {isFirstTimeUser ? 'Getting Started' : 'AI-Powered Recommendations'}
          </h3>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {recommendations.slice(0, 3).map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-800">
                  {isFirstTimeUser ? 'Getting Started' : rec.category}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isFirstTimeUser ? 'bg-blue-100 text-blue-700' :
                  rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                  rec.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {isFirstTimeUser ? 'New' : rec.priority}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">
                {typeof rec === 'string' ? rec : rec.suggestion}
              </p>
              <p className="text-xs text-green-600 font-medium">
                {isFirstTimeUser ? 'Start your journey today!' : `Potential reduction: ${rec.potentialReduction}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
        <button 
          onClick={() => {
            if (checkPremiumAccess('pdf')) {
              // Handle PDF download
              console.log('Downloading PDF report...');
              alert('📄 PDF report downloaded successfully!');
            }
          }}
          className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
        >
          <Download className="w-4 h-4" />
          <span>Download Report</span>
          {!userSubscription && (
            <span className="ml-1 text-xs bg-white text-gray-800 bg-opacity-20 px-2 py-1 rounded">PRO</span>
          )}
        </button>
        <button 
          onClick={() => {
            if (checkPremiumAccess('excel')) {
              // Handle Excel export
              console.log('Exporting to Excel...');
              alert('📊 Excel export completed successfully!');
            }
          }}
          className="flex items-center justify-center space-x-2 bg-white text-green-600 border border-green-600 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-green-50 transition-colors text-sm sm:text-base"
        >
          <span>Export to Excel</span>
          {!userSubscription && (
            <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">PRO</span>
          )}
        </button>
        <button 
          onClick={() => {
            if (checkPremiumAccess('email')) {
              // Handle email sharing
              console.log('Opening email share dialog...');
              alert('✉️ Email share dialog opened!');
            }
          }}
          className="flex items-center justify-center space-x-2 bg-white text-gray-600 border border-gray-300 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          <span>Share via Email</span>
          {!userSubscription && (
            <span className="ml-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">PRO</span>
          )}
        </button>
      </div>

      {/* Subscription Status */}
      {userSubscription && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">
                {userSubscription.charAt(0).toUpperCase() + userSubscription.slice(1)} Plan Active
              </span>
            </div>
            <span className="text-xs text-green-600">
              All premium features unlocked
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnhancedDashboardPanel;
