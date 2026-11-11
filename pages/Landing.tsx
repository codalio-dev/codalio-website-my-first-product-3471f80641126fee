import MacroProgressBar from "../components/MacroProgressBar";
import { ArrowRight, Check, CheckCircle2, Clock, Droplets, Flame, RefreshCw, Repeat, ShoppingBasket, Sparkles, UtensilsCrossed } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Separator } from "../components/ui/separator";

function LandingSection0() {
  const navigate = useNavigate();
  const [rebalanced, setRebalanced] = useState(false);
  const [waterCups, setWaterCups] = useState(6);
  const [targets, setTargets] = useState({
    calories: { current: 1420, target: 2100 },
    protein: { current: 112, target: 150 },
    carbs: { current: 135, target: 200 },
    fats: { current: 48, target: 70 },
  });
  const [briefingMessage, setBriefingMessage] = useState(
    "Your personalized Mediterranean High-Protein plan is on track today."
  );

  const handleRebalance = () => {
    setRebalanced(true);
    setTargets({
      calories: { current: 1480, target: 2100 },
      protein: { current: 128, target: 150 },
      carbs: { current: 130, target: 200 },
      fats: { current: 49, target: 70 },
    });
    setBriefingMessage(
      "AI swapped your afternoon snack for Roasted Edamame (+16g protein) to hit your daily muscle recovery goal."
    );
  };
  return (
    <section className="rounded-2xl bg-card border border-border p-6 lg:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full">
      <div className="lg:col-span-7 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-accent text-accent-foreground border-border font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary" />
            Mediterranean High-Protein
          </Badge>
          <Badge variant="outline" className="text-xs">
            Day 14 Streak • 96% Macro Accuracy
          </Badge>
        </div>

        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Good morning, Alex
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {briefingMessage}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-muted/40 p-4 border border-border">
          <MacroProgressBar
            label="Protein"
            current={targets.protein.current}
            target={targets.protein.target}
            unit="g"
          />
          <MacroProgressBar
            label="Carbohydrates"
            current={targets.carbs.current}
            target={targets.carbs.target}
            unit="g"
          />
          <MacroProgressBar
            label="Healthy Fats"
            current={targets.fats.current}
            target={targets.fats.target}
            unit="g"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button onClick={() => navigate("/ai-generator")} className="gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Generate Tomorrow's Plan</span>
          </Button>
          <Button variant="outline" onClick={handleRebalance} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span>{rebalanced ? "Macros Optimized" : "Quick Swap Meal"}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setWaterCups((c) => Math.min(10, c + 1))}
            className="text-xs text-muted-foreground hover:text-foreground ml-auto"
          >
            <Droplets className="h-4 w-4 mr-1.5 text-primary" />
            Hydration: {waterCups}/8 cups (+1)
          </Button>
        </div>
      </div>

      <div className="lg:col-span-5 grid grid-cols-2 gap-3">
        <Card className="overflow-hidden border-border col-span-2 sm:col-span-1">
          <div className="relative aspect-[4/3]">
            <img
              src="/images/ui-prototype/7951848.jpg"
              alt="Next Up Lunch Bowl"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3.5">
              <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                Up Next • 12:30 PM
              </span>
              <h3 className="text-sm font-semibold text-white leading-tight mt-0.5">
                Charred Lemon Herb Salmon Bowl
              </h3>
            </div>
          </div>
        </Card>

        <Card className="border-border bg-secondary/40 flex flex-col justify-between p-4 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Calories Logged</span>
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-foreground">
              {targets.calories.current.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground">
                {" "}
                / {targets.calories.target} kcal
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {targets.calories.target - targets.calories.current} kcal remaining for dinner & snack
            </p>
          </div>
          <Button
            variant="link"
            size="sm"
            className="px-0 justify-start h-auto text-xs text-primary"
            onClick={() => navigate("/nutrition-tracker")}
          >
            View full macro breakdown <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Card>
      </div>
    </section>
  );
}

function LandingSection1() {
  type MealSlot = {
    id: string;
    slot: string;
    time: string;
    name: string;
    image: string;
    prepTime: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    logged: boolean;
    ingredients: string[];
    substitutions: Array<{ original: string; replacement: string; note: string }>;
  };

  const initialMeals: MealSlot[] = [
    {
      id: "m1",
      slot: "Breakfast",
      time: "8:00 AM",
      name: "Poached Eggs & Smashed Avocado Sourdough",
      image: "/images/ui-prototype/8305767.jpg",
      prepTime: "12m",
      calories: 460,
      protein: 28,
      carbs: 38,
      fats: 21,
      logged: true,
      ingredients: ["Pasture Eggs", "Avocado", "Sourdough", "Hemp Seeds"],
      substitutions: [
        { original: "Sourdough", replacement: "Ezekiel Sprouted Toast", note: "+4g protein, lower GI" },
        { original: "Avocado", replacement: "Whipped Cottage Cheese", note: "+11g protein, -80 kcal" },
      ],
    },
    {
      id: "m2",
      slot: "Lunch",
      time: "12:30 PM",
      name: "Mediterranean Grilled Salmon & Farro Bowl",
      image: "/images/ui-prototype/8305767.jpg",
      prepTime: "20m",
      calories: 640,
      protein: 46,
      carbs: 52,
      fats: 24,
      logged: true,
      ingredients: ["Wild Salmon", "Farro", "Cucumber", "Kalamata Olives"],
      substitutions: [
        { original: "Farro", replacement: "Tri-Color Quinoa", note: "Gluten-free complete protein" },
        { original: "Wild Salmon", replacement: "Herb Grilled Chicken Breast", note: "-7g fat, +5g protein" },
      ],
    },
    {
      id: "m3",
      slot: "Afternoon Snack",
      time: "3:30 PM",
      name: "Wild Berry & Chia Protein Smoothie Bowl",
      image: "/images/ui-prototype/8305767.jpg",
      prepTime: "5m",
      calories: 320,
      protein: 26,
      carbs: 34,
      fats: 8,
      logged: false,
      ingredients: ["Whey Isolate", "Blueberries", "Chia Seeds", "Almond Milk"],
      substitutions: [
        { original: "Whey Isolate", replacement: "Pea & Hemp Protein", note: "100% plant-based dairy-free" },
        { original: "Chia Seeds", replacement: "Flaxseed Meal", note: "Higher lignans & omega-3" },
      ],
    },
    {
      id: "m4",
      slot: "Dinner",
      time: "7:00 PM",
      name: "Herb-Crusted Chicken & Roasted Harvest Greens",
      image: "/images/ui-prototype/8305767.jpg",
      prepTime: "25m",
      calories: 580,
      protein: 48,
      carbs: 44,
      fats: 19,
      logged: false,
      ingredients: ["Organic Chicken", "Sweet Potato", "Broccolini", "Tahini"],
      substitutions: [
        { original: "Sweet Potato", replacement: "Roasted Butternut Squash", note: "-14g carbs, rich beta-carotene" },
        { original: "Tahini", replacement: "Greek Yogurt Herb Drizzle", note: "+6g protein, lower fat" },
      ],
    },
  ];

  const swapCatalog: Record<string, { name: string; image: string; calories: number; protein: number }> = {
    m1: {
      name: "Smoked Salmon & Dill Protein Omelet",
      image: "/images/ui-prototype/5331050.jpg",
      calories: 440,
      protein: 34,
    },
    m2: {
      name: "Zesty Tuna & Chickpea Rainbow Salad",
      image: "/images/ui-prototype/5331050.jpg",
      calories: 610,
      protein: 49,
    },
    m3: {
      name: "Matcha Pistachio Greek Yogurt Parfait",
      image: "/images/ui-prototype/5331050.jpg",
      calories: 310,
      protein: 28,
    },
    m4: {
      name: "Garlic Shrimp & Zucchini Ribbon Bowl",
      image: "/images/ui-prototype/5331050.jpg",
      calories: 550,
      protein: 51,
    },
  };

  const [meals, setMeals] = useState<MealSlot[]>(initialMeals);
  const [activeSubMeal, setActiveSubMeal] = useState<MealSlot | null>(null);

  const handleToggleLog = (id: string) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, logged: !m.logged } : m))
    );
  };

  const handleAiSwap = (id: string) => {
    const alt = swapCatalog[id];
    if (!alt) return;
    setMeals((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, name: alt.name, image: alt.image, calories: alt.calories, protein: alt.protein }
          : m
      )
    );
  };

  const applySubstitution = (mealId: string, original: string, replacement: string) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mealId
          ? {
              ...m,
              ingredients: m.ingredients.map((ing) => (ing === original ? replacement : ing)),
            }
          : m
      )
    );
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Today's Scheduled Meals</h2>
          <p className="text-sm text-muted-foreground">
            Check off meals as you eat or tap AI Swap for instant macro-matched alternatives.
          </p>
        </div>
        <Badge variant="secondary" className="w-fit text-xs">
          {meals.filter((m) => m.logged).length} of {meals.length} Meals Logged Today
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <Card
            key={meal.id}
            className={`overflow-hidden flex flex-col border-border transition-all duration-200 ${
              meal.logged ? "ring-2 ring-primary/40 bg-card/90" : "bg-card"
            }`}
          >
            <div className="relative aspect-[4/3]">
              <img
                src={meal.image}
                alt={meal.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <Badge className="bg-black/65 text-white border-white/15 backdrop-blur-sm">
                  {meal.slot}
                </Badge>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-0.5 text-xs text-white backdrop-blur-sm">
                  <Clock className="h-3 w-3" />
                  {meal.prepTime}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3.5">
                <h3 className="text-base font-semibold text-white leading-snug">{meal.name}</h3>
                <p className="text-xs text-white/80 mt-0.5">{meal.time}</p>
              </div>
            </div>

            <CardContent className="p-4 flex-1 flex flex-col justify-between gap-3">
              <div className="grid grid-cols-4 gap-1 text-center rounded-lg bg-muted/50 p-2 border border-border">
                <div>
                  <span className="block text-xs font-bold text-foreground">{meal.calories}</span>
                  <span className="text-[11px] text-foreground/80">kcal</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-primary">{meal.protein}g</span>
                  <span className="text-[11px] text-foreground/80">Prot</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-foreground">{meal.carbs}g</span>
                  <span className="text-[11px] text-foreground/80">Carbs</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-foreground">{meal.fats}g</span>
                  <span className="text-[11px] text-foreground/80">Fats</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {meal.ingredients.map((ing) => (
                  <Badge key={ing} variant="outline" className="text-xs font-normal">
                    {ing}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex flex-col gap-2">
              <div className="flex items-center gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => handleAiSwap(meal.id)}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                  AI Swap
                </Button>
                <Button
                  variant={meal.logged ? "secondary" : "default"}
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => handleToggleLog(meal.id)}
                >
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  {meal.logged ? "Logged" : "Log Meal"}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs text-primary h-7"
                onClick={() => setActiveSubMeal(meal)}
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Ingredient Substitutions
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!activeSubMeal} onOpenChange={(open) => !open && setActiveSubMeal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4 text-primary" />
              AI Ingredient Substitutions
            </DialogTitle>
            <DialogDescription>
              Smart swaps for <strong>{activeSubMeal?.name}</strong> that keep your macros balanced.
            </DialogDescription>
          </DialogHeader>
          {activeSubMeal && (
            <div className="flex flex-col gap-3 py-2">
              {activeSubMeal.substitutions.map((sub, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-muted/40 p-3 flex items-center justify-between gap-3"
                >
                  <div className="text-xs">
                    <span className="font-semibold text-foreground">Replace {sub.original}</span>
                    <p className="text-muted-foreground mt-0.5">
                      Use <strong className="text-primary">{sub.replacement}</strong> ({sub.note})
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="text-xs shrink-0"
                    onClick={() => {
                      applySubstitution(activeSubMeal.id, sub.original, sub.replacement);
                      setActiveSubMeal(null);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function LandingSection2() {
  const navigate = useNavigate();

  const [swaps, setSwaps] = useState([
    {
      id: "s1",
      missing: "Fresh Broccolini (Dinner)",
      substitute: "Roasted Asparagus Spears",
      impact: "Saves 45 kcal • Adds Folate & Vitamin K • Same 12-min roast time",
      applied: false,
    },
    {
      id: "s2",
      missing: "Pine Nuts (Lunch Pesto)",
      substitute: "Toasted Pumpkin Seeds (Pepitas)",
      impact: "Nut-free • +5g plant protein • Rich in magnesium & zinc",
      applied: true,
    },
    {
      id: "s3",
      missing: "Heavy Cream (Tomorrow's Pasta)",
      substitute: "Blended Silken Tofu & Nutritional Yeast",
      impact: "-180 kcal per serving • +12g protein • Zero saturated fat",
      applied: false,
    },
  ]);

  const [groceryItems, setGroceryItems] = useState([
    { id: "g1", name: "Wild Alaskan Salmon Fillets", qty: "24 oz", checked: false },
    { id: "g2", name: "Organic Baby Spinach & Kale", qty: "2 tubs", checked: true },
    { id: "g3", name: "Greek Strained Yogurt (0%)", qty: "32 oz", checked: false },
    { id: "g4", name: "Tri-Color Organic Quinoa", qty: "16 oz", checked: false },
    { id: "g5", name: "Cold-Pressed Extra Virgin Olive Oil", qty: "1 bottle", checked: true },
  ]);

  const toggleSwap = (id: string) => {
    setSwaps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: !s.applied } : s))
    );
  };

  const toggleGrocery = (id: string) => {
    setGroceryItems((prev) =>
      prev.map((g) => (g.id === id ? { ...g, checked: !g.checked } : g))
    );
  };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      <Card className="lg:col-span-2 border-border bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">AI Kitchen Assistant & Smart Substitutions</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">Pantry Sync Active</Badge>
          </div>
          <CardDescription>
            Running low on an ingredient for tonight? Apply 1-click AI substitutions tailored to your allergies and macro goals.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {swaps.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-3.5"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Repeat className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-foreground line-through opacity-70">
                      {item.missing}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-semibold text-primary">{item.substitute}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.impact}</p>
                </div>
              </div>
              <Button
                size="sm"
                variant={item.applied ? "secondary" : "outline"}
                onClick={() => toggleSwap(item.id)}
                className="text-xs shrink-0"
              >
                {item.applied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1.5 text-primary" />
                    Applied to Recipe
                  </>
                ) : (
                  "Use Substitute"
                )}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border bg-card flex flex-col justify-between">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingBasket className="h-5 w-5 text-primary" />
              Grocery Snapshot
            </CardTitle>
            <Badge className="bg-primary text-primary-foreground text-xs">
              {groceryItems.filter((i) => !i.checked).length} Needed
            </Badge>
          </div>
          <CardDescription>
            Auto-generated for your next 3 days of planned meals.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-2.5">
          {groceryItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleGrocery(item.id)}
              className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-xs hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`h-4 w-4 rounded flex items-center justify-center border ${
                    item.checked
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-input bg-background"
                  }`}
                >
                  {item.checked && <Check className="h-3 w-3" />}
                </div>
                <span
                  className={`font-medium ${
                    item.checked ? "line-through text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {item.name}
                </span>
              </div>
              <span className="text-muted-foreground">{item.qty}</span>
            </button>
          ))}
          <Separator className="my-1" />
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs mt-auto"
            onClick={() => navigate("/grocery-list")}
          >
            Open Full Smart Grocery List
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 w-full min-w-0">
        <LandingSection0 />
        <LandingSection1 />
        <LandingSection2 />
      </div>
    </div>
  );
}
