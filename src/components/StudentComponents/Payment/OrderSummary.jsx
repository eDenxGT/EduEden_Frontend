import React from 'react';
import Card from '@/components/CommonComponents/Card';
import Button from '@/components/CommonComponents/Button';

const OrderSummary = ({ cart, onCheckout }) => {
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.18; // 18% tax
  const total = subtotal + tax;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.course_id} className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>
            <span className="font-semibold">₹{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (18%)</span>
          <span className="font-semibold">₹{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-2 border-t">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6">
        <Button
          text="Proceed to Payment"
          className="bg-[#FF5722] text-white font-semibold hover:bg-[#F4511E]"
          onClick={onCheckout}
        />
        <p className="text-xs text-gray-500 text-center mt-2">
          By completing your purchase you agree to our terms of service.
        </p>
      </div>
    </Card>
  );
};

export default OrderSummary;