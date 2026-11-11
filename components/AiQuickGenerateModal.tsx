import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Check, Flame, Clock, Utensils, ArrowRight } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export default function AiQuickGenerateModal({ trigger }: { trigger?: React.ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [calories, setCalories] = useState<number[]>([2100]);
  const [selectedDiet, setSelectedDiet] = useState("Mediterranean High-Protein");
  const [maxPrep, setMaxPrep] = useState("30 mins");
  const [generatedPlan, setGeneratedPlan] = useState<Array<{ slot: string; name: string; kcal: number }> | null>(null);

  const dietOptions = [
  "Mediterranean High-Protein",
  "Plant-Based Whole Food",
  "Lean Low-Carb",
  "Balanced Clean Eating",
  "Gluten-Free Anti-Inflammatory",
  ];

  const handleGenerate = () => {
  const base = calories[0];
  setGeneratedPlan([
  { slot: "Breakfast", name: "Greek Yogurt Pistachio Berry Parfait", kcal: Math.round(base * 0.25) },
  { slot: "Lunch", name: "Herb-Grilled Lemon Chicken & Quinoa Tabbouleh", kcal: Math.round(base * 0.35) },
  { slot: "Snack", name: "Roasted Edamame & Matcha Almond Bites", kcal: Math.round(base * 0.1) },
  { slot: "Dinner", name: "Wild Salmon with Charred Broccolini &Tahini", kcal: Math.round(base * 0.3) },
  ]);
  };

  const handleOpenStudio = () => {
  setOpen(false);
  navigate("/ai-generator");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
    {trigger || (
    <Button size="sm" className="gap-2">
    <Sparkles className="h-4 w-4" />
    <span>Quick AI Plan</span>
    </Button>
    )}
    </DialogTrigger>
    <DialogContent className="sm:max-w-lg">
    <DialogHeader>
    <div className="flex items-center gap-2 text-primary mb-1">
    <Sparkles className="h-5 w-5" />
    <span className="text-xs font-semibold uppercase tracking-wider">NutriPlan AI Engine</span>
    </div>
    <DialogTitle>Instant Personalized Meal Generator</DialogTitle>
    <DialogDescription>
    Customize your target calories, prep time, and dietary focus to generate a fresh day or week of meals.
    </DialogDescription>
    </DialogHeader>

    <div className="flex flex-col gap-5 py-2">
    <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
    <Label className="text-sm font-medium">Daily Calorie Target</Label>
    <span className="text-sm font-semibold text-primary">{calories[0]} kcal</span>
    </div>
    <Slider
    value={calories}
    onValueChange={setCalories}
    min={1400}
    max={3200}
    step={50}
    />
    </div>

    <div className="flex flex-col gap-2">
    <Label className="text-sm font-medium">Dietary Focus</Label>
    <div className="flex flex-wrap gap-2">
    {dietOptions.map((diet) => (
    <Button
    key={diet}
    type="button"
    size="sm"
    variant={selectedDiet === diet ? "default" : "outline"}
    onClick={() => setSelectedDiet(diet)}
    className="text-xs h-8"
    >
    {diet}
    </Button>
    ))}
    </div>
    </div>

    <div className="flex flex-col gap-2">
    <Label className="text-sm font-medium">Max Prep Time per Meal</Label>
    <div className="grid grid-cols-3 gap-2">
    {["15 mins", "30 mins", "45 mins"].map((time) => (
    <Button
    key={time}
    type="button"
    size="sm"
    variant={maxPrep === time ? "secondary" : "outline"}
    onClick={() => setMaxPrep(time)}
    className="text-xs"
    >
    <Clock className="h-3.5 w-3.5 mr-1.5" />
    {time}
    </Button>
    ))}
    </div>
    </div>

    {generatedPlan && (
    <div className="rounded-xl border border-border bg-muted/50 p-4 flex flex-col gap-3">
    <div className="flex items-center justify-between">
    <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
    <Check className="h-4 w-4" /> Ready to Apply
    </span>
    <Badge variant="secondary">{calories[0]} kcal • {selectedDiet}</Badge>
    </div>
    <div className="grid grid-cols-1 gap-2 text-xs">
    {generatedPlan.map((item) => (
    <div
    key={item.slot}
    className="flex items-center justify-between rounded-lg bg-card p-2.5 border border-border"
    >
    <div className="flex items-center gap-2">
    <Utensils className="h-3.5 w-3.5 text-primary" />
    <div>
    <span className="font-semibold text-foreground">{item.slot}: </span>
    <span className="text-muted-foreground">{item.name}</span>
    </div>
    </div>
    <span className="font-medium text-foreground">{item.kcal} kcal</span>
    </div>
    ))}
    </div>
    </div>
    )}

    <div className="flex items-center justify-end gap-2 pt-2">
    <Button variant="outline" onClick={handleGenerate}>
    <Sparkles className="h-4 w-4 mr-1.5" />
    {generatedPlan ? "Regenerate Preview" : "Preview Day Plan"}
    </Button>
    <Button onClick={handleOpenStudio}>
    <span>Open Full AI Studio</span>
    <ArrowRight className="h-4 w-4 ml-1.5" />
    </Button>
    </div>
    </div>
    </DialogContent>
    </Dialog>
  );
}

export { AiQuickGenerateModal };
