import { useState } from 'react';
import { Zap, Fuel, Trash2 } from 'lucide-react';
import { validateDataEntryForm } from '../utils/validation';

function DataEntryPanel() {
  const [formData, setFormData] = useState({
    electricity: '',
    fuel: '',
    waste: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateDataEntryForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    console.log('Submitting data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle form submission here
      alert('Data submitted successfully!');
      setFormData({ electricity: '', fuel: '', waste: '' });
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Data Entry</h1>
        <p className="text-gray-600 mt-2">Log Your Activities</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electricity Usage
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Zap className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="electricity"
                value={formData.electricity}
                onChange={handleInputChange}
                placeholder="Kilowatt Hours (KWH)"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
                  errors.electricity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.electricity && (
              <p className="mt-1 text-sm text-red-600">{errors.electricity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Consumption
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Fuel className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="fuel"
                value={formData.fuel}
                onChange={handleInputChange}
                placeholder="Liters of Fuel"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
                  errors.fuel ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.fuel && (
              <p className="mt-1 text-sm text-red-600">{errors.fuel}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Waste Production
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Trash2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="waste"
                value={formData.waste}
                onChange={handleInputChange}
                placeholder="Kilograms of Waste"
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
                  errors.waste ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.waste && (
              <p className="mt-1 text-sm text-red-600">{errors.waste}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Data'}
          </button>
        </form>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="shrink-0">
            <Zap className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Tips for accurate tracking</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Check your electricity meter for accurate KWH readings</li>
                <li>Track fuel consumption from receipts or vehicle display</li>
                <li>Weigh waste regularly for consistent measurements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataEntryPanel;
