import { Check, Leaf, Plus, ShieldAlert, Sliders, Utensils, X } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Switch } from "../components/ui/switch";

function DietaryPreferencesSection0() {
  const dietStyles = [
    "Balanced",
    "Mediterranean",
    "High-Protein",
    "Vegetarian",
    "Vegan",
    "Keto / Low-Carb",
    "Pescatarian",
    "Paleo",
  ];

  const allergies = [
    "Dairy-Free",
    "Gluten-Free",
    "Peanut-Free",
    "Tree Nut-Free",
    "Shellfish-Free",
    "Soy-Free",
    "Egg-Free",
    "Sesame-Free",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Mediterranean");
  const [activeAllergies, setActiveAllergies] = useState<string[]>(["Peanut-Free", "Tree Nut-Free"]);
  const [dislikes, setDislikes] = useState<string[]>(["Cilantro", "Blue Cheese"]);
  const [newDislike, setNewDislike] = useState("");

  const toggleAllergy = (name: string) => {
    setActiveAllergies((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleAddDislike = () => {
    const clean = newDislike.trim();
    if (!clean) return;
    if (!dislikes.includes(clean)) {
      setDislikes((prev) => [...prev, clean]);
    }
    setNewDislike("");
  };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Dietary Lifestyle & Culinary Focus</CardTitle>
          </div>
          <CardDescription>
            Choose your primary eating pattern so NutriPlan AI tailors every recipe and weekly plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {dietStyles.map((style) => (
              <Button
                key={style}
                type="button"
                variant={selectedStyle === style ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedStyle(style)}
                className="text-xs h-9"
              >
                {style}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2 border-t border-border">
            <Label className="text-sm font-medium">Disliked Ingredients (Excluded from AI Plans)</Label>
            <div className="flex flex-wrap gap-2">
              {dislikes.map((item) => (
                <Badge key={item} variant="secondary" className="gap-1.5 py-1 px-2.5 text-xs">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => setDislikes((prev) => prev.filter((i) => i !== item))}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newDislike}
                onChange={(e) => setNewDislike(e.target.value)}
                placeholder="Add ingredient to avoid (e.g. Mushrooms)..."
                className="h-9 text-xs"
              />
              <Button size="sm" variant="outline" onClick={handleAddDislike} className="h-9 text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Strict Allergy & Intolerance Guardrails</CardTitle>
          </div>
          <CardDescription>
            Active toggles automatically filter recipes and trigger safe AI ingredient substitutions.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allergies.map((allergy) => {
            const isOn = activeAllergies.includes(allergy);
            return (
              <div
                key={allergy}
                className="flex items-center justify-between rounded-xl border border-border p-3 bg-muted/20"
              >
                <Label htmlFor={allergy} className="text-xs font-medium cursor-pointer">
                  {allergy}
                </Label>
                <Switch
                  id={allergy}
                  checked={isOn}
                  onCheckedChange={() => toggleAllergy(allergy)}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}

function DietaryPreferencesSection1() {
  const [goalPreset, setGoalPreset] = useState("Maintain & Tone");
  const [dailyKcal, setDailyKcal] = useState<number[]>([2100]);
  const [servings, setServings] = useState(2);
  const [equipment, setEquipment] = useState<string[]>([
    "Air Fryer",
    "High-Speed Blender",
    "Sheet Pan",
    "Cast Iron Skillet",
  ]);
  const [saved, setSaved] = useState(false);

  const toggleEquip = (item: string) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <Card className="lg:col-span-7 border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Calorie & Macronutrient Targets</CardTitle>
          </div>
          <CardDescription>
            Configure your daily energy target and macro split for automatic weekly meal balancing.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium">Primary Fitness Goal</Label>
            <Select value={goalPreset} onValueChange={setGoalPreset}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lose Weight (-400 kcal)">Lose Weight (-400 kcal)</SelectItem>
                <SelectItem value="Maintain & Tone">Maintain & Tone</SelectItem>
                <SelectItem value="Lean Muscle Gain (+300 kcal)">Lean Muscle Gain (+300 kcal)</SelectItem>
                <SelectItem value="Athletic Performance">Athletic Performance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">Daily Calorie Target</span>
              <span className="font-bold text-primary text-sm">{dailyKcal[0]} kcal / day</span>
            </div>
            <Slider value={dailyKcal} onValueChange={setDailyKcal} min={1400} max={3400} step={50} />
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-xl bg-muted/40 p-4 border border-border text-center">
            <div>
              <span className="text-xs text-muted-foreground block">Protein (30%)</span>
              <span className="text-base font-bold text-primary">
                {Math.round((dailyKcal[0] * 0.3) / 4)}g
              </span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">Carbs (40%)</span>
              <span className="text-base font-bold text-foreground">
                {Math.round((dailyKcal[0] * 0.4) / 4)}g
              </span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground block">Healthy Fats (30%)</span>
              <span className="text-base font-bold text-foreground">
                {Math.round((dailyKcal[0] * 0.3) / 9)}g
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-5 border-border bg-card flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Household & Kitchen Setup</CardTitle>
          </div>
          <CardDescription>
            Scale portion sizes and match recipes to the appliances you own.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-medium">Household Portions per Recipe</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 4].map((num) => (
                <Button
                  key={num}
                  type="button"
                  size="sm"
                  variant={servings === num ? "default" : "outline"}
                  onClick={() => setServings(num)}
                  className="h-8 text-xs"
                >
                  {num} {num === 1 ? "Person" : "People"}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-medium">Available Kitchen Equipment</Label>
            <div className="flex flex-wrap gap-2">
              {["Air Fryer", "High-Speed Blender", "Sheet Pan", "Instant Pot", "Cast Iron Skillet"].map(
                (eq) => {
                  const active = equipment.includes(eq);
                  return (
                    <Button
                      key={eq}
                      type="button"
                      size="sm"
                      variant={active ? "secondary" : "outline"}
                      onClick={() => toggleEquip(eq)}
                      className="text-xs h-8"
                    >
                      {active && <Check className="h-3.5 w-3.5 mr-1 text-primary" />}
                      {eq}
                    </Button>
                  );
                }
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border pt-4 flex items-center justify-between">
          {saved ? (
            <Badge className="bg-accent text-accent-foreground text-xs">
              <Check className="h-3.5 w-3.5 mr-1 text-primary" />
              Preferences Saved to AI Engine
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground">Auto-syncs with Weekly Planner</span>
          )}
          <Button size="sm" onClick={() => setSaved(true)}>
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default function DietaryPreferences() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 w-full min-w-0">
        <DietaryPreferencesSection0 />
        <DietaryPreferencesSection1 />
      </div>
    </div>
  );
}
