"use client";

import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TooltipLinkProps {
  text: string;
  tooltipContent: string;
  href: string;
}

export function TooltipLink({ text, tooltipContent, href }: TooltipLinkProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a 
          href={href}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-foreground transition-colors"
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