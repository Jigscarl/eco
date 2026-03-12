import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Zap, Fuel, Trash2 as WasteIcon, Droplet, Plane } from 'lucide-react';
import { calculateTotalCarbonFootprint, calculateGreenScore } from '../utils/carbonCalculator';

function DataEntryDashboard() {
  const [entries, setEntries] = useState(() => [
    {
      id: 1,
      month: 'January',
      year: 2024,
      electricity: 450,
      transport: 200,
      fuelType: 'petrol',
      waste: 120,
      water: 5000,
      flights: 0,
      recyclingPercentage: 30,
      emissions: { total: 382.4, breakdown: { electricity: 104.85, transport: 462, waste: 68.4, water: 1.5, flights: 0 } }
    },
    {
      id: 2,
      month: 'February',
      year: 2024,
      electricity: 420,
      transport: 180,
      fuelType: 'petrol',
      waste: 110,
      water: 4800,
      flights: 500,
      recyclingPercentage: 35,
      emissions: { total: 401.2, breakdown: { electricity: 97.86, transport: 415.8, waste: 62.7, water: 1.44, flights: 123.4 } }
    },
    {
      id: 3,
      month: 'March',
      year: 2024,
      electricity: 380,
      transport: 150,
      fuelType: 'diesel',
      waste: 100,
      water: 4500,
      flights: 0,
      recyclingPercentage: 40,
      emissions: { total: 345.6, breakdown: { electricity: 88.54, transport: 346.5, waste: 57, water: 1.35, flights: 0 } }
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [nextId, setNextId] = useState(3);
  const [formData, setFormData] = useState({
    month: '',
    year: new Date().getFullYear(),
    electricity: '',
    transport: '',
    fuelType: 'petrol',
    waste: '',
    water: '',
    flights: '',
    recyclingPercentage: ''
  });

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEmissions = () => {
    const data = {
      electricity: parseFloat(formData.electricity) || 0,
      transport: parseFloat(formData.transport) || 0,
      fuelType: formData.fuelType,
      waste: parseFloat(formData.waste) || 0,
      water: parseFloat(formData.water) || 0,
      flights: parseFloat(formData.flights) || 0
    };
    
    return calculateTotalCarbonFootprint(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emissions = calculateEmissions();
    const newEntry = {
      id: nextId,
      ...formData,
      emissions,
      electricity: parseFloat(formData.electricity) || 0,
      transport: parseFloat(formData.transport) || 0,
      waste: parseFloat(formData.waste) || 0,
      water: parseFloat(formData.water) || 0,
      flights: parseFloat(formData.flights) || 0,
      recyclingPercentage: parseFloat(formData.recyclingPercentage) || 0
    };

    if (editingId) {
      setEntries(prev => prev.map(entry => entry.id === editingId ? { ...newEntry, id: editingId } : entry));
      setEditingId(null);
    } else {
      setEntries(prev => [...prev, newEntry]);
      setNextId(prev => prev + 1);
    }

    resetForm();
  };

  const handleEdit = (entry) => {
    setFormData({
      month: entry.month,
      year: entry.year,
      electricity: entry.electricity.toString(),
      transport: entry.transport.toString(),
      fuelType: entry.fuelType,
      waste: entry.waste.toString(),
      water: entry.water.toString(),
      flights: entry.flights.toString(),
      recyclingPercentage: entry.recyclingPercentage.toString()
    });
    setEditingId(entry.id);
    setIsAdding(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      month: '',
      year: new Date().getFullYear(),
      electricity: '',
      transport: '',
      fuelType: 'petrol',
      waste: '',
      water: '',
      flights: '',
      recyclingPercentage: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const getGreenScoreColor = (score) => {
    const colors = {
      'A': 'bg-green-100 text-green-800',
      'B': 'bg-blue-100 text-blue-800',
      'C': 'bg-amber-100 text-amber-800',
      'D': 'bg-red-100 text-red-800'
    };
    return colors[score] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Data Entry Dashboard</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your monthly carbon footprint data</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        )}
      </div>

      {/* Data Entry Form */}
      {isAdding && (
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            {editingId ? 'Edit Entry' : 'Add New Entry'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                  required
                >
                  <option value="">Select month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="2024"
                  min="2020"
                  max="2030"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Zap className="inline w-4 h-4 mr-1" />
                  Electricity (kWh)
                </label>
                <input
                  type="number"
                  name="electricity"
                  value={formData.electricity}
                  onChange={handleInputChange}
                  placeholder="450"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Fuel className="inline w-4 h-4 mr-1" />
                  Transport (km)
                </label>
                <input
                  type="number"
                  name="transport"
                  value={formData.transport}
                  onChange={handleInputChange}
                  placeholder="200"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <WasteIcon className="inline w-4 h-4 mr-1" />
                  Waste (kg)
                </label>
                <input
                  type="number"
                  name="waste"
                  value={formData.waste}
                  onChange={handleInputChange}
                  placeholder="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Droplet className="inline w-4 h-4 mr-1" />
                  Water (litres)
                </label>
                <input
                  type="number"
                  name="water"
                  value={formData.water}
                  onChange={handleInputChange}
                  placeholder="5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Plane className="inline w-4 h-4 mr-1" />
                  Flights (km)
                </label>
                <input
                  type="number"
                  name="flights"
                  value={formData.flights}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recycling Percentage (%)</label>
              <input
                type="number"
                name="recyclingPercentage"
                value={formData.recyclingPercentage}
                onChange={handleInputChange}
                placeholder="30"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? 'Update' : 'Save'}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center justify-center space-x-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors w-full sm:w-auto"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[600px] sm:min-w-0">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Electricity</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transport</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Emissions</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Green Score</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => {
                const greenScore = calculateGreenScore(entry.emissions.total, 50); // Assuming 50 employees
                return (
                  <tr key={entry.id}>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="sm:hidden">
                        <div className="font-medium">{entry.month} {entry.year}</div>
                      </div>
                      <div className="hidden sm:block">
                        {entry.month} {entry.year}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="sm:hidden">
                        <div className="text-xs font-medium text-gray-900">Electricity</div>
                        <div>{entry.electricity} kWh</div>
                      </div>
                      <div className="hidden sm:block">
                        {entry.electricity} kWh
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="sm:hidden">
                        <div className="text-xs font-medium text-gray-900">Transport</div>
                        <div>{entry.transport} {entry.fuelType === 'petrol' ? 'L' : 'L'}</div>
                      </div>
                      <div className="hidden sm:block">
                        {entry.transport} {entry.fuelType === 'petrol' ? 'L' : 'L'}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="sm:hidden">
                        <div className="text-xs font-medium text-gray-900">Waste</div>
                        <div>{entry.waste} kg</div>
                        <div className="text-xs">{entry.recyclingPercentage}% recycled</div>
                      </div>
                      <div className="hidden sm:block">
                        {entry.waste} kg ({entry.recyclingPercentage}% recycled)
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      <div className="sm:hidden">
                        <div className="text-xs font-medium text-gray-500">Total Emissions</div>
                        <div>{entry.emissions.total} kg CO₂</div>
                      </div>
                      <div className="hidden sm:block">
                        {entry.emissions.total} kg CO₂
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="sm:hidden">
                        <div className="text-xs font-medium text-gray-500 mb-1">Green Score</div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGreenScoreColor(greenScore.score)}`}>
                        {greenScore.score}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium">
                      <div className="sm:hidden">
                        <div className="text-xs font-medium text-gray-500 mb-2">Actions</div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataEntryDashboard;
