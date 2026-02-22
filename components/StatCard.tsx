interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
}

export default function StatCard({ label, value, sublabel }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center border border-navy-50">
      <p className="text-sm font-sans text-navy-400 uppercase tracking-wide">{label}</p>
      <p className="text-4xl font-serif font-bold text-navy mt-2">{value}</p>
      {sublabel && (
        <p className="text-xs font-sans text-navy-300 mt-1">{sublabel}</p>
      )}
    </div>
  );
}
