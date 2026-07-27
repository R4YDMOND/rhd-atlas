interface Props {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h3>
    </div>
  );
}