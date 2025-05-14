"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-md p-[2px] border border-black/10 dark:border-white/10">
      {[
        { value: "system", icon: Monitor },
        { value: "light", icon: Sun },
        { value: "dark", icon: Moon }
      ].map(({ value, icon: Icon }) => (
        <Button 
          key={value}
          variant="ghost" 
          size="sm" 
          className={cn(
            "h-6 w-6 rounded-md p-0 transition-all duration-200",
            "hover:bg-black/10 dark:hover:bg-white/10",
            value === "light" && theme === value && "bg-white text-black shadow-sm",
            value !== "light" && theme === value && "bg-[#1e1e1e] text-white shadow-sm"
          )}
          onClick={() => setTheme(value as "system" | "light" | "dark")}
        >
          <Icon className="h-3.5 w-3.5" />
          <span className="sr-only">{value.charAt(0).toUpperCase() + value.slice(1)}</span>
        </Button>
      ))}
    </div>
  );
} 