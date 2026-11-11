import { Check, ChefHat, Clock, Flame, Plus, Search, ShoppingBasket, SlidersHorizontal, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

function RecipesLibrarySection0() {
  const categories = [
    "All",
    "High-Protein",
    "Under 20 Mins",
    "Mediterranean",
    "Plant-Based",
    "Low-Carb",
    "Meal Prep Friendly",
  ];

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("Best Match");
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <section className="flex flex-col gap-4 bg-card p-4 sm:p-6 rounded-xl border border-border shadow-sm w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recipe Discovery & Dietary Filters</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Explore nutritionist-verified recipes with step-by-step instructions and AI ingredient swaps.
          </p>
        </div>
        <Badge className="bg-accent text-accent-foreground w-fit text-xs">
          <Sparkles className="h-3.5 w-3.5 mr-1 text-primary" />
          Filtered for Nut-Free & High-Protein
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by dish, ingredient, or macro target (e.g. salmon, quinoa, 40g protein)..."
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Best Match">Best Match</SelectItem>
            <SelectItem value="Highest Protein">Highest Protein</SelectItem>
            <SelectItem value="Lowest Calories">Lowest Calories</SelectItem>
            <SelectItem value="Quickest Prep">Quickest Prep</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat}
            type="button"
            size="sm"
            variant={activeCategory === cat ? "default" : "outline"}
            onClick={() => setActiveCategory(cat)}
            className="text-xs h-8"
          >
            {cat}
          </Button>
        ))}
      </div>
    </section>
  );
}

function RecipesLibrarySection1() {
  type RecipeItem = {
    id: string;
    title: string;
    category: string;
    prepTime: string;
    kcal: number;
    protein: number;
    carbs: number;
    fats: number;
    image: string;
    summary: string;
    tags: string[];
    inPlan: boolean;
    ingredients: string[];
    steps: string[];
    aiSwaps: string[];
  };

  const initialRecipes: RecipeItem[] = [
    {
      id: "r1",
      title: "Ahi Tuna & Edamame Crisp Poke Bowl",
      category: "High-Protein",
      prepTime: "15m",
      kcal: 540,
      protein: 46,
      carbs: 48,
      fats: 16,
      image: "/images/ui-prototype/4980892.jpg",
      summary: "Sushi-grade ahi tuna tossed in ginger ponzu over warm brown rice, shelled edamame, and pickled cucumber.",
      tags: ["High-Protein", "Under 20 Mins", "Dairy-Free"],
      inPlan: true,
      ingredients: ["6 oz Ahi Tuna", "1/2 cup Edamame", "3/4 cup Brown Rice", "1 tbsp Ginger Ponzu", "Cucumber & Radish"],
      steps: [
        "Cube sushi-grade ahi tuna and toss gently with citrus ponzu, sesame oil, and grated ginger.",
        "Layer steamed brown rice in a chilled bowl and top with edamame, cucumber ribbons, and tuna.",
        "Finish with toasted sesame seeds and scallions.",
      ],
      aiSwaps: [
        "Swap brown rice for cauliflower-quinoa blend to reduce carbs by 19g.",
        "Use wild cooked shrimp or crispy baked tofu if sushi-grade tuna is unavailable.",
      ],
    },
    {
      id: "r2",
      title: "Sheet-Pan Herb Chicken & Harvest Roots",
      category: "Mediterranean",
      prepTime: "25m",
      kcal: 590,
      protein: 49,
      carbs: 42,
      fats: 21,
      image: "/images/ui-prototype/4980892.jpg",
      summary: "Za'atar-rubbed chicken thighs roasted alongside sweet potato wedges, red onion, and lemon garlic broccolini.",
      tags: ["Mediterranean", "High-Protein", "Meal Prep Friendly"],
      inPlan: false,
      ingredients: ["6 oz Chicken Breast/Thigh", "1 cup Sweet Potato", "1 cup Broccolini", "1 tbsp Olive Oil", "Za'atar & Lemon"],
      steps: [
        "Preheat oven to 425°F (220°C) and toss diced sweet potatoes with olive oil and oregano.",
        "Nestle seasoned chicken and broccolini onto the sheet pan and roast 20 minutes until golden.",
        "Squeeze fresh charred lemon juice over top before serving.",
      ],
      aiSwaps: [
        "Replace sweet potato with cubed butternut squash (-65 kcal per serving).",
        "Add 2 tbsp whipped tahini yogurt sauce for +5g protein.",
      ],
    },
    {
      id: "r3",
      title: "Green Goddess Chickpea & Quinoa Power Salad",
      category: "Plant-Based",
      prepTime: "15m",
      kcal: 490,
      protein: 28,
      carbs: 54,
      fats: 18,
      image: "/images/ui-prototype/4980892.jpg",
      summary: "Crisp baby greens, roasted spiced chickpeas, hemp hearts, and avocado tossed in a vibrant basil-tarragon dressing.",
      tags: ["Plant-Based", "Under 20 Mins", "Mediterranean"],
      inPlan: false,
      ingredients: ["1 cup Crispy Chickpeas", "3/4 cup Cooked Quinoa", "3 tbsp Hemp Hearts", "Fresh Basil & Spinach", "Lemon Tahini"],
      steps: [
        "Blend spinach, basil, lemon juice, and Greek yogurt or silken tofu into a smooth emerald dressing.",
        "Toss warm quinoa and roasted chickpeas with chopped cucumber and herbs.",
        "Top with hemp hearts for complete plant amino acids.",
      ],
      aiSwaps: [
        "Top with 4 oz grilled halloumi or tempeh to boost protein to 44g.",
      ],
    },
    {
      id: "r4",
      title: "Charred Garlic Prawn & Zucchini Ribbon Pasta",
      category: "Under 20 Mins",
      prepTime: "16m",
      kcal: 470,
      protein: 44,
      carbs: 34,
      fats: 15,
      image: "/images/ui-prototype/4980892.jpg",
      summary: "Wild jumbo shrimp seared with chili flakes and garlic, tossed with half chickpea linguine and half spiralized zucchini.",
      tags: ["High-Protein", "Under 20 Mins"],
      inPlan: false,
      ingredients: ["6 oz Wild Shrimp", "2 oz Chickpea Pasta", "2 medium Zucchini", "Garlic & Chili Flakes", "Fresh Parsley"],
      steps: [
        "Boil chickpea pasta for 7 minutes; add spiralized zucchini ribbons during the final 60 seconds.",
        "Sear shrimp in olive oil with sliced garlic and red pepper flakes for 2 minutes per side.",
        "Toss together with pasta water, lemon zest, and fresh parsley.",
      ],
      aiSwaps: [
        "Use 100% zucchini noodles for a strict keto 290 kcal dinner.",
      ],
    },
    {
      id: "r5",
      title: "Lemon Tahini Salmon & Crispy Brussels",
      category: "Mediterranean",
      prepTime: "20m",
      kcal: 620,
      protein: 47,
      carbs: 28,
      fats: 32,
      image: "/images/ui-prototype/3356827.jpg",
      summary: "Air-fried wild salmon glazed with lemon-garlic tahini served with caramelized shaved Brussels sprouts.",
      tags: ["Mediterranean", "High-Protein", "Under 20 Mins"],
      inPlan: true,
      ingredients: ["6 oz Wild Salmon", "2 cups Shaved Brussels", "1.5 tbsp Tahini", "Lemon Juice", "Pomegranate Seeds"],
      steps: [
        "Season salmon fillet with smoked paprika, sea salt, and cracked black pepper.",
        "Air-fry at 400°F for 9 minutes alongside shaved Brussels sprouts.",
        "Drizzle with whisked lemon tahini and scatter pomegranate arils.",
      ],
      aiSwaps: [
        "Swap salmon for Arctic char or rainbow trout with identical omega-3 profile.",
      ],
    },
    {
      id: "r6",
      title: "Mediterranean Lentil & Roasted Pepper Shakshuka",
      category: "Plant-Based",
      prepTime: "18m",
      kcal: 480,
      protein: 31,
      carbs: 46,
      fats: 17,
      image: "/images/ui-prototype/3356827.jpg",
      summary: "Spiced red lentils and pasture-raised eggs simmered in smoky cumin tomato sauce with fresh cilantro and feta.",
      tags: ["Plant-Based", "Mediterranean", "Under 20 Mins"],
      inPlan: false,
      ingredients: ["2 Pasture Eggs", "1/2 cup Cooked Lentils", "1 cup Crushed Tomatoes", "Roasted Bell Peppers", "Smoked Paprika"],
      steps: [
        "Simmer crushed tomatoes, roasted peppers, cumin, and cooked red lentils for 8 minutes.",
        "Make two wells and crack in pasture-raised eggs; cover for 5 minutes until whites set.",
        "Garnish with fresh herbs and serve warm.",
      ],
      aiSwaps: [
        "Replace eggs with crumbled firm tofu for a 100% vegan version.",
      ],
    },
  ];

  const [recipes, setRecipes] = useState<RecipeItem[]>(initialRecipes);
  const [selectedTag, setSelectedTag] = useState("All");
  const [activeRecipe, setActiveRecipe] = useState<RecipeItem | null>(null);

  const filteredRecipes =
    selectedTag === "All"
      ? recipes
      : recipes.filter((r) => r.category === selectedTag || r.tags.includes(selectedTag));

  const toggleInPlan = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, inPlan: !r.inPlan } : r))
    );
  };
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {["All", "High-Protein", "Mediterranean", "Under 20 Mins", "Plant-Based"].map((tag) => (
            <Button
              key={tag}
              size="sm"
              variant={selectedTag === tag ? "secondary" : "ghost"}
              onClick={() => setSelectedTag(tag)}
              className="text-xs h-7"
            >
              {tag}
            </Button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          Showing {filteredRecipes.length} curated recipes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="overflow-hidden border-border bg-card flex flex-col hover:shadow-md transition-shadow"
          >
            <div
              className="relative aspect-[4/3] cursor-pointer"
              onClick={() => setActiveRecipe(recipe)}
            >
              <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <Badge className="bg-black/65 text-white border-white/15 backdrop-blur-sm text-xs">
                  {recipe.category}
                </Badge>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-0.5 text-xs text-white">
                  <Clock className="h-3 w-3" />
                  {recipe.prepTime}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-base font-semibold text-white leading-snug">{recipe.title}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-white/90">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Flame className="h-3.5 w-3.5 text-amber-400" />
                    {recipe.kcal} kcal
                  </span>
                  <span>P: {recipe.protein}g</span>
                  <span>C: {recipe.carbs}g</span>
                  <span>F: {recipe.fats}g</span>
                </div>
              </div>
            </div>

            <CardContent className="p-4 flex-1 flex flex-col justify-between gap-3">
              <p className="text-xs text-muted-foreground line-clamp-2">{recipe.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {recipe.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs font-normal">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setActiveRecipe(recipe)}
              >
                <ChefHat className="h-3.5 w-3.5 mr-1.5" />
                Steps & AI Swaps
              </Button>
              <Button
                variant={recipe.inPlan ? "secondary" : "default"}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => toggleInPlan(recipe.id)}
              >
                {recipe.inPlan ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1.5" />
                    In Plan
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5 mr-1.5" />
                    Add to Plan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!activeRecipe} onOpenChange={(o) => !o && setActiveRecipe(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{activeRecipe?.title}</DialogTitle>
            <DialogDescription>
              {activeRecipe?.kcal} kcal • {activeRecipe?.protein}g Protein • {activeRecipe?.prepTime} prep
            </DialogDescription>
          </DialogHeader>
          {activeRecipe && (
            <Tabs defaultValue="steps" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="steps">Step-by-Step</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="ai-swaps">AI Swaps</TabsTrigger>
              </TabsList>
              <TabsContent value="steps" className="flex flex-col gap-2.5 pt-3">
                {activeRecipe.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg bg-muted/40 p-3 text-xs">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {i + 1}
                    </span>
                    <p className="text-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="ingredients" className="pt-3">
                <div className="grid grid-cols-2 gap-2">
                  {activeRecipe.ingredients.map((ing, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border p-2.5 text-xs font-medium text-foreground"
                    >
                      • {ing}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="ai-swaps" className="flex flex-col gap-2.5 pt-3">
                {activeRecipe.aiSwaps.map((sw, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-primary/30 bg-accent/50 p-3 text-xs flex items-start gap-2.5"
                  >
                    <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{sw}</span>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default function RecipesLibrary() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-4 w-full min-w-0">
        <RecipesLibrarySection0 />
        <RecipesLibrarySection1 />
      </div>
    </div>
  );
}
