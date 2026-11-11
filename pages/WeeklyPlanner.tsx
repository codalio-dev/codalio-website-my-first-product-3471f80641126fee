import { ArrowLeftRight, Calendar, Check, Clock, Flame, Plus, RefreshCw, ShoppingBasket, Sparkles, Wallet } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

function WeeklyPlannerSection0() {
  const navigate = useNavigate();
  const [weekRange] = useState("May 12 – May 18");
  const [dietPreset, setDietPreset] = useState("High-Protein Mediterranean");
  const [statusNote, setStatusNote] = useState<string | null>(null);
  return (
    <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card p-4 sm:p-5 rounded-xl border border-border shadow-sm w-full">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-sm font-semibold text-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{weekRange}</span>
        </div>

        <Select value={dietPreset} onValueChange={setDietPreset}>
          <SelectTrigger className="w-[230px] h-9 text-xs">
            <SelectValue placeholder="Dietary Preset" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High-Protein Mediterranean">High-Protein Mediterranean</SelectItem>
            <SelectItem value="Plant-Based Whole Food">Plant-Based Whole Food</SelectItem>
            <SelectItem value="Lean Low-Carb (1800 kcal)">Lean Low-Carb (1800 kcal)</SelectItem>
            <SelectItem value="Athletic Muscle Gain">Athletic Muscle Gain</SelectItem>
          </SelectContent>
        </Select>

        {statusNote && (
          <Badge className="bg-accent text-accent-foreground border-border text-xs">
            <Check className="h-3.5 w-3.5 mr-1 text-primary" />
            {statusNote}
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Button
          size="sm"
          onClick={() => setStatusNote(`AI Auto-Filled ${dietPreset} for ${weekRange}`)}
          className="gap-1.5 text-xs"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Auto-Fill Week with AI
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setStatusNote("Daily protein balanced to 145g+ across all 7 days")}
          className="gap-1.5 text-xs"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Rebalance Macros
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => navigate("/grocery-list")}
          className="gap-1.5 text-xs"
        >
          <ShoppingBasket className="h-3.5 w-3.5" />
          Export to Grocery List
        </Button>
      </div>
    </section>
  );
}

function WeeklyPlannerSection1() {
  type PlannedMeal = {
    slot: string;
    title: string;
    kcal: number;
    protein: number;
    image: string;
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const images = [
    "/images/ui-prototype/7009982.jpg",
    "/images/ui-prototype/7009982.jpg",
    "/images/ui-prototype/7009982.jpg",
    "/images/ui-prototype/7009982.jpg",
    "/images/ui-prototype/1207952.jpg",
    "/images/ui-prototype/1207952.jpg",
    "/images/ui-prototype/1207952.jpg",
  ];

  const initialSchedule: Record<string, PlannedMeal[]> = {
    Mon: [
      { slot: "Breakfast", title: "Greek Yogurt & Berry Hemp Bowl", kcal: 480, protein: 34, image: images[0] },
      { slot: "Lunch", title: "Lemon Herb Quinoa & Chickpea Salad", kcal: 690, protein: 42, image: images[1] },
      { slot: "Dinner", title: "Grilled Garlic Chicken & Broccolini", kcal: 890, protein: 68, image: images[2] },
    ],
    Tue: [
      { slot: "Breakfast", title: "Spinach Feta Egg White Frittata", kcal: 460, protein: 38, image: images[3] },
      { slot: "Lunch", title: "Mediterranean Salmon & Farro Bowl", kcal: 720, protein: 48, image: images[4] },
      { slot: "Dinner", title: "Lean Turkey Zucchini Skillet", kcal: 860, protein: 62, image: images[5] },
    ],
    Wed: [
      { slot: "Breakfast", title: "Chia Overnight Oats with Pistachios", kcal: 490, protein: 31, image: images[6] },
      { slot: "Lunch", title: "Charred Chicken Souvlaki Pita Plate", kcal: 710, protein: 52, image: images[0] },
      { slot: "Dinner", title: "Seared Cod & White Bean Ratatouille", kcal: 840, protein: 59, image: images[1] },
    ],
    Thu: [
      { slot: "Breakfast", title: "Smoked Salmon & Avocado Rye Toast", kcal: 510, protein: 35, image: images[2] },
      { slot: "Lunch", title: "Roasted Veggie & Halloumi Grain Bowl", kcal: 680, protein: 39, image: images[3] },
      { slot: "Dinner", title: "Herb Flank Steak & Sweet Potato Mash", kcal: 910, protein: 66, image: images[4] },
    ],
    Fri: [
      { slot: "Breakfast", title: "Cottage Cheese Protein Pancakes", kcal: 470, protein: 36, image: images[5] },
      { slot: "Lunch", title: "Tuna Nicoise Olive & Egg Salad", kcal: 660, protein: 47, image: images[6] },
      { slot: "Dinner", title: "Pesto Shrimp & Roasted Zucchini Pasta", kcal: 890, protein: 61, image: images[0] },
    ],
    Sat: [
      { slot: "Breakfast", title: "Shakshuka Poached Eggs in Spiced Tomato", kcal: 520, protein: 33, image: images[1] },
      { slot: "Lunch", title: "Grilled Chicken & Crispy Kale Caesar", kcal: 690, protein: 51, image: images[2] },
      { slot: "Dinner", title: "Wild Salmon Souvlaki & Tzatziki", kcal: 880, protein: 64, image: images[3] },
    ],
    Sun: [
      { slot: "Breakfast", title: "Almond Matcha Protein Smoothie Bowl", kcal: 450, protein: 34, image: images[4] },
      { slot: "Lunch", title: "Lentil & Roasted Pepper Mezze Platter", kcal: 670, protein: 38, image: images[5] },
      { slot: "Dinner", title: "Rosemary Roast Chicken & Root Veggies", kcal: 920, protein: 67, image: images[6] },
    ],
  };

  const aiReplacements = [
    { title: "Zesty Lime Shrimp & Avocado Quinoa", kcal: 640, protein: 52, image: images[1] },
    { title: "Crispy Tofu & Edamame Sesame Bowl", kcal: 590, protein: 41, image: images[4] },
    { title: "Herbed Chicken & Artichoke Orzo", kcal: 680, protein: 54, image: images[2] },
  ];

  const [viewMode, setViewMode] = useState("week");
  const [activeDay, setActiveDay] = useState("Mon");
  const [schedule, setSchedule] = useState<Record<string, PlannedMeal[]>>(initialSchedule);
  const [selectedForSwap, setSelectedForSwap] = useState<{ day: string; index: number; meal: PlannedMeal } | null>(null);
  const [detailModal, setDetailModal] = useState<{ day: string; index: number; meal: PlannedMeal } | null>(null);

  const handleSlotClick = (day: string, index: number, meal: PlannedMeal) => {
    if (!selectedForSwap) {
      setSelectedForSwap({ day, index, meal });
      return;
    }
    if (selectedForSwap.day === day && selectedForSwap.index === index) {
      setSelectedForSwap(null);
      return;
    }
    setSchedule((prev) => {
      const next = { ...prev };
      const sourceDayMeals = [...next[selectedForSwap.day]];
      const targetDayMeals = selectedForSwap.day === day ? sourceDayMeals : [...next[day]];

      const temp = { ...sourceDayMeals[selectedForSwap.index], slot: meal.slot };
      sourceDayMeals[selectedForSwap.index] = { ...meal, slot: selectedForSwap.meal.slot };
      targetDayMeals[index] = temp;

      next[selectedForSwap.day] = sourceDayMeals;
      next[day] = targetDayMeals;
      return next;
    });
    setSelectedForSwap(null);
  };

  const replaceMealInSchedule = (
    day: string,
    index: number,
    replacement: { title: string; kcal: number; protein: number; image: string }
  ) => {
    setSchedule((prev) => {
      const next = { ...prev };
      const list = [...next[day]];
      list[index] = {
        ...list[index],
        title: replacement.title,
        kcal: replacement.kcal,
        protein: replacement.protein,
        image: replacement.image,
      };
      next[day] = list;
      return next;
    });
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Interactive Weekly Schedule</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Click any meal card to swap or select two slots to exchange meals across days.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedForSwap && (
              <Badge className="bg-primary text-primary-foreground text-xs">
                Select target slot to move "{selectedForSwap.meal.title}"
              </Badge>
            )}
            <TabsList>
              <TabsTrigger value="week" className="text-xs">7-Day Board</TabsTrigger>
              <TabsTrigger value="day" className="text-xs">Focused Day View</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="week" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 overflow-x-auto">
            {days.map((day) => {
              const dayMeals = schedule[day] || [];
              const totalKcal = dayMeals.reduce((acc, m) => acc + m.kcal, 0);
              const totalProtein = dayMeals.reduce((acc, m) => acc + m.protein, 0);
              return (
                <Card key={day} className="border-border bg-card flex flex-col min-w-[210px] md:min-w-0">
                  <CardHeader className="p-3 border-b border-border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold text-foreground">{day}</CardTitle>
                      <Badge variant="outline" className="text-[11px] font-semibold">
                        {totalKcal} kcal
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center justify-between">
                      <span>Protein: <strong className="text-primary">{totalProtein}g</strong></span>
                      <span>{dayMeals.length} meals</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2.5 flex flex-col gap-2.5 flex-1">
                    {dayMeals.map((meal, idx) => {
                      const isSelected =
                        selectedForSwap?.day === day && selectedForSwap?.index === idx;
                      return (
                        <div
                          key={`${day}-${meal.slot}`}
                          onClick={() => handleSlotClick(day, idx, meal)}
                          className={`group cursor-pointer rounded-xl border p-2 transition-all ${
                            isSelected
                              ? "border-primary ring-2 ring-primary/30 bg-accent/40"
                              : "border-border bg-background hover:border-primary/50"
                          }`}
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-2 bg-muted">
                            <img
                              src={meal.image}
                              alt={meal.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                            <span className="absolute top-1.5 left-1.5 rounded bg-black/65 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                              {meal.slot}
                            </span>
                            <span className="absolute bottom-1.5 right-1.5 rounded bg-black/65 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                              {meal.kcal} kcal
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                            {meal.title}
                          </p>
                          <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                            <span>{meal.protein}g P</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDetailModal({ day, index: idx, meal });
                              }}
                              className="text-primary hover:underline font-medium flex items-center gap-0.5"
                            >
                              <Sparkles className="h-3 w-3" /> Swap
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="day" className="mt-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {days.map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={activeDay === d ? "default" : "outline"}
                  onClick={() => setActiveDay(d)}
                >
                  {d}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(schedule[activeDay] || []).map((meal, idx) => (
                <Card key={idx} className="overflow-hidden border-border bg-card">
                  <div className="relative aspect-[4/3]">
                    <img src={meal.image} alt={meal.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <Badge className="bg-primary text-primary-foreground mb-1">{meal.slot}</Badge>
                      <h3 className="text-base font-semibold text-white">{meal.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      <strong className="text-foreground">{meal.kcal} kcal</strong> • {meal.protein}g Protein
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDetailModal({ day: activeDay, index: idx, meal })}
                      className="text-xs"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      AI Replace
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={!!detailModal} onOpenChange={(o) => !o && setDetailModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>AI Meal Alternatives ({detailModal?.day} • {detailModal?.meal.slot})</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            {aiReplacements.map((alt, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-3 bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <img src={alt.image} alt={alt.title} className="h-12 w-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alt.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {alt.kcal} kcal • {alt.protein}g Protein
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    if (detailModal) {
                      replaceMealInSchedule(detailModal.day, detailModal.index, alt);
                      setDetailModal(null);
                    }
                  }}
                >
                  Select
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function WeeklyPlannerSection2() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <Card className="border-border bg-card">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Daily Calorie Avg</span>
            <Flame className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">2,065</span>
            <span className="text-xs text-muted-foreground">/ 2,100 kcal target</span>
          </div>
          <Progress value={98} className="h-1.5" />
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Weekly Protein Score</span>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">144g</span>
            <Badge variant="secondary" className="text-xs">Optimal</Badge>
          </div>
          <p className="text-xs text-muted-foreground">32% Protein • 40% Carbs • 28% Fats</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Batch Prep Time</span>
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">3.5 hrs</span>
            <span className="text-xs text-muted-foreground">/ week</span>
          </div>
          <p className="text-xs text-muted-foreground">4 overlapping grains & proteins batched</p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Est. Grocery Budget</span>
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">$94.50</span>
            <Badge className="bg-accent text-accent-foreground text-xs">-$18 saved</Badge>
          </div>
          <p className="text-xs text-muted-foreground">$4.50 average cost per home-cooked meal</p>
        </CardContent>
      </Card>
    </section>
  );
}

export default function WeeklyPlanner() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 w-full min-w-0">
        <WeeklyPlannerSection0 />
        <WeeklyPlannerSection1 />
        <WeeklyPlannerSection2 />
      </div>
    </div>
  );
}
