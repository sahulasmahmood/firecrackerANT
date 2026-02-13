"use client";

import Image from "next/image";
import Link from "next/link";
import { LumeraButton } from "@/components/ui/lumera-button";

export interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isActive: boolean;
}


interface HeroSectionProps {
  banners: Banner[];
}

export function HeroSection({ banners }: HeroSectionProps) {
  // Use first banner or fallback
  const mainBanner = banners.length > 0 ? banners[0] : null;

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-gray-50">
      {mainBanner ? (
        <>
          <div className="absolute inset-0">
             <Image 
               src={mainBanner.imageUrl} 
               alt={mainBanner.title} 
               fill
               className="object-cover"
               priority
             />
             <div className="absolute inset-0 bg-black/20" /> 
          </div>
          
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white z-10">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-reveal-up opacity-0" style={{ animationDelay: "0.2s" }}>
              {mainBanner.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-10 font-light opacity-0 animate-reveal-up" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
              {mainBanner.description}
            </p>
            <div className="opacity-0 animate-reveal-up" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
                <Link href={mainBanner.link || "/products"}>
                   <LumeraButton size="lg" className="bg-white text-black hover:bg-white/90 border-none">
                      Explore Collection
                   </LumeraButton>
                </Link>
            </div>
          </div>
        </>
      ) : (
        /* Fallback Design if no banner */
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center z-10">
           <span className="text-sm font-medium tracking-[0.2em] text-gray-500 uppercase mb-4 animate-fade-in">Diwali Collection 2026</span>
           <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter text-charcoal mb-6 animate-reveal-up">
              Light Up The Sky
           </h1>
           <p className="text-lg text-gray-600 max-w-xl mb-10 animate-reveal-up" style={{ animationDelay: "0.2s" }}>
              Experience the magic of premium fireworks. Safe, spectacular, and designed for your most cherished celebrations.
           </p>
           <div className="flex gap-4 animate-reveal-up" style={{ animationDelay: "0.4s" }}>
              <Link href="/products">
                 <LumeraButton size="lg">Shop Crackers</LumeraButton>
              </Link>
           </div>
        </div>
      )}
    </section>
  );
}
