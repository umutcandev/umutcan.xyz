"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TooltipLink } from "@/components/TooltipLink";

export default function ExpandableSection() {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="mt-3">
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="flex text-left text-sm text-foreground transition-colors"
      >
        <ChevronDown className={`w-4 h-4 mr-2 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        <span>If you want to know what I do in my daily life</span>
      </button>
      
      {expanded && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-left">
          In my daily life, I&apos;ve been a <TooltipLink text="scout" tooltipContent="https://izciforum.com/uyeler/umutcan.1/" href="https://izciforum.com/uyeler/umutcan.1/" /> for over 7 years, which has taught me valuable leadership and 
          teamwork skills. I&apos;ve participated in numerous activities including the Balkan camp, where I collaborated 
          with scouts from different countries and cultures. Currently, I serve as an assistant scout leader with 
          LTK certification, mentoring younger scouts and organizing community service projects.
          <br /><br />
          <TooltipLink text="Amateur radio" tooltipContent="https://www.qrz.com/db/TA4RAP" href="https://www.qrz.com/db/TA4RAP" /> is another passion of mine - I frequently participate in both analog and DMR networks, 
          connecting with enthusiasts worldwide. This hobby has deepened my understanding of communication 
          technologies and emergency preparedness systems. I enjoy the technical aspects of configuring equipment 
          and the community aspect of exchanging knowledge with fellow operators.
          <br /><br />
          These experiences outside of tech have enhanced my problem-solving abilities and given me a broader 
          perspective that I apply to my work in UI design and development.
        </p>
      )}
    </div>
  );
} 