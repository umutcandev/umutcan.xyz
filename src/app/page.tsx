import { ArrowUpRight } from "lucide-react";
import ExpandableSection from "@/components/ExpandableSection";
import { TooltipLink } from "@/components/TooltipLink";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="max-w-[650px] w-full px-4">
        <div className="mb-8 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <h1 className="text-3xl font-normal">Welcome to my portfolio</h1>
            <div className="flex items-center gap-1.5 bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-400 px-2.5 py-1 rounded-full text-xs w-fit">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Open to work</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm leading-relaxed mb-4">
          I&apos;m Umutcan, a university student passionate about UI design and front-end development. 
          In my spare time, I enjoy working with Figma to create engaging user interfaces.
        </p>
        
        <p className="text-sm leading-relaxed mb-4">
          My portfolio includes interactive news websites that I&apos;ve developed, owned, and sold, 
          significantly increasing daily visitor numbers. I also provide software and graphic design services on webmaster forums, with more than 100 positive trade ratings.
          I also contribute to the <TooltipLink text="FlarumTR" tooltipContent="https://flarumtr.com/u/Can" href="https://flarumtr.com/u/Can" /> ecosystem.
        </p>
        
        <p className="text-sm leading-relaxed">
          I&apos;m enthusiastic about expanding my knowledge in DevOps processes, particularly 
          Linux system administration and server management.
        </p>
        
        <div className="w-full text-left">
          <ExpandableSection />
        </div>

        <div className="mt-6">
          <svg 
            width="60" 
            height="10" 
            viewBox="0 0 60 10" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4"
          >
            <path 
              d="M1 5C1 5 5 1 10 5C15 9 20 1 25 5C30 9 35 1 40 5C45 9 50 1 55 5C60 9 65 1 70 5" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </svg>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
            <a href="https://x.com/umutcandev" className="flex items-center hover:text-foreground transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />
              <span>follow me on x</span>
            </a>
            <a href="https://github.com/umutcandev" className="flex items-center hover:text-foreground transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />
              <span>let&apos;s collaborate on github</span>
            </a>
            <a href="mailto:hi@umutcan.xyz" className="flex items-center hover:text-foreground transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />
              <span>love to talk?</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
