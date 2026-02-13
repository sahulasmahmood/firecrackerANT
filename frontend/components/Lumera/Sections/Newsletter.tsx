"use client";

import { LumeraButton } from "@/components/ui/lumera-button";
import { LumeraInput } from "@/components/ui/lumera-input";

export function NewsletterSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
           Get Festive Ready
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">
           Sign up for exclusive Diwali offers, early bird discounts, and safety tips for your celebrations.
        </p>
        
        <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
           <LumeraInput 
              placeholder="Email address" 
              className="rounded-full bg-gray-50 border-transparent h-12 px-6"
           />
           <LumeraButton size="lg" className="rounded-full px-8">
              Sign Up
           </LumeraButton>
        </form>
      </div>
    </section>
  );
}
