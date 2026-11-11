import { Clock, Flame, Sparkles, Check, Plus, RefreshCw } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export default function MealRecipeCard({
  title,
  image,
  mealType,
  prepTime = "20m",
  calories = 520,
  protein = 38,
  carbs = 45,
  fats = 18,
  tags = [],
  aiTip,
  logged = false,
  actionLabel = "Log Meal",
  onSelect,
  onSwap,
}: {
  title: string;
  image: string;
  mealType?: string;
  prepTime?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  tags?: string[];
  aiTip?: string;
  logged?: boolean;
  actionLabel?: string;
  onSelect?: () => void;
  onSwap?: () => void;
}) {
  return (
    <Card className="overflow-hidden flex flex-col h-full border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
    <img
    src={image}
    alt={title}
    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
    {mealType && (
    <Badge className="bg-black/60 text-white border-white/20 backdrop-blur-sm">
    {mealType}
    </Badge>
    )}
    {prepTime && (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
    <Clock className="h-3 w-3" />
    {prepTime}
    </span>
    )}
    </div>
    <div className="absolute inset-x-0 bottom-0 p-4">
    <h3 className="text-base font-semibold text-white leading-snug line-clamp-2">{title}</h3>
    <div className="mt-1.5 flex items-center gap-3 text-xs text-white/90">
    <span className="inline-flex items-center gap-1 font-medium">
    <Flame className="h-3.5 w-3.5 text-amber-400" />
    {calories} kcal
    </span>
    <span>P: {protein}g</span>
    <span>C: {carbs}g</span>
    <span>F: {fats}g</span>
    </div>
    </div>
    </div>
    <CardContent className="p-4 flex-1 flex flex-col justify-between gap-3">
    {tags && tags.length > 0 && (
    <div className="flex flex-wrap gap-1.5">
    {tags.map((tag) => (
    <Badge key={tag} variant="secondary" className="text-xs font-normal">
    {tag}
    </Badge>
    ))}
    </div>
    )}
    {aiTip && (
    <div className="rounded-lg bg-accent/60 p-2.5 text-xs text-accent-foreground flex items-start gap-2">
    <Sparkles className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
    <span>{aiTip}</span>
    </div>
    )}
    </CardContent>
    <CardFooter className="p-4 pt-0 flex items-center gap-2">
    {onSwap && (
    <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={onSwap}>
    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
    Swap
    </Button>
    )}
    {onSelect && (
    <Button
    variant={logged ? "secondary" : "default"}
    size="sm"
    className="flex-1 text-xs"
    onClick={onSelect}
    >
    {logged ? (
    <>
    <Check className="h-3.5 w-3.5 mr-1.5" />
    Logged
    </>
    ) : (
    <>
    <Plus className="h-3.5 w-3.5 mr-1.5" />
    {actionLabel}
    </>
    )}
    </Button>
    )}
    </CardFooter>
    </Card>
  );
}

export { MealRecipeCard };
