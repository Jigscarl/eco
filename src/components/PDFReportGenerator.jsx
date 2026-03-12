import { useState } from 'react';
import { Download, FileText, Calendar, Building, Users, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

function PDFReportGenerator({ checkPremiumAccess, userSubscription }) {
  const [selectedMonth, setSelectedMonth] = useState('April 2024');
  const [isGenerating, setIsGenerating] = useState(false);
  const reportIdRef = useState(() => `ECO-${Date.now()}`);

  const reportData = {
    company: {
      name: 'XYZ Traders',
      industry: 'Retail',
      location: 'Nairobi, Kenya',
      employees: 50,
      registrationNumber: 'BN/2024/12345'
    },
    period: selectedMonth,
    emissions: {
      electricity: { amount: 150.2, unit: 'kg CO₂', percentage: 47 },
      transport: { amount: 120.5, unit: 'kg CO₂', percentage: 37 },
      waste: { amount: 49.7, unit: 'kg CO₂', percentage: 16 },
      total: { amount: 320.4, unit: 'kg CO₂' }
    },
    greenScore: {
      score: 'B',
      color: 'blue',
      description: 'Good - On the right track',
      emissionsPerEmployee: 6.4
    },
    recommendations: [
      {
        category: 'Electricity',
        priority: 'High',
        suggestion: 'Switch to renewable energy sources or install solar panels',
        potentialReduction: '15-25%',
        impact: 'High'
      },
      {
        category: 'Transport',
        priority: 'Medium',
        suggestion: 'Implement vehicle fleet optimization and route planning',
        potentialReduction: '20-30%',
        impact: 'Medium'
      },
      {
        category: 'Waste',
        priority: 'Medium',
        suggestion: 'Increase recycling efforts and waste segregation',
        potentialReduction: '20-30%',
        impact: 'Medium'
      }
    ],
    trends: {
      currentVsLastMonth: '+5.2%',
      currentVsLastYear: '-12.3%',
      targetCompliance: 'Target: 300 kg CO₂/month',
      status: 'Slightly above target'
    }
  };

  const months = [
    'January 2024', 'February 2024', 'March 2024', 'April 2024',
    'May 2024', 'June 2024', 'July 2024', 'August 2024',
    'September 2024', 'October 2024', 'November 2024', 'December 2024'
  ];

  const handleGeneratePDF = () => {
    if (!checkPremiumAccess('pdf')) {
      return; // Payment modal will be shown by checkPremiumAccess
    }
    
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      console.log('Generating PDF report for:', selectedMonth);
      console.log('Report data:', reportData);
      
      // In a real implementation, this would use a library like jsPDF or react-pdf
      const pdfData = {
        ...reportData,
        generatedAt: new Date().toISOString(),
        reportId: `ECO-${Date.now()}`
      };
      
      // Create a blob and download
      const blob = new Blob([JSON.stringify(pdfData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `EcoTrack-Report-${selectedMonth.replace(' ', '-')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setIsGenerating(false);
      alert('Report generated successfully! (In production, this would be a PDF file)');
    }, 2000);
  };

  const getScoreColor = (score) => {
    const colors = {
      'A': 'bg-green-100 text-green-800 border-green-200',
      'B': 'bg-blue-100 text-blue-800 border-blue-200',
      'C': 'bg-amber-100 text-amber-800 border-amber-200',
      'D': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[score] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-700 border-red-200',
      'Medium': 'bg-amber-100 text-amber-700 border-amber-200',
      'Low': 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">PDF Report Generator</h1>
          <p className="text-gray-600 mt-2">Generate professional carbon footprint reports</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate PDF</span>
                {!userSubscription && (
                  <span className="ml-1 text-xs bg-white bg-opacity-20 px-2 py-1 rounded">PRO</span>
                )}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Report Header */}
        <div className="bg-linear-to-r from-green-600 to-blue-600 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">EcoTrack Environmental Report</h2>
              <p className="text-green-100">Comprehensive Carbon Footprint Analysis</p>
            </div>
            <FileText className="w-16 h-16 text-white opacity-50" />
          </div>
        </div>

        {/* Company Information */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2 text-green-600" />
            Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Company Name</p>
              <p className="font-medium text-gray-900">{reportData.company.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Industry</p>
              <p className="font-medium text-gray-900">{reportData.company.industry}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium text-gray-900">{reportData.company.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Employees</p>
              <p className="font-medium text-gray-900">{reportData.company.employees}</p>
            </div>
          </div>
        </div>

        {/* Report Period */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Report Period
          </h3>
          <p className="text-lg font-medium text-gray-900">{reportData.period}</p>
        </div>

        {/* Emissions Summary */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Emissions Summary</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800">Total Carbon Footprint</h4>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(reportData.greenScore.score)}`}>
                    Score: {reportData.greenScore.score}
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {reportData.emissions.total.amount} {reportData.emissions.total.unit}
                </p>
                <p className="text-sm text-gray-600 mb-4">{reportData.greenScore.description}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{reportData.greenScore.emissionsPerEmployee} kg CO₂ per employee</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Emission Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(reportData.emissions).filter(([key]) => key !== 'total').map(([category, data]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3" style={{
                        backgroundColor: category === 'electricity' ? '#10b981' : 
                                        category === 'transport' ? '#3b82f6' : '#f59e0b'
                      }}></div>
                      <span className="font-medium text-gray-800 capitalize">{category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{data.amount} {data.unit}</p>
                      <p className="text-xs text-gray-600">{data.percentage}% of total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingDown className="w-5 h-5 mr-2 text-green-600" />
            Performance Trends
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">vs Last Month</p>
              <p className="text-lg font-semibold text-red-600">{reportData.trends.currentVsLastMonth}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">vs Last Year</p>
              <p className="text-lg font-semibold text-green-600">{reportData.trends.currentVsLastYear}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">Target Status</p>
              <p className="text-lg font-semibold text-amber-600">{reportData.trends.status}</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-green-600" />
            Recommendations
          </h3>
          <div className="space-y-4">
            {reportData.recommendations.map((rec, index) => (
              <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-semibold capitalize">{rec.category}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <span className="text-sm font-medium">{rec.potentialReduction} reduction</span>
                </div>
                <p className="text-gray-700 mb-2">{rec.suggestion}</p>
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span>Expected Impact: {rec.impact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Footer */}
        <div className="bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            Generated on {new Date().toLocaleDateString()} by EcoTrack Carbon Footprint Tracker
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Report ID: {reportIdRef[0]}
          </p>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-5 h-5 text-red-600" />
            <span className="font-medium">Download PDF</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-5 h-5 text-green-600" />
            <span className="font-medium">Download Excel</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Share via Email</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PDFReportGenerator;
