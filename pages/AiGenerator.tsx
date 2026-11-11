import { ArrowRight, Check, CheckCircle2, Clock, Flame, Plus, RefreshCw, Search, Send, Sparkles, Utensils } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Slider } from "../components/ui/slider";
import { Textarea } from "../components/ui/textarea";

function AiGeneratorSection0() {
  const quickPrompts = [
    "30-minute high-protein dinners for 2",
    "Use up spinach, eggs & feta in my fridge",
    "Low-carb Mediterranean week under 1800 kcal",
    "Dairy-free post-workout meals",
  ];

  const [prompt, setPrompt] = useState("Use up spinach, eggs & feta in my fridge");
  const [mealCalories, setMealCalories] = useState<number[]>([580]);
  const [minProtein, setMinProtein] = useState<number[]>([42]);
  const [prepLimit, setPrepLimit] = useState("25 mins");
  const [dietStyle, setDietStyle] = useState("Mediterranean");
  const [aiReply, setAiReply] = useState<string | null>(
    "Generated 3 Mediterranean proposals averaging 575 kcal and 45g protein with under 25 minutes of active prep."
  );

  const handleGenerate = () => {
    setAiReply(
      `Crafted fresh ${dietStyle} recipes around "${prompt}" targeting ${mealCalories[0]} kcal and ${minProtein[0]}g+ protein in ${prepLimit}.`
    );
  };
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <Card className="lg:col-span-7 border-border bg-card flex flex-col justify-between">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Conversational AI Meal & Plan Studio</CardTitle>
          </div>
          <CardDescription>
            Describe what's in your fridge, your cravings, or your fitness goals—our culinary AI builds macro-verified meals in seconds.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((preset) => (
              <Button
                key={preset}
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setPrompt(preset)}
                className="text-xs h-auto py-1.5 px-3"
              >
                {preset}
              </Button>
            ))}
          </div>

          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Create 3 high-protein Mediterranean dinners under 25 mins using salmon, spinach, and quinoa..."
            className="min-h-[100px] text-sm"
          />

          {aiReply && (
            <div className="rounded-xl border border-primary/30 bg-accent/50 p-4 text-xs sm:text-sm text-foreground flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">AI Nutritionist Response:</p>
                <p className="text-muted-foreground mt-1">{aiReply}</p>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">
            Synced with your Nut-Free & High-Protein profile
          </span>
          <Button onClick={handleGenerate} className="gap-2">
            <Send className="h-4 w-4" />
            <span>Generate Custom Meals</span>
          </Button>
        </CardFooter>
      </Card>

      <Card className="lg:col-span-5 border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">Precision Parameters</CardTitle>
          <CardDescription>Fine-tune macro targets and kitchen constraints</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Target Calories per Meal</span>
              <span className="text-primary font-bold">{mealCalories[0]} kcal</span>
            </div>
            <Slider value={mealCalories} onValueChange={setMealCalories} min={350} max={950} step={25} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span>Minimum Protein per Serving</span>
              <span className="text-primary font-bold">{minProtein[0]}g protein</span>
            </div>
            <Slider value={minProtein} onValueChange={setMinProtein} min={20} max={65} step={5} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-foreground">Max Prep Time</span>
              <Select value={prepLimit} onValueChange={setPrepLimit}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15 mins">Under 15 mins</SelectItem>
                  <SelectItem value="25 mins">Under 25 mins</SelectItem>
                  <SelectItem value="40 mins">Under 40 mins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-foreground">Dietary Style</span>
              <Select value={dietStyle} onValueChange={setDietStyle}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="High-Protein Clean">High-Protein Clean</SelectItem>
                  <SelectItem value="Plant-Forward">Plant-Forward</SelectItem>
                  <SelectItem value="Low-Carb Keto">Low-Carb Keto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-xl bg-muted/40 p-3 border border-border flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Estimated Macro Split</span>
            <span className="font-semibold text-foreground">35% P • 38% C • 27% F</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function AiGeneratorSection1() {
  const [proposals, setProposals] = useState([
    {
      id: "p1",
      title: "Sun-Dried Tomato & Spinach Feta Chicken Skillet",
      description: "One-pan seared chicken breast simmered with wilted baby spinach, Kalamata olives, and crumbled sheep feta.",
      image: "/images/ui-prototype/2150181.jpg",
      prep: "20m",
      kcal: 560,
      protein: 49,
      carbs: 22,
      fats: 28,
      matchScore: 99,
      added: false,
    },
    {
      id: "p2",
      title: "Mediterranean Baked Eggs & Chickpea Greens",
      description: "Pasture-raised eggs baked over garlicky sautéed spinach, roasted red peppers, chickpeas, and fresh dill.",
      image: "/images/ui-prototype/2150181.jpg",
      prep: "18m",
      kcal: 520,
      protein: 38,
      carbs: 41,
      fats: 21,
      matchScore: 97,
      added: true,
    },
    {
      id: "p3",
      title: "Lemon Oregano Salmon & Warm Quinoa Tabbouleh",
      description: "Flaky wild salmon paired with fluffy tri-color quinoa, parsley, cucumber, and tangy lemon olive oil dressing.",
      image: "/images/ui-prototype/2150181.jpg",
      prep: "22m",
      kcal: 610,
      protein: 46,
      carbs: 48,
      fats: 24,
      matchScore: 96,
      added: false,
    },
  ]);

  const handleToggleAdd = (id: string) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, added: !p.added } : p))
    );
  };

  const handleRegenerateCard = (id: string) => {
    setProposals((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title: "Charred Herb Prawns & Spinach Orzo",
              image: "/images/ui-prototype/2150181.jpg",
              kcal: 540,
              protein: 47,
              added: false,
            }
          : p
      )
    );
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-foreground">AI Generated Meal Proposals</h2>
          <p className="text-sm text-muted-foreground">
            Add any generated dish directly to your Weekly Planner or regenerate individual cards.
          </p>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          98% Match with Your Macro Goals
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {proposals.map((item) => (
          <Card key={item.id} className="overflow-hidden border-border bg-card flex flex-col">
            <div className="relative aspect-[4/3]">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <Badge className="bg-primary text-primary-foreground text-xs">{item.matchScore}% Match</Badge>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-0.5 text-xs text-white">
                  <Clock className="h-3 w-3" />
                  {item.prep}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-base font-semibold text-white leading-snug">{item.title}</h3>
              </div>
            </div>

            <CardContent className="p-4 flex-1 flex flex-col justify-between gap-3">
              <p className="text-xs text-muted-foreground">{item.description}</p>
              <div className="grid grid-cols-4 gap-1 rounded-lg bg-muted/40 p-2 text-center border border-border">
                <div>
                  <span className="block text-xs font-bold text-foreground">{item.kcal}</span>
                  <span className="text-[11px] text-foreground/80">kcal</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-primary">{item.protein}g</span>
                  <span className="text-[11px] text-foreground/80">Prot</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-foreground">{item.carbs}g</span>
                  <span className="text-[11px] text-foreground/80">Carbs</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-foreground">{item.fats}g</span>
                  <span className="text-[11px] text-foreground/80">Fats</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleRegenerateCard(item.id)}
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                Swap
              </Button>
              <Button
                variant={item.added ? "secondary" : "default"}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => handleToggleAdd(item.id)}
              >
                {item.added ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1.5" />
                    Added to Planner
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5 mr-1.5" />
                    Add to Weekly Plan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

function AiGeneratorSection2() {
  const [searchIng, setSearchIng] = useState("");
  const [swaps, setSwaps] = useState([
    {
      original: "Heavy Cream",
      substitute: "Blended Silken Tofu + Olive Oil",
      impact: "-180 kcal, +6g protein, Dairy-Free",
      culinaryNote: "Use 1:1 ratio in pasta sauces and soups for velvety texture without saturated fat.",
    },
    {
      original: "White Arborio Rice",
      substitute: "Riced Cauliflower & Quinoa Blend",
      impact: "-110 kcal, +5g fiber, Low-GI",
      culinaryNote: "Simmer with vegetable stock and nutritional yeast for creamy high-protein risotto.",
    },
    {
      original: "Pine Nuts",
      substitute: "Toasted Pumpkin Seeds (Pepitas)",
      impact: "Nut-Free, +4g protein, rich in magnesium",
      culinaryNote: "Toast 3 mins in a dry pan before blending into basil or sun-dried tomato pesto.",
    },
  ]);

  const handleAddSub = () => {
    const clean = searchIng.trim();
    if (!clean) return;
    setSwaps((prev) => [
      {
        original: clean,
        substitute: `Strained Greek Yogurt & Lemon Zest (for ${clean})`,
        impact: "-95 kcal, +9g protein, Probiotic-Rich",
        culinaryNote: "Temper at low heat at the end of cooking so the proteins stay silky smooth.",
      },
      ...prev,
    ]);
    setSearchIng("");
  };
  return (
    <section className="w-full">
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Smart Ingredient Substitution Finder
              </CardTitle>
              <CardDescription>
                Out of an ingredient or avoiding an allergen? Ask AI for culinary and macro-matched swaps.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={searchIng}
              onChange={(e) => setSearchIng(e.target.value)}
              placeholder="Enter an ingredient to replace (e.g. Heavy Cream, Ricotta, Soy Sauce)..."
              className="flex-1"
            />
            <Button onClick={handleAddSub} className="gap-1.5">
              <Search className="h-4 w-4" />
              Find AI Substitute
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {swaps.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-muted/30 p-4 flex flex-col justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="line-through">{item.original}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                    <span className="font-semibold text-foreground">{item.substitute}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{item.culinaryNote}</p>
                </div>
                <Badge variant="secondary" className="w-fit text-xs mt-1">
                  {item.impact}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default function AiGenerator() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-6 lg:gap-8 w-full min-w-0">
        <AiGeneratorSection0 />
        <AiGeneratorSection1 />
        <AiGeneratorSection2 />
      </div>
    </div>
  );
}
