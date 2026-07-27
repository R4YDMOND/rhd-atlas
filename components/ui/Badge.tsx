interface Props {
  status: "active" | "beta" | "draft";
}

export default function Badge({ status }: Props) {
  const styles = {
    active: "bg-emerald-500/20 text-emerald-400",
    beta: "bg-amber-500/20 text-amber-400",
    draft: "bg-zinc-700 text-zinc-300",
  };

  const labels = {
    active: "Активна",
    beta: "Бета",
    draft: "Черновик",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}