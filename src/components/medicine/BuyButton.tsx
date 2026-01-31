'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { orderService } from '@/services/order.service'
import { toast } from 'sonner'

interface BuyButtonProps {
  medicineId: string
}

export default function BuyButton({ medicineId }: BuyButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [shippingAddress, setShippingAddress] = useState('')
  const [loading, setLoading] = useState(false)

  const handleOrder = async () => {
    if (quantity <= 0) {
      toast.error('Quantity must be at least 1')
      return
    }

    if (!shippingAddress.trim()) {
      toast.error('Please enter a shipping address')
      return
    }

    const toastId = toast.loading('Ordering...')
    setLoading(true)

    const res = await orderService.createOrder(medicineId, {
      quantity,
      shippingAddress,
    })

    setLoading(false)

    if (res?.error) {
      toast.error('Order Failed', { id: toastId })
      return
    }

    toast.success('Order placed successfully 🎉', { id: toastId })
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-slate-700">Quantity</span>
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-4 py-2 hover:bg-slate-100 disabled:opacity-50"
            disabled={loading}
          >
            <Minus size={16} />
          </button>

          <span className="px-4 py-2 font-bold text-slate-800">
            {quantity}
          </span>

          <button
            type="button"
            onClick={() => setQuantity(q => q + 1)}
            className="px-4 py-2 hover:bg-slate-100"
            disabled={loading}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-slate-700">
          Shipping Address
        </label>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your full delivery address"
          rows={3}
          disabled={loading}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Buy Button */}
      <button
        onClick={handleOrder}
        disabled={loading}
        className="bg-blue-600 hover:bg-slate-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-blue-100"
      >
        <ShoppingCart size={20} />
        {loading ? 'Ordering...' : 'Buy Now'}
      </button>
    </div>
  )
}
