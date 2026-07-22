"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const sendSchema = z.object({
  recipient: z.string().min(3, 'Recipient is required'),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
});

type SendFormValues = z.infer<typeof sendSchema>;

export default function SendPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<SendFormValues | null>(null);
  const [txHash, setTxHash] = useState('');
  const [isSending, setIsSending] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<SendFormValues>({
    resolver: zodResolver(sendSchema),
    defaultValues: {
      recipient: '',
      amount: '',
    }
  });

  const amount = watch('amount');

  const onReview = (data: SendFormValues) => {
    setFormData(data);
    setStep(2);
  };

  const onConfirm = async () => {
    setIsSending(true);
    try {
      // Mock API call to backend
      const response = await fetch('http://localhost:3001/api/transactions/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: '123e4567-e89b-12d3-a456-426614174000', // Mock sender
          recipientId: null,
          amount: formData?.amount,
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setTxHash('0x' + Math.random().toString(16).slice(2, 42)); // Mock tx hash
        setStep(3);
        toast.success('Payment sent instantly!');
      } else {
        toast.error('Payment failed. Try again.');
      }
    } catch (e) {
      toast.error('Payment failed. Try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link href="/" className="text-gray-500 hover:text-gray-900 flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>

      <div className="glass-card">
        {step === 1 && (
          <form onSubmit={handleSubmit(onReview)} className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold mb-2">Send Payment</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
              <input 
                {...register('recipient')}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                placeholder="Email, @username, or 0x..."
              />
              {errors.recipient && <p className="text-red-500 text-sm mt-1">{errors.recipient.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input 
                  {...register('amount')}
                  type="number"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition font-mono text-lg"
                  placeholder="0.00"
                />
              </div>
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
              
              <div className="flex gap-2 mt-3">
                {['5', '10', '25', '50'].map(val => (
                  <button 
                    key={val}
                    type="button"
                    onClick={() => setValue('amount', val, { shouldValidate: true })}
                    className="px-3 py-1 bg-gray-100 hover:bg-primary-light hover:text-primary-dark rounded-full text-sm font-medium transition"
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 mt-4 text-lg">
              Review Payment
            </button>
          </form>
        )}

        {step === 2 && formData && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold mb-2">Review Payment</h2>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">To:</span>
                <span className="font-semibold">{formData.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="font-mono font-bold">${Number(formData.amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Network Fee:</span>
                <span className="font-mono text-sm text-gray-500">$0.00 (Instant)</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-mono font-bold text-lg text-primary-dark">${Number(formData.amount).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)} 
                className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                disabled={isSending}
                className="flex-1 btn-primary py-3 flex justify-center items-center gap-2"
              >
                {isSending ? 'Processing...' : <><Send size={18} /> Confirm</>}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6 text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <Send size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Sent!</h2>
            <p className="text-gray-500">
              Your transfer of <span className="font-bold text-gray-900">${Number(formData?.amount).toFixed(2)}</span> has been sent instantly via Sera Pay.
            </p>
            
            <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 font-mono break-all mt-4 mb-2">
              TX: {txHash}
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <Link href="/" className="btn-primary py-3 w-full block text-center">
                Return to Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
