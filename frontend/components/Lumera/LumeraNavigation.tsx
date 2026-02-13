"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  IconSearch,
  IconShoppingCart,
  IconUser,
  IconMenu2,
  IconX,
  IconChevronDown,
  IconChevronRight,
  IconHeart,
  IconLogout,
  IconDashboard
} from "@tabler/icons-react";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { type Category } from "@/services/online-services/frontendCategoryService";
import { searchProducts, type Product } from "@/services/online-services/frontendProductService";
import { useCurrency } from "@/hooks/useCurrency";
import { useRouter } from "next/navigation";

import { type WebSettings, type CompanySettings } from "@/services/online-services/webSettingsService";
import { generateCategoryUrl, generateProductUrl } from "@/lib/slugify";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface PromotionalOffer {
  code: string;
  description?: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minOrderValue?: number | null;
  maxDiscountAmount?: number | null;
  usageType?: string;
}

interface LumeraNavigationProps {
  categories: Category[];
  webSettings: WebSettings | null;
  companySettings: CompanySettings | null;
  promotionalOffers?: PromotionalOffer[];
}

export function LumeraNavigation({ categories, webSettings, companySettings, promotionalOffers = [] }: LumeraNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | null>(
    categories.length > 0 ? categories[0] : null
  );
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const searchRef = React.useRef<HTMLDivElement>(null);
  
  // Offer State
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const { user, isAuthenticated, logout } = useAuthContext();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const currencySymbol = useCurrency();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search Logic
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (searchQuery.trim().length >= 2) {
      setSearchLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const response = await searchProducts(searchQuery.trim());
          setSearchResults(response.data.slice(0, 8));
          setShowSearchResults(true);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setSearchLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
      setSearchLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

    // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If search is just a toggle button in this design, we might handle this differently,
      // but if we show a search bar, we need this.
      // For now, let's assume the search input is within searchRef
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
        setShowSearchResults(false);
        setSearchOpen(false); // Close the search overlay if it exists
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchResultClick = (product: Product) => {
    setShowSearchResults(false);
    setSearchQuery('');
    setSearchOpen(false);
    router.push(generateProductUrl(product));
  };
  
    // Format offer text
  const formatOfferText = (offer: PromotionalOffer) => {
    let text = "";
    if (offer.description) {
      if (offer.discountType === "percentage") {
        text = `${offer.description} - ${offer.discountValue}% OFF`;
      } else {
        text = `${offer.description} - ${currencySymbol}${offer.discountValue} OFF`;
      }
      return text;
    }
    if (offer.discountType === "percentage") {
      text = `Get ${offer.discountValue}% OFF`;
      if (offer.maxDiscountAmount) {
        text += ` (up to ${currencySymbol}${offer.maxDiscountAmount})`;
      }
    } else {
      text = `Flat ${currencySymbol}${offer.discountValue} OFF`;
    }
    if (offer.minOrderValue) {
      text += ` on orders ₹${offer.minOrderValue}+`;
    }
    if (offer.usageType === "first-time-user-only") {
      text += " • First Time User";
    }
    return text;
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md shadow-sm" 
            : "bg-transparent"
        }`}
      >
        {/* Promotional Banner */}
        <div className={`bg-[#e63946] transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0' : 'h-8 sm:h-10'}`}>
             <div className="container mx-auto px-4 h-full flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                {promotionalOffers.length > 0 ? (
                  <p className="animate-fade-in text-center">
                    {formatOfferText(promotionalOffers[currentOfferIndex])}
                  </p>
                ) : (
                  <p>Light up your celebrations with premium firecrackers!</p>
                )}
             </div>
        </div>

        <div className={`container mx-auto px-6 ${isScrolled ? 'py-3' : 'py-5'}`}>
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Trigger & Search (Mobile) */}
            <div className="flex items-center gap-4 lg:hidden">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className={`p-1 ${isScrolled ? "text-charcoal" : "text-white"}`}
              >
                <IconMenu2 size={24} />
              </button>
            </div>

            {/* Center/Left: Logo */}
            <Link href="/" className="relative z-50">
               {webSettings?.logoUrl ? (
                 <Image 
                   src={webSettings.logoUrl} 
                   alt="Logo" 
                   width={140} 
                   height={40} 
                   className={`h-8 w-auto object-contain transition-all ${
                     isScrolled ? "brightness-0" : "brightness-0 invert" 
                   }`}
                 />
               ) : (
                 <span className={`font-display text-2xl font-bold tracking-tight ${
                   isScrolled ? "text-charcoal" : "text-white"
                 }`}>
                   {companySettings?.companyName || "LUMERA"}
                 </span>
               )}
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? "text-charcoal hover:text-charcoal/70" : "text-white hover:text-white/80"
                }`}
              >
                Home
              </Link>
              <div 
                className="group relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <button 
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    isScrolled ? "text-charcoal hover:text-charcoal/70" : "text-white hover:text-white/80"
                  }`}
                >
                  Shop
                  <IconChevronDown size={14} />
                </button>
                
                {/* Mega Menu Overlay */}
                {showMegaMenu && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[800px]">
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 grid grid-cols-12 gap-8 text-black">
                      {/* Categories Sidebar */}
                      <div className="col-span-3 border-r border-gray-100 pr-4 space-y-1">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onMouseEnter={() => setActiveCategory(cat)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                              activeCategory?.id === cat.id 
                                ? "bg-gray-50 text-black font-medium" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-black"
                            }`}
                          >
                            {cat.name}
                            <IconChevronRight size={14} className="opacity-50" />
                          </button>
                        ))}
                      </div>

                      {/* Subcategories Display */}
                      <div className="col-span-9">
                        {activeCategory && (
                          <div className="h-full flex flex-col">
                            <h3 className="font-display text-xl mb-4 text-black">{activeCategory.name}</h3>
                            {activeCategory.subcategories && activeCategory.subcategories.length > 0 ? (
                              <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                                {activeCategory.subcategories.map(sub => (
                                  <Link 
                                    key={sub.id}
                                    href={`${generateCategoryUrl(activeCategory)}?sub=${sub.id}`}
                                    className="text-sm text-gray-500 hover:text-black transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <div className="text-gray-400 text-sm">No subcategories found.</div>
                            )}
                            
                            <div className="mt-auto pt-6 border-t border-gray-100">
                               <Link 
                                 href={generateCategoryUrl(activeCategory)}
                                 className="text-sm font-medium text-black hover:underline"
                               >
                                 View All {activeCategory.name} →
                               </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link 
                href="/about" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? "text-charcoal hover:text-charcoal/70" : "text-white hover:text-white/80"
                }`}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? "text-charcoal hover:text-charcoal/70" : "text-white hover:text-white/80"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-5">
              <div className="relative" ref={searchRef}>
                 <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'w-64 bg-white rounded-full px-3 py-1 ring-1 ring-gray-200' : 'w-auto'}`}>
                    <button 
                        onClick={() => {
                            setSearchOpen(!searchOpen);
                            if (!searchOpen) setTimeout(() => searchRef.current?.querySelector('input')?.focus(), 100);
                        }} 
                        className={`transition-colors ${
                        isScrolled || searchOpen ? "text-charcoal hover:text-black" : "text-white hover:text-white/80"
                        }`}
                    >
                        <IconSearch size={22} stroke={1.5} />
                    </button>
                    {searchOpen && (
                        <form onSubmit={handleSearchSubmit} className="flex-1 ml-2">
                             <input 
                               type="text"
                               placeholder="Search products..." 
                               className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-800 placeholder:text-gray-400"
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                             />
                        </form>
                    )}
                 </div>
                 
                 {/* Search Dropdown */}
                 {showSearchResults && (
                    <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60]">
                        {searchLoading ? (
                             <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
                        ) : searchResults.length > 0 ? (
                             <div className="max-h-80 overflow-y-auto">
                                {searchResults.map(product => {
                                    const variant = product.variants[0];
                                    const price = variant?.variantSellingPrice || product.defaultSellingPrice;
                                    const image = variant?.variantImages?.[0];
                                    return (
                                        <button 
                                          key={product.id}
                                          onClick={() => handleSearchResultClick(product)}
                                          className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 text-left transition-colors border-b border-gray-50 last:border-0"
                                        >
                                           <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden flex-shrink-0 relative">
                                              {image && <Image src={image} alt={product.shortDescription} fill className="object-cover" />}
                                           </div>
                                           <div>
                                              <p className="text-sm font-medium text-gray-900 line-clamp-1">{variant?.displayName || product.shortDescription}</p>
                                              <p className="text-xs text-gray-500">{currencySymbol}{price}</p>
                                           </div>
                                        </button>
                                    );
                                })}
                             </div>
                        ) : (
                             <div className="p-4 text-center text-gray-500 text-sm">No results found</div>
                        )}
                    </div>
                 )}
              </div>

              <Link 
                href="/wishlist" 
                className={`hidden md:block relative transition-colors ${
                  isScrolled ? "text-charcoal hover:text-black" : "text-white hover:text-white/80"
                }`}
              >
                <IconHeart size={22} stroke={1.5} />
                {wishlistCount > 0 && (
                   <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                )}
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`transition-colors ${
                    isScrolled ? "text-charcoal hover:text-black" : "text-white hover:text-white/80"
                  }`}>
                    {isAuthenticated && user?.image ? (
                        <div className="h-6 w-6 rounded-full overflow-hidden border border-white/20">
                             <Image 
                                src={user.image} 
                                alt="User" 
                                width={24} 
                                height={24} 
                                className="h-full w-full object-cover"
                             />
                        </div>
                    ) : (
                        <IconUser size={22} stroke={1.5} />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-gray-100 shadow-lg mt-2">
                    {isAuthenticated ? (
                       <>
                         <DropdownMenuItem asChild>
                           <Link href={user?.role === 'admin' ? "/dashboard" : "/profile"} className="cursor-pointer">
                              <IconDashboard size={16} className="mr-2"/>
                              {user?.role === 'admin' ? 'Dashboard' : 'My Account'}
                           </Link>
                         </DropdownMenuItem>
                         {user?.role !== 'admin' && (
                           <>
                              <DropdownMenuItem asChild>
                                <Link href="/my-orders" className="cursor-pointer">
                                  <IconShoppingCart size={16} className="mr-2"/>
                                  My Orders
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href="/my-enquiries" className="cursor-pointer">
                                  <IconDashboard size={16} className="mr-2"/>
                                  My Enquiries
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href="/wishlist" className="cursor-pointer">
                                  <IconHeart size={16} className="mr-2"/>
                                  My Wishlist
                                </Link>
                              </DropdownMenuItem>
                           </>
                         )}
                         <DropdownMenuItem onClick={() => logout && logout()} className="cursor-pointer text-red-600 focus:text-red-700">
                             <IconLogout size={16} className="mr-2"/>
                             Logout
                         </DropdownMenuItem>
                       </>
                    ) : (
                       <DropdownMenuItem asChild>
                          <Link href="/signin" className="cursor-pointer">Sign In / Register</Link>
                       </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link 
                href="/cart" 
                className={`relative transition-colors ${
                  isScrolled ? "text-charcoal hover:text-black" : "text-white hover:text-white/80"
                }`}
              >
                <IconShoppingCart size={22} stroke={1.5} />
                {totalItems > 0 && (
                   <span className="absolute -top-2 -right-2 h-4 w-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                     {totalItems}
                   </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[150] bg-white text-black p-6 flex flex-col animate-slide-in-left">
            <div className="flex items-center justify-between mb-8">
               <span className="font-display text-2xl font-bold">Menu</span>
               <button onClick={() => setMobileMenuOpen(false)}>
                 <IconX size={28} />
               </button>
            </div>
            <nav className="flex flex-col gap-6 text-xl">
               <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
               <div className="space-y-4">
                  <span className="font-medium text-gray-400 text-sm uppercase tracking-wider">Categories</span>
                  {categories.map(cat => (
                     <Link 
                        key={cat.id} 
                        href={generateCategoryUrl(cat)}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-lg ml-4 border-l border-gray-200 pl-4"
                     >
                        {cat.name}
                     </Link>
                  ))}
               </div>
               <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
               <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
