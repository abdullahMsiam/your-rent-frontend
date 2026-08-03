'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchApi } from '@/lib/api';
import { Property } from '@/types';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { PropertySkeleton } from '@/components/shared/SkeletonLoader';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<Property[]>('/properties')
      .then((data) => setProperties(Array.isArray(data) ? data.slice(0, 6) : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
          Find Your Nest, <br />
          <span className="text-indigo-600">Rent With Confidence.</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Explore thousands of verified homes, submit applications instantly, and manage your leases seamlessly.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/properties" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl">
            Explore All Listings
          </Link>
          <Link href="/register" className="bg-white border border-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50">
            Get Started
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Listings</h2>
            <p className="text-slate-500 text-sm">Top rated properties available right now.</p>
          </div>
          <Link href="/properties" className="text-sm font-semibold text-indigo-600 hover:underline">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            <PropertySkeleton />
            <PropertySkeleton />
            <PropertySkeleton />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}