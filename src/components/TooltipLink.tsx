"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TooltipLinkProps {
  text: string;
  tooltipContent: string;
  href: string;
  className?: string;
}

export function TooltipLink({ text, tooltipContent, href, className }: TooltipLinkProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a 
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn("underline underline-offset-4 hover:text-foreground transition-colors", className)}
        >
          {text}
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
} 