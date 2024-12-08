import React from 'react';
import { CreditCard } from 'lucide-react';
import Card from '@/components/CommonComponents/Card';

const PaymentMethod = ({ selectedMethod, onMethodSelect }) => {
  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: 'debit-card',
      name: 'Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <span className="text-xl">UPI</span>,
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <CreditCard size={20} />
        Payment Method
      </h2>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-md cursor-pointer transition-colors ${
              selectedMethod === method.id
                ? 'border-[#FF5722] bg-orange-50'
                : 'border-gray-200 hover:border-[#FF5722]'
            }`}
          >
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => onMethodSelect(method.id)}
              className="hidden"
            />
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                selectedMethod === method.id
                  ? 'border-[#FF5722]'
                  : 'border-gray-300'
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  selectedMethod === method.id ? 'bg-[#FF5722]' : ''
                }`} />
              </div>
              <div className="flex items-center gap-2">
                {method.icon}
                <span className="font-medium">{method.name}</span>
              </div>
            </div>
          </label>
        ))}
      </div>
    </Card>
  );
};

export default PaymentMethod;