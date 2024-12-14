import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const WithdrawModal = ({ isOpen, onClose, onSubmit, card }) => {
  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    method: 'card',
    upiId: ''
  })

  const handleChange = (e) => {
    setWithdrawData({ ...withdrawData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(withdrawData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Withdraw Money</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={withdrawData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">Withdrawal Method</Label>
              <Select name="method" onValueChange={(value) => handleChange({ target: { name: 'method', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select withdrawal method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {withdrawData.method === 'card' && (
              <div className="space-y-2">
                <Label>Card Details</Label>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                  <p className="text-sm">
                    {card?.type} ending in {card?.last4}
                  </p>
                </div>
              </div>
            )}
            {withdrawData.method === 'upi' && (
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  name="upiId"
                  value={withdrawData.upiId}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button className="bg-[#FF5722] hover:bg-[#F4511E]" type="submit">Withdraw</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default WithdrawModal

