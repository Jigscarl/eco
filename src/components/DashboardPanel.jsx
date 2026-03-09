import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, TrendingDown } from 'lucide-react';

const monthlyData = [
  { month: 'Aug', emissions: 280 },
  { month: 'Sep', emissions: 320 },
  { month: 'Oct', emissions: 290 },
  { month: 'Nov', emissions: 310 },
  { month: 'Dec', emissions: 350 },
  { month: 'Jan', emissions: 330 },
  { month: 'Feb', emissions: 300 },
  { month: 'Mar', emissions: 290 },
  { month: 'Apr', emissions: 320 },
  { month: 'May', emissions: 310 },
  { month: 'Jun', emissions: 320 },
];

const breakdownData = [
  { name: 'Electricity', value: 150.2, percentage: 47 },
  { name: 'Transport', value: 120.5, percentage: 37 },
  { name: 'Waste', value: 49.7, percentage: 16 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

function DashboardPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome to EcoTrack!</h1>
        <p className="text-gray-600 mt-2">Your Monthly Carbon Footprint</p>
      </div>

      <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Total Emissions: 320.4 kg CO₂</h2>
              <div className="flex items-center space-x-2">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  Green Score: B Good
                </span>
              </div>
            </div>
            <Leaf className="w-16 h-16 text-white opacity-50" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mb-16"></div>
        <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mt-12"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emissions Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emission Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {breakdownData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Emission Categories</h3>
        <div className="space-y-4">
          {breakdownData.map((item, index) => {
            const Icon = [Leaf, TrendingDown, Leaf][index];
            return (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: COLORS[index] + '20' }}>
                    <Icon className={`w-5 h-5`} style={{ color: COLORS[index] }} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.percentage}% of total</p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-800">{item.value} kg CO₂</p>
              </div>
            );
          })}
        </div>
      </div>

      <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
        Generate Report
      </button>
    </div>
  );
}

export default DashboardPanel;
