import "./styles.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import WeeklyPlanner from "./pages/WeeklyPlanner";
import Landing from "./pages/Landing";
import AiGenerator from "./pages/AiGenerator";
import NutritionTracker from "./pages/NutritionTracker";
import DietaryPreferences from "./pages/DietaryPreferences";
import RecipesLibrary from "./pages/RecipesLibrary";
import GroceryList from "./pages/GroceryList";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>

      <Routes>
        <Route element={<Layout />}>
                <Route path="/planner" element={<WeeklyPlanner />} />
      <Route path="/" element={<Landing />} />
      <Route path="/ai-generator" element={<AiGenerator />} />
      <Route path="/nutrition-tracker" element={<NutritionTracker />} />
      <Route path="/preferences" element={<DietaryPreferences />} />
      <Route path="/recipes" element={<RecipesLibrary />} />
      <Route path="/grocery-list" element={<GroceryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
