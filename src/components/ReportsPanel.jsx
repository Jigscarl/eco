import { FileText, Download, Leaf, TrendingDown, Recycle } from 'lucide-react';

function ReportsPanel({ checkPremiumAccess, userSubscription }) {
  const emissionData = [
    { category: 'Electricity', amount: 150.2, icon: Leaf, color: 'green' },
    { category: 'Transport', amount: 122.5, icon: TrendingDown, color: 'blue' },
    { category: 'Waste', amount: 49.7, icon: Recycle, color: 'amber' },
  ];

  const recommendations = [
    'Switch to renewable energy sources.',
    'Reduce fuel usage by carpooling.',
    'Increase recycling efforts.',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
        <p className="text-gray-600 mt-2">Your Monthly Report</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Report for April 2026</h2>
        </div>

        <div className="bg-linear-to-r from-green-400 to-green-600 rounded-xl p-6 text-white relative overflow-hidden mb-6">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Total Emissions: 320.4 kg CO₂</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-white text-gray-800 bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                    Green Score: B
                  </span>
                </div>
              </div>
              <FileText className="w-16 h-16 text-white opacity-50" />
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mb-16"></div>
          <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mt-12"></div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emission Summary</h3>
          <div className="space-y-3">
            {emissionData.map((item) => {
              const Icon = item.icon;
              const colorClasses = {
                green: 'bg-green-100 text-green-600',
                blue: 'bg-blue-100 text-blue-600',
                amber: 'bg-amber-100 text-amber-600',
              };
              return (
                <div key={item.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[item.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-800">{item.category}</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">{item.amount} kg CO₂</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 shrink-0"></div>
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-12 h-12 text-green-600" />
            </div>
            <p className="text-sm text-gray-600">Keep up the good work!</p>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => {
              if (checkPremiumAccess('pdf')) {
                // Handle PDF download
                console.log('Downloading PDF report...');
                alert('📄 PDF report downloaded successfully!');
              }
            }}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors w-full sm:w-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
            {!userSubscription && (
              <span className="ml-1 text-xs bg-white text-gray-700 bg-opacity-20 px-2 py-1 rounded">PRO</span>
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
            className="flex items-center justify-center space-x-2 bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors w-full sm:w-auto"
          >
            <span>Export to Excel</span>
            {!userSubscription && (
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">PRO</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsPanel;
