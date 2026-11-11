import { Check, Plus, ShoppingBasket, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

function GroceryListSection0() {
  const [syncedNotice, setSyncedNotice] = useState<string | null>(null);
  return (
    <section className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 shadow-sm w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Smart Grocery Sync</h2>
            <Badge variant="secondary" className="text-xs">May 12 – May 18 (21 Meals)</Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Ingredients are automatically consolidated by supermarket aisle from your Weekly Meal Plan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">Est. Basket Total</span>
            <span className="text-lg font-bold text-primary">$94.50</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSyncedNotice("Pantry staples deducted • Saved $14.20")}
            className="text-xs gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            AI Budget Optimize
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Shopping Progress</span>
          <span className="font-semibold text-foreground">9 of 28 items in cart (32%)</span>
        </div>
        <Progress value={32} className="h-2" />
      </div>

      {syncedNotice && (
        <div className="rounded-lg bg-accent/60 px-3 py-2 text-xs text-accent-foreground flex items-center gap-2">
          <Check className="h-4 w-4 text-primary" />
          <span>{syncedNotice}</span>
        </div>
      )}
    </section>
  );
}

function GroceryListSection1() {
  type GroceryItem = {
    id: string;
    name: string;
    qty: string;
    aisle: string;
    recipe: string;
    checked: boolean;
    aiTip?: string;
  };

  const aisles = [
    "Fresh Produce",
    "Proteins & Seafood",
    "Dairy & Refrigerated",
    "Grains, Legumes & Pantry",
  ];

  const [newItemName, setNewItemName] = useState("");
  const [newItemAisle, setNewItemAisle] = useState("Fresh Produce");
  const [items, setItems] = useState<GroceryItem[]>([
    { id: "1", name: "Organic Baby Spinach & Tuscan Kale", qty: "16 oz", aisle: "Fresh Produce", recipe: "3 Meals", checked: true },
    { id: "2", name: "Hass Avocados (Medium)", qty: "4 ct", aisle: "Fresh Produce", recipe: "Breakfast Toast & Poke", checked: false },
    { id: "3", name: "Fresh Broccolini & Sweet Potatoes", qty: "2.5 lbs", aisle: "Fresh Produce", recipe: "Sheet-Pan Chicken", checked: false, aiTip: "In-season • Save $2.10" },
    { id: "4", name: "Wild Alaskan Salmon Fillets", qty: "24 oz", aisle: "Proteins & Seafood", recipe: "2 Dinners", checked: false, aiTip: "Frozen wild fillets save $6" },
    { id: "5", name: "Organic Air-Chilled Chicken Breast", qty: "2 lbs", aisle: "Proteins & Seafood", recipe: "3 Lunches", checked: false },
    { id: "6", name: "Sushi-Grade Ahi Tuna Steaks", qty: "12 oz", aisle: "Proteins & Seafood", recipe: "Poke Bowl", checked: true },
    { id: "7", name: "0% Strained Greek Yogurt", qty: "32 oz", aisle: "Dairy & Refrigerated", recipe: "Parfaits & Sauces", checked: false },
    { id: "8", name: "Pasture-Raised Large Eggs", qty: "1 dozen", aisle: "Dairy & Refrigerated", recipe: "Breakfasts", checked: true },
    { id: "9", name: "Sheep's Milk Feta Block in Brine", qty: "8 oz", aisle: "Dairy & Refrigerated", recipe: "Med Skillet", checked: false },
    { id: "10", name: "Tri-Color Organic Quinoa", qty: "24 oz", aisle: "Grains, Legumes & Pantry", recipe: "Batch Prep Base", checked: false },
    { id: "11", name: "Roasted Unsalted Chickpeas & Lentils", qty: "3 cans", aisle: "Grains, Legumes & Pantry", recipe: "Power Salads", checked: true },
    { id: "12", name: "Artisanal Creamy Sesame Tahini", qty: "1 jar", aisle: "Grains, Legumes & Pantry", recipe: "Dressings", checked: false },
  ]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleAddItem = () => {
    const clean = newItemName.trim();
    if (!clean) return;
    setItems((prev) => [
      {
        id: String(Date.now()),
        name: clean,
        qty: "1 unit",
        aisle: newItemAisle,
        recipe: "Custom Addition",
        checked: false,
      },
      ...prev,
    ]);
    setNewItemName("");
  };

  const handleClearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.checked));
  };
  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="flex flex-col sm:flex-row gap-2 bg-card p-4 rounded-xl border border-border">
        <Input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add custom grocery item (e.g. Organic Matcha Powder, Almond Butter)..."
          className="flex-1"
        />
        <Select value={newItemAisle} onValueChange={setNewItemAisle}>
          <SelectTrigger className="w-full sm:w-[210px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {aisles.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAddItem} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
        <Button variant="outline" onClick={handleClearCompleted} className="gap-1.5 text-xs">
          <Trash2 className="h-4 w-4" />
          Clear Checked
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aisles.map((aisle) => {
          const aisleItems = items.filter((i) => i.aisle === aisle);
          if (aisleItems.length === 0) return null;
          return (
            <Card key={aisle} className="border-border bg-card">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">{aisle}</CardTitle>
                <Badge variant="outline" className="text-xs">
                  {aisleItems.filter((i) => i.checked).length}/{aisleItems.length}
                </Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {aisleItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 h-4 w-4 rounded flex items-center justify-center border ${
                          item.checked
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-input bg-background"
                        }`}
                      >
                        {item.checked && <Check className="h-3 w-3" />}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium ${
                            item.checked ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {item.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">For: {item.recipe}</span>
                          {item.aiTip && (
                            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                              <Sparkles className="h-3 w-3" />
                              {item.aiTip}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {item.qty}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default function GroceryList() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="flex flex-col gap-4 w-full min-w-0">
        <GroceryListSection0 />
        <GroceryListSection1 />
      </div>
    </div>
  );
}
