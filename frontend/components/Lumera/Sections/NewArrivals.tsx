"use client";

import Image from "next/image";
import Link from "next/link";
import { LumeraButton } from "@/components/ui/lumera-button";
import { type Product } from "@/services/online-services/frontendProductService";
import { generateProductUrl } from "@/lib/slugify";
import { useCurrency } from "@/hooks/useCurrency";
import { IconShoppingCart, IconHeart } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivalsSection({ products }: NewArrivalsProps) {
  const currencySymbol = useCurrency();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const featuredProduct = products[0];
  const sideProducts = products.slice(1, 4); // Show 3 side products if possible

  if (!featuredProduct) return null;

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Find first active variant or default to 0
    const activeVariant = product.variants.find(v => v.variantStatus === "active") || product.variants[0];
    if (!activeVariant) return;

    const variantIndex = product.variants.indexOf(activeVariant);
    addToCart(product, variantIndex, undefined);
  };

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
    } else {
        addToWishlist(product);
    }
  };

  const featVariant = featuredProduct.variants[0];
  const featImage = featVariant?.variantImages?.[0];
  const featPrice = featVariant?.variantSellingPrice || featuredProduct.defaultSellingPrice;

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-8 items-stretch">
           {/* Left Content */}
           <div className="lg:col-span-4 space-y-8 flex flex-col justify-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">New Arrivals</span>
                <h2 className="font-display text-5xl font-bold text-charcoal leading-tight mt-4">
                    Latest <br />
                    <span className="text-gray-400 font-light italic">Sparks</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mt-6">
                    Check out our newest additions. From dazzling sky shots to safe ground chakkars.
                </p>
                <Link href="/new-arrivals">
                    <LumeraButton size="lg" className="mt-8">Shop New Arrivals</LumeraButton>
                </Link>
              </div>
           </div>

           {/* Right Grid */}
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured Large Card */}
              <Link href={generateProductUrl(featuredProduct)} className="group relative aspect-[3/4] md:aspect-auto md:row-span-2 rounded-2xl overflow-hidden bg-white shadow-sm">
                 {featImage && (
                    <Image 
                      src={featImage} 
                      alt={featuredProduct.shortDescription} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                 
                 {/* Large Card Actions */}
                 <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                     <button 
                        onClick={(e) => handleAddToCart(e, featuredProduct)}
                        className="bg-white text-black p-3 rounded-full hover:scale-110 transition-all shadow-lg"
                     >
                        <IconShoppingCart size={20} />
                     </button>
                     <button 
                        onClick={(e) => handleWishlistToggle(e, featuredProduct)}
                        className={`p-3 rounded-full hover:scale-110 transition-all shadow-lg ${
                            isInWishlist(featuredProduct.id) ? "bg-red-500 text-white" : "bg-white text-black"
                        }`}
                     >
                        <IconHeart size={20} fill={isInWishlist(featuredProduct.id) ? "currentColor" : "none"} />
                     </button>
                 </div>

                 <div className="absolute bottom-0 left-0 p-8 text-white w-full">
                    <h3 className="text-2xl font-display font-medium mb-2 line-clamp-2">
                        {featVariant?.displayName || featuredProduct.shortDescription || featVariant?.variantName}
                    </h3>
                    <p className="font-medium text-xl">{currencySymbol}{featPrice.toFixed(0)}</p>
                 </div>
              </Link>

              {/* Smaller Side Cards */}
              <div className="flex flex-col gap-6">
                 {sideProducts.map(product => {
                    const v = product.variants[0];
                    const img = v?.variantImages?.[0];
                    const p = v?.variantSellingPrice || product.defaultSellingPrice;

                    return (
                       <Link key={product.id} href={generateProductUrl(product)} className="flex-1 group relative rounded-2xl overflow-hidden bg-white aspect-square md:aspect-auto shadow-sm">
                          {img && (
                            <Image 
                              src={img} 
                              alt={product.shortDescription} 
                              fill 
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          )}
                           
                           {/* Side Card Actions */}
                           <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button 
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className="bg-white/90 text-black p-2 rounded-full hover:bg-white hover:scale-110 transition-all shadow-sm"
                                >
                                    <IconShoppingCart size={16} />
                                </button>
                                <button 
                                    onClick={(e) => handleWishlistToggle(e, product)}
                                    className={`p-2 rounded-full hover:scale-110 transition-all shadow-sm ${
                                        isInWishlist(product.id) ? "bg-red-500 text-white" : "bg-white/90 text-black"
                                    }`}
                                >
                                    <IconHeart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                                </button>
                           </div>

                           <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                              <div className="flex justify-between items-center text-sm">
                                 <span className="font-medium text-charcoal truncate pr-2">
                                     {v?.displayName || product.shortDescription || v?.variantName}
                                 </span>
                                 <span className="font-bold">{currencySymbol}{p.toFixed(0)}</span>
                              </div>
                           </div>
                       </Link>
                    );
                 })}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}
