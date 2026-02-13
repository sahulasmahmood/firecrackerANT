"use client";

import Link from "next/link";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import {
  type WebSettings,
  type CompanySettings,
} from "@/services/online-services/webSettingsService";
import { LumeraInput } from "@/components/ui/lumera-input";
import { LumeraButton } from "@/components/ui/lumera-button";

interface LumeraFooterProps {
  webSettings: WebSettings | null;
  companySettings: CompanySettings | null;
}

export function LumeraFooter({ webSettings, companySettings }: LumeraFooterProps) {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Newsletter Column */}
          <div className="col-span-1 md:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
               <span className="font-display text-3xl font-bold tracking-tight text-charcoal">
                  {webSettings?.siteName || "LUMERA"}
               </span>
            </Link>
            <p className="text-gray-500 max-w-sm leading-relaxed">
              {companySettings?.description || "Premium fireworks for your celebrations. Safety, quality, and visual brilliance in every spark."}
            </p>
            
            <div className="pt-4">
              <h4 className="font-medium mb-3 text-sm tracking-wide uppercase text-gray-900">Subscribe for festive updates</h4>
              <div className="flex gap-2 max-w-sm">
                <LumeraInput 
                  placeholder="Your email address" 
                  className="rounded-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200"
                />
                <LumeraButton className="rounded-full px-6">
                   Join
                </LumeraButton>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
             <h4 className="font-medium mb-6 text-sm tracking-wide uppercase text-gray-900">Shop</h4>
             <ul className="space-y-4">
                <li><Link href="/products" className="text-gray-500 hover:text-black transition-colors">All Products</Link></li>
                <li><Link href="/new-arrivals" className="text-gray-500 hover:text-black transition-colors">New Arrivals</Link></li>
                <li><Link href="/bestsellers" className="text-gray-500 hover:text-black transition-colors">Bestsellers</Link></li>
                <li><Link href="/deals" className="text-gray-500 hover:text-black transition-colors">Deals</Link></li>
             </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
             <h4 className="font-medium mb-6 text-sm tracking-wide uppercase text-gray-900">Company</h4>
             <ul className="space-y-4">
                <li><Link href="/about" className="text-gray-500 hover:text-black transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-500 hover:text-black transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-500 hover:text-black transition-colors">Contact</Link></li>
                <li><Link href="/stores" className="text-gray-500 hover:text-black transition-colors">Store Locator</Link></li>
             </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
             <h4 className="font-medium mb-6 text-sm tracking-wide uppercase text-gray-900">Help</h4>
             <ul className="space-y-4">
                <li><Link href="/faq" className="text-gray-500 hover:text-black transition-colors">FAQs</Link></li>
                <li><Link href="/shipping" className="text-gray-500 hover:text-black transition-colors">Shipping</Link></li>
                <li><Link href="/returns" className="text-gray-500 hover:text-black transition-colors">Returns</Link></li>
                <li><Link href="/privacy" className="text-gray-500 hover:text-black transition-colors">Privacy Policy</Link></li>
             </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-sm text-gray-400">
             © {new Date().getFullYear()} {companySettings?.companyName || "Lumera Inc"}. All rights reserved.
           </p>
           
           <div className="flex items-center gap-6">
              {companySettings?.socialMedia?.instagram && (
                <a href={companySettings.socialMedia.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                  <IconBrandInstagram size={20} />
                </a>
              )}
              {companySettings?.socialMedia?.facebook && (
                <a href={companySettings.socialMedia.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                  <IconBrandFacebook size={20} />
                </a>
              )}
              {companySettings?.socialMedia?.twitter && (
                <a href={companySettings.socialMedia.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                  <IconBrandTwitter size={20} />
                </a>
              )}
           </div>
        </div>
      </div>
    </footer>
  );
}
