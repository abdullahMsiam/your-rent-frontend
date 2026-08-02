import { RequestStatus } from '@/types';

export function StatusBadge({ status }: { status: RequestStatus | 'ACTIVE' }) {
  const styles: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-800 border-amber-300',
    APPROVED: 'bg-blue-100 text-blue-800 border-blue-300',
    REJECTED: 'bg-rose-100 text-rose-800 border-rose-300',
    ACTIVE: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    COMPLETED: 'bg-slate-100 text-slate-700 border-slate-300',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || styles.COMPLETED}`}>
      {status}
    </span>
  );
}