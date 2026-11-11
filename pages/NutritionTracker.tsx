import { Activity, CheckCircle2, Droplets, Flame, Plus, Sparkles, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

function NutritionTrackerSection0() {
  const [water, setWater] = useState(6);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Card className="border-border bg-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Calories Remaining</CardTitle>
          <Flame className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-foreground">420 kcal</span>
            <Badge variant="secondary" className="text-xs">1,680 / 2,100</Badge>
          </div>
          <Progress value={80} className="h-2" />
          <span className="text-xs text-muted-foreground">340 kcal active exercise burn credited</span>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Protein Target</CardTitle>
          <Activity className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-primary">134g</span>
            <span className="text-xs text-muted-foreground">/ 150g goal (89%)</span>
          </div>
          <Progress value={89} className="h-2" />
          <span className="text-xs text-muted-foreground">16g left • Optimal for lean recovery</span>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Carbs & Healthy Fats</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">Carbs: 162g / 200g</span>
            <span className="font-medium text-foreground">Fats: 54g / 70g</span>
          </div>
          <Progress value={81} className="h-2" />
          <span className="text-xs text-muted-foreground">Low glycemic load • 28g dietary fiber</span>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">Daily Hydration</CardTitle>
          <Droplets className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-foreground">
              {water} <span className="text-sm font-normal text-muted-foreground">/ 8 glasses</span>
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2.5 text-xs"
              onClick={() => setWater((w) => Math.min(12, w + 1))}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              250ml
            </Button>
          </div>
          <Progress value={Math.min(100, (water / 8) * 100)} className="h-2" />
          <span className="text-xs text-muted-foreground">{water * 250}ml logged today</span>
        </CardContent>
      </Card>
    </section>
  );
}

function NutritionTrackerSection1() {
  const [timeframe, setTimeframe] = useState("week");

  const weeklyBars = [
    { day: "Mon", kcal: 2080 },
    { day: "Tue", kcal: 2120 },
    { day: "Wed", kcal: 1990 },
    { day: "Thu", kcal: 2095 },
    { day: "Fri", kcal: 2140 },
    { day: "Sat", kcal: 2050 },
    { day: "Sun", kcal: 1680 },
  ];
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      <Card className="lg:col-span-2 border-border bg-card">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg">Weekly Calorie & Macronutrient Trends</CardTitle>
            <CardDescription>Daily intake vs. 2,100 kcal target across the week</CardDescription>
          </div>
          <Tabs value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="week" className="text-xs">This Week</TabsTrigger>
              <TabsTrigger value="14d" className="text-xs">Last 14 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-3 items-end h-48 pt-6 pb-2 px-2 border-b border-border">
            {weeklyBars.map((bar) => {
              const heightPct = Math.round((bar.kcal / 2400) * 100);
              return (
                <div key={bar.day} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-semibold text-foreground">{bar.kcal}</span>
                  <div className="w-full max-w-[38px] bg-muted rounded-t-lg h-32 flex items-end overflow-hidden">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-primary rounded-t-lg transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{bar.day}</span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-xs text-muted-foreground">
            <span>Target Zone: 2,000 – 2,150 kcal/day</span>
            <span className="font-semibold text-primary">92% Weekly Plan Adherence</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">AI Metabolic Insights</CardTitle>
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <CardDescription>Personalized patterns from your logged meals</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="rounded-xl bg-accent/50 p-3.5 border border-primary/20 text-xs">
            <p className="font-semibold text-foreground flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              Morning Protein Consistency
            </p>
            <p className="text-muted-foreground mt-1">
              Days where you log 30g+ protein at breakfast show 24% fewer evening snack cravings.
            </p>
          </div>
          <div className="rounded-xl bg-muted/40 p-3.5 border border-border text-xs">
            <p className="font-semibold text-foreground">Omega-3 & Fiber Synergy</p>
            <p className="text-muted-foreground mt-1">
              Your salmon and chia seed meals put you in the top 5% for anti-inflammatory fatty acid balance.
            </p>
          </div>
          <Badge variant="outline" className="w-fit text-xs">
            Updated after Today's Lunch Log
          </Badge>
        </CardContent>
      </Card>
    </section>
  );
}

function NutritionTrackerSection2() {
  const [quickFood, setQuickFood] = useState("");
  const [entries, setEntries] = useState([
    { slot: "Breakfast", name: "Poached Eggs & Smashed Avocado Sourdough", kcal: 460, protein: 28 },
    { slot: "Lunch", name: "Mediterranean Grilled Salmon & Farro Bowl", kcal: 640, protein: 46 },
    { slot: "Snack", name: "Wild Berry & Chia Protein Smoothie", kcal: 320, protein: 26 },
    { slot: "Post-Workout", name: "Cold-Pressed Greens & Whey Recovery Shake", kcal: 260, protein: 34 },
  ]);

  const micros = [
    { name: "Dietary Fiber", current: 28, goal: 32, unit: "g" },
    { name: "Iron", current: 15, goal: 18, unit: "mg" },
    { name: "Vitamin D", current: 16, goal: 20, unit: "mcg" },
    { name: "Omega-3 EPA/DHA", current: 1.8, goal: 2.0, unit: "g" },
    { name: "Sodium (Limit)", current: 1750, goal: 2300, unit: "mg" },
  ];

  const handleQuickAdd = () => {
    const clean = quickFood.trim();
    if (!clean) return;
    setEntries((prev) => [
      ...prev,
      { slot: "Extra", name: clean, kcal: 180, protein: 12 },
    ]);
    setQuickFood("");
  };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <Card className="lg:col-span-7 border-border bg-card">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="text-lg">Today's Food Log</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              value={quickFood}
              onChange={(e) => setQuickFood(e.target.value)}
              placeholder="Quick log food (e.g. Handful of Almonds)..."
              className="h-8 text-xs w-48 sm:w-60"
            />
            <Button size="sm" onClick={handleQuickAdd} className="h-8 text-xs">
              <Plus className="h-3.5 w-3.5 mr-1" />
              Log
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meal</TableHead>
                <TableHead>Dish</TableHead>
                <TableHead className="text-right">Calories</TableHead>
                <TableHead className="text-right">Protein</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{row.slot}</Badge>
                  </TableCell>
                  <TableCell className="font-medium text-xs sm:text-sm">{row.name}</TableCell>
                  <TableCell className="text-right text-xs font-semibold">{row.kcal} kcal</TableCell>
                  <TableCell className="text-right text-xs text-primary font-semibold">{row.protein}g</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-5 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Key Micronutrients</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {micros.map((m) => {
            const pct = Math.min(100, Math.round((m.current / m.goal) * 100));
            return (
              <div key={m.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{m.name}</span>
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{m.current}</strong> / {m.goal} {m.unit} ({pct}%)
                  </span>
                </div>
                <Progress value={pct} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
}

export default function NutritionTracker() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 w-full min-w-0">
        <NutritionTrackerSection0 />
        <NutritionTrackerSection1 />
        <NutritionTrackerSection2 />
      </div>
    </div>
  );
}
