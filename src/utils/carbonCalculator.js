// Carbon Calculation Engine - Emission Factors
const EMISSION_FACTORS = {
  electricity: {
    factor: 0.233, // kg CO₂ per kWh
    unit: 'kWh'
  },
  petrol: {
    factor: 2.31, // kg CO₂ per litre
    unit: 'litres'
  },
  diesel: {
    factor: 2.68, // kg CO₂ per litre
    unit: 'litres'
  },
  waste: {
    factor: 0.57, // kg CO₂ per kg
    unit: 'kg'
  },
  water: {
    factor: 0.0003, // kg CO₂ per litre
    unit: 'litres'
  },
  flights: {
    factor: 0.115, // kg CO₂ per km (average for short-haul flights)
    unit: 'km'
  }
};

// Green Score Algorithm
export function calculateGreenScore(totalEmissions, numberOfEmployees) {
  const emissionsPerEmployee = totalEmissions / numberOfEmployees;
  
  let score = 'D';
  let color = 'red';
  let description = 'Poor - Significant improvement needed';
  
  if (emissionsPerEmployee < 100) {
    score = 'A';
    color = 'green';
    description = 'Excellent - Environmental leader';
  } else if (emissionsPerEmployee >= 100 && emissionsPerEmployee < 300) {
    score = 'B';
    color = 'blue';
    description = 'Good - On the right track';
  } else if (emissionsPerEmployee >= 300 && emissionsPerEmployee < 600) {
    score = 'C';
    color = 'amber';
    description = 'Average - Room for improvement';
  }
  
  return {
    score,
    color,
    description,
    emissionsPerEmployee: Math.round(emissionsPerEmployee * 10) / 10
  };
}

// Calculate emissions for a specific category
export function calculateEmissions(category, value, fuelType = 'petrol') {
  const factor = EMISSION_FACTORS[category];
  if (!factor) return 0;
  
  // For transport, handle different fuel types
  if (category === 'petrol' || category === 'diesel') {
    return value * EMISSION_FACTORS[fuelType].factor;
  }
  
  return value * factor.factor;
}

// Calculate total carbon footprint
export function calculateTotalCarbonFootprint(data) {
  let total = 0;
  const breakdown = {};
  
  // Electricity emissions
  if (data.electricity) {
    const emissions = calculateEmissions('electricity', data.electricity);
    breakdown.electricity = emissions;
    total += emissions;
  }
  
  // Transport emissions
  if (data.transport) {
    const emissions = calculateEmissions(data.fuelType || 'petrol', data.transport, data.fuelType || 'petrol');
    breakdown.transport = emissions;
    total += emissions;
  }
  
  // Waste emissions
  if (data.waste) {
    const emissions = calculateEmissions('waste', data.waste);
    breakdown.waste = emissions;
    total += emissions;
  }
  
  // Optional: Water emissions
  if (data.water) {
    const emissions = calculateEmissions('water', data.water);
    breakdown.water = emissions;
    total += emissions;
  }
  
  // Optional: Flight emissions
  if (data.flights) {
    const emissions = calculateEmissions('flights', data.flights);
    breakdown.flights = emissions;
    total += emissions;
  }
  
  return {
    total: Math.round(total * 10) / 10,
    breakdown
  };
}

// Generate recommendations based on emission breakdown
export function generateRecommendations(breakdown, greenScore) {
  const recommendations = [];
  
  // Electricity recommendations
  if (breakdown.electricity > 100) {
    recommendations.push({
      category: 'Electricity',
      priority: 'high',
      suggestion: 'Switch to renewable energy sources or install solar panels',
      potentialReduction: '15-25%'
    });
    recommendations.push({
      category: 'Electricity',
      priority: 'medium',
      suggestion: 'Upgrade to LED lighting and energy-efficient appliances',
      potentialReduction: '10-15%'
    });
  }
  
  // Transport recommendations
  if (breakdown.transport > 80) {
    recommendations.push({
      category: 'Transport',
      priority: 'high',
      suggestion: 'Implement vehicle fleet optimization and route planning',
      potentialReduction: '20-30%'
    });
    recommendations.push({
      category: 'Transport',
      priority: 'medium',
      suggestion: 'Consider electric vehicles or hybrid alternatives',
      potentialReduction: '40-60%'
    });
  }
  
  // Waste recommendations
  if (breakdown.waste > 30) {
    recommendations.push({
      category: 'Waste',
      priority: 'medium',
      suggestion: 'Increase recycling efforts and waste segregation',
      potentialReduction: '20-30%'
    });
    recommendations.push({
      category: 'Waste',
      priority: 'low',
      suggestion: 'Implement composting and waste reduction programs',
      potentialReduction: '10-15%'
    });
  }
  
  // Score-specific recommendations
  if (greenScore.score === 'D') {
    recommendations.push({
      category: 'Overall',
      priority: 'high',
      suggestion: 'Consider hiring an environmental consultant for comprehensive audit',
      potentialReduction: '30-50%'
    });
  }
  
  return recommendations;
}

// Predict next month's emissions (simple linear regression)
export function predictNextMonthEmissions(historicalData) {
  if (historicalData.length < 2) return null;
  
  // Simple linear regression calculation
  const n = historicalData.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
  historicalData.forEach((data, index) => {
    sumX += index;
    sumY += data.emissions;
    sumXY += index * data.emissions;
    sumX2 += index * index;
  });
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  // Predict next month
  const nextMonthPrediction = slope * n + intercept;
  
  return {
    predicted: Math.round(Math.max(0, nextMonthPrediction) * 10) / 10,
    trend: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
    confidence: n >= 6 ? 'high' : n >= 3 ? 'medium' : 'low'
  };
}

export default EMISSION_FACTORS;
