import { Progress } from "./ui/progress";


export default function MacroProgressBar({
  label = "Protein",
  current = 110,
  target = 150,
  unit = "g",
  colorClass = "",
}: {
  label?: string;
  current?: number;
  target?: number;
  unit?: string;
  colorClass?: string;
}) {
  const percentage = Math.min(100, Math.round((current / Math.max(target, 1)) * 100));
  return (
    <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between text-xs">
    <span className="font-medium text-foreground">{label}</span>
    <span className="text-muted-foreground font-medium">
    <strong className="text-foreground">{current}</strong> / {target} {unit}
    </span>
    </div>
    <Progress value={percentage} className={`h-2 ${colorClass || ""}`} />
    </div>
  );
}

export { MacroProgressBar };
