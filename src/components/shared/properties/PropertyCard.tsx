import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import { Bed, Bath, MapPin } from 'lucide-react';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
      <div className="relative h-56 w-full">
        <Image
          src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full uppercase">
          {property.category?.name || 'Verified'}
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-slate-900 text-lg truncate">{property.title}</h3>
          <span className="text-indigo-600 font-extrabold text-lg">${property.price}<span className="text-xs text-slate-500 font-normal">/mo</span></span>
        </div>
        <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
          <MapPin className="w-4 h-4 text-slate-400" /> {property.city}, {property.address}
        </p>
        <div className="flex items-center gap-4 text-slate-600 text-sm pt-3 border-t border-slate-100 mb-4">
          <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {property.bedrooms} Beds</span>
          <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {property.bathrooms} Baths</span>
        </div>
        <Link href={`/properties/${property.id}`} className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-xl text-sm transition">
          View Details
        </Link>
      </div>
    </div>
  );
}