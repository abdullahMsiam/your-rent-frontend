'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { RentalRequest } from '@/types';
import { StatusBadge } from '@/components/shared/StatusBadge';

export default function TenantDashboard() {
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<RentalRequest[]>('/rentals')
      .then(setRequests)
      .finally(() => setLoading(false));
  }, []);

  const handlePay = async (rentalRequestId: string) => {
    try {
      const res = await fetchApi<{ paymentUrl: string }>('/payments/create', {
        method: 'POST',
        body: JSON.stringify({ rentalRequestId }),
      });
      window.location.href = res.paymentUrl;
    } catch (err: any) {
      alert(err.message || 'Failed to initiate Stripe Checkout');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Tenant Dashboard</h1>
        <p className="text-slate-500 text-sm">Review your rental requests and payment status.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">My Requests</h2>
        {loading ? (
          <p className="text-slate-500 text-sm">Loading requests...</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div key={req.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-900">{req.property.title}</h4>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={req.status} />
                      <span className="text-xs text-slate-400">Move-in: {new Date(req.moveInDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {req.status === 'APPROVED' && (
                    <button
                      onClick={() => handlePay(req.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition"
                    >
                      Pay Now (${req.totalAmount})
                    </button>
                  )}
                  {req.status === 'PENDING' && (
                    <span className="text-xs text-slate-400 italic">Awaiting Host Approval</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}