import { Leaf, TrendingDown, BarChart3, Users, ArrowRight } from 'lucide-react';

function Landing({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center space-x-2">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-800">EcoTrack</span>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Track Your Carbon Footprint with EcoTrack
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Monitor and reduce your environmental impact with our comprehensive carbon footprint tracking platform. 
            Get insights, track progress, and make a difference for our planet.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-green-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-green-700 transition-colors inline-flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <span>Start Tracking Your Carbon Footprint Today!</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Real-time Tracking</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Monitor your daily carbon emissions from electricity, transport, and waste with detailed analytics.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Reduce Impact</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Get personalized recommendations to reduce your carbon footprint and track your progress over time.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Community Impact</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Join a community of environmentally conscious individuals working towards a sustainable future.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600 text-sm sm:text-base">Active Users</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600 text-sm sm:text-base">Tons CO₂ Reduced</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">100+</div>
              <div className="text-gray-600 text-sm sm:text-base">Cities Covered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-2">4.8★</div>
              <div className="text-gray-600 text-sm sm:text-base">User Rating</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center bg-linear-to-r from-green-400 to-green-600 rounded-xl p-6 sm:p-8 text-white relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 px-4">
            Join thousands of users who are already tracking and reducing their carbon footprint.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-green-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 w-full sm:w-auto justify-center"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default Landing;
