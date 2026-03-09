import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">


      {/* Hero Section */}

      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-white">

        <div className="max-w-xl">

          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Track Your Carbon Footprint
          </h1>

          <p className="text-gray-600 mb-6">
            EcoTrack helps businesses monitor emissions from electricity,
            fuel and waste to support sustainable operations.
          </p>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
            Get Started
          </button>

        </div>

        <div className="mt-10 md:mt-0">

          <div className="w-96 h-60 bg-green-100 rounded-lg flex items-center justify-center text-gray-600">
            Dashboard Preview
          </div>

        </div>

      </section>


      {/* Features */}

      <section className="px-10 py-20 text-center">

        <h2 className="text-3xl font-semibold mb-10">
          EcoTrack Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold mb-3">
              Emission Tracking
            </h3>

            <p className="text-gray-600">
              Track electricity, fuel and waste emissions easily.
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold mb-3">
              Analytics Dashboard
            </h3>

            <p className="text-gray-600">
              Visual charts showing environmental impact trends.
            </p>

          </div>


          <div className="bg-white p-6 rounded-xl shadow">

            <h3 className="text-xl font-semibold mb-3">
              Sustainability Reports
            </h3>

            <p className="text-gray-600">
              Generate downloadable carbon footprint reports.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}