import { useState } from 'react';
import { X, CreditCard, Check, Star, Zap, Shield, Crown } from 'lucide-react';

function PaymentModal({ isOpen, onClose, feature, onPaymentSuccess }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      period: 'month',
      features: [
        'PDF Reports (5 per month)',
        'Basic Excel Export',
        'Email Sharing (10 per month)',
        'Standard Support'
      ],
      icon: Star,
      color: 'blue',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19.99,
      period: 'month',
      features: [
        'Unlimited PDF Reports',
        'Advanced Excel Export',
        'Unlimited Email Sharing',
        'Priority Support',
        'Custom Branding',
        'API Access'
      ],
      icon: Zap,
      color: 'green',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      period: 'month',
      features: [
        'Everything in Pro',
        'White-label Reports',
        'Advanced Analytics',
        'Dedicated Account Manager',
        'Custom Integrations',
        'SLA Guarantee'
      ],
      icon: Crown,
      color: 'purple',
      popular: false
    }
  ];

  const featureDescriptions = {
    pdf: {
      title: 'Unlock PDF Reports',
      description: 'Generate professional PDF reports with your carbon footprint data, charts, and insights.',
      icon: '📄'
    },
    excel: {
      title: 'Unlock Excel Export',
      description: 'Export your detailed emissions data to Excel for further analysis and reporting.',
      icon: '📊'
    },
    email: {
      title: 'Unlock Email Sharing',
      description: 'Share your carbon footprint reports directly via email with stakeholders and team members.',
      icon: '✉️'
    }
  };

  const currentFeature = featureDescriptions[feature] || featureDescriptions.pdf;

  const handlePayment = async (plan) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(plan);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h2>
              <p className="text-gray-600 mt-1">Unlock advanced features and insights</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Feature Description */}
        <div className="p-6 bg-linear-to-r from-green-50 to-blue-50 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{currentFeature.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentFeature.title}</h3>
              <p className="text-gray-600">{currentFeature.description}</p>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
                    selectedPlan === plan.id
                      ? 'border-green-500 bg-green-50'
                      : plan.popular
                      ? 'border-green-200 bg-white hover:border-green-300'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-2 text-${plan.color}-600`} />
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePayment(plan.id);
                    }}
                    disabled={isProcessing}
                    className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors ${
                      selectedPlan === plan.id
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : plan.popular
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </span>
                    ) : (
                      `Get ${plan.name}`
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Badge */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Secure payment powered by Stripe</span>
            <CreditCard className="w-4 h-4" />
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            Cancel anytime. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
