import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Sparkles,
  BookOpen,
  ShoppingBasket,
  Activity,
  SlidersHorizontal,
  Sun,
  Moon,
  Leaf,
} from "lucide-react";
import AiQuickGenerateModal from "./AiQuickGenerateModal";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

const navItems = [
  { to: "/", label: "Today's Meals", icon: LayoutDashboard },
  { to: "/planner", label: "Weekly Planner", icon: CalendarDays },
  { to: "/ai-generator", label: "AI Studio", icon: Sparkles },
  { to: "/recipes", label: "Recipes", icon: BookOpen },
  { to: "/grocery-list", label: "Grocery List", icon: ShoppingBasket },
  { to: "/nutrition-tracker", label: "Tracker", icon: Activity },
  { to: "/preferences", label: "Preferences", icon: SlidersHorizontal },
];

const mobileTabItems = [
  { to: "/", label: "Today", icon: LayoutDashboard },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/ai-generator", label: "AI Chef", icon: Sparkles },
  { to: "/recipes", label: "Recipes", icon: BookOpen },
  { to: "/grocery-list", label: "Grocery", icon: ShoppingBasket },
];

export default function Layout() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("nutriplan-ai-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("nutriplan-ai-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("nutriplan-ai-theme", "light");
    }
  };

  const currentPage =
    navItems.find((item) => item.to === location.pathname)?.label || "NutriPlan AI";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border">
          <SidebarHeader className="p-4">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="font-heading text-base font-bold tracking-tight text-sidebar-foreground whitespace-nowrap">
                  NutriPlan AI
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  Smart Nutrition Studio
                </span>
              </div>
            </NavLink>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const isActive =
                      item.to === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(item.to);
                    return (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                          <NavLink
                            to={item.to}
                            className="flex items-center gap-3 whitespace-nowrap"
                          >
                            <item.icon className="h-4 w-4 shrink-0" />
                            <span className="whitespace-nowrap">{item.label}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-sidebar-border">
            <NavLink
              to="/preferences"
              className="flex items-center gap-3 rounded-lg p-1.5 hover:bg-sidebar-accent transition-colors"
            >
              <Avatar className="h-8 w-8 border border-border">
                <AvatarFallback className="bg-accent text-accent-foreground text-xs font-semibold">
                  AL
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
                <span className="text-xs font-semibold text-sidebar-foreground truncate">
                  Alex Rivera
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  2,100 kcal • Med High-Protein
                </span>
              </div>
            </NavLink>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex flex-col min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-card/85 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="h-4 w-px bg-border hidden sm:block" />
              <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">
                {currentPage}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <AiQuickGenerateModal />
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle color theme"
                className="h-9 w-9"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </header>

          <main className="w-full min-w-0 flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-8 pb-24 md:pb-8">
            <Outlet />
          </main>

          {/* Mobile Bottom Tab Bar */}
          <nav className="fixed bottom-0 inset-x-0 z-40 flex md:hidden items-center justify-around border-t border-border bg-card/95 backdrop-blur-md px-2 py-1.5">
            {mobileTabItems.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
