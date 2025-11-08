import React from "react";
import { cn } from "@/lib/utils";

interface ScreenProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "full-width";
}

export function Screen({ 
  children, 
  className = "",
  variant = "default"
}: ScreenProps) {
  const baseClasses = "min-h-screen bg-neutral-100 flex flex-col";
  
  const variantClasses = {
    default: "p-2 md:p-4 lg:p-6 xl:p-8 gap-2 md:gap-4 lg:gap-6 xl:gap-8",
    "full-width": "w-full overflow-x-hidden",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}
