"use client";

import Image from "next/image";
import { LumeraButton } from "@/components/ui/lumera-button";

export function EditorialSection() {
  return (
    <section className="py-0 border-y border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        <div className="relative h-[400px] lg:h-auto w-full bg-black">
           <Image 
             src="https://images.unsplash.com/photo-1533230125158-b18aa676a925?q=80&w=2070&auto=format&fit=crop" 
             alt="Sparklers Celebration" 
             fill 
             className="object-cover opacity-90"
           />
        </div>
        <div className="flex flex-col justify-center px-8 py-16 lg:px-24 bg-white">
           <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">Our Promise</span>
           <h2 className="font-display text-4xl lg:text-5xl font-bold text-charcoal mb-6 leading-tight">
             Celebrations <br/> 
             <span className="italic font-light">Reimagined</span>
           </h2>
           <p className="text-gray-600 text-lg leading-relaxed mb-8">
             We bring you the finest selection of standard and fancy crackers. Safety, quality, and visual brilliance are at the heart of everything we offer. Make every festival unforgettable.
           </p>
           <div className="flex gap-6 items-center">
              <div className="flex flex-col">
                 <span className="font-display text-3xl font-bold">100%</span>
                 <span className="text-xs text-gray-400 uppercase tracking-wider">Safety</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                 <span className="font-display text-3xl font-bold">Premium</span>
                 <span className="text-xs text-gray-400 uppercase tracking-wider">Quality</span>
              </div>
           </div>
           
           <div className="mt-10">
              <LumeraButton variant="outline" className="rounded-full">About Us</LumeraButton>
           </div>
        </div>
      </div>
    </section>
  );
}
