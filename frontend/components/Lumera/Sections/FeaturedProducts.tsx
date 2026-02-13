"use client";

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/services/online-services/frontendProductService";
import { type Category } from "@/services/online-services/frontendCategoryService";
import { generateProductUrl } from "@/lib/slugify";
import { useCurrency } from "@/hooks/useCurrency";
import { IconShoppingCart, IconHeart } from "@tabler/icons-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";

interface FeaturedProductsProps {
  initialProducts: Product[];
  categories: Category[];
  title?: string;
  subtitle?: string;
}

export function FeaturedProductsSection({ initialProducts, title = "Trending Now", subtitle = "Our most popular picks this week" }: FeaturedProductsProps) {
  const currencySymbol = useCurrency();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Find first active variant or default to 0
    const activeVariant = product.variants.find(v => v.variantStatus === "active") || product.variants[0];
    if (!activeVariant) return;

    const variantIndex = product.variants.indexOf(activeVariant);
    addToCart(product, variantIndex, undefined);
    // toast.success("Added to cart"); 
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

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
             <h2 className="font-display text-4xl font-bold text-charcoal mb-4">{title}</h2>
             <p className="text-gray-500">{subtitle}</p>
          </div>
          <Link href="/products" className="text-sm font-medium text-black hover:underline underline-offset-4 flex items-center gap-1 group">
             View All Products 
             <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {initialProducts.slice(0, 4).map((product) => {
              const variant = product.variants[0];
              const price = variant?.variantSellingPrice || product.defaultSellingPrice;
              const image = variant?.variantImages?.[0];
              const isWishlisted = isInWishlist(product.id);

              return (
                <Link key={product.id} href={generateProductUrl(product)} className="group block relative">
                   <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
                      {image ? (
                        <Image 
                           src={image} 
                           alt={product.shortDescription} 
                           fill 
                           className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">No Image</div>
                      )}
                      
                      {/* Action Buttons Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-3 bg-gradient-to-t from-black/50 to-transparent pb-6 pt-12">
                          <button 
                            onClick={(e) => handleAddToCart(e, product)}
                            className="bg-white text-black p-3 rounded-full hover:bg-gray-100 hover:scale-110 transition-all shadow-lg active:scale-95"
                            title="Add to Cart"
                          >
                            <IconShoppingCart size={20} stroke={1.5} />
                          </button>
                          <button 
                            onClick={(e) => handleWishlistToggle(e, product)}
                            className={`p-3 rounded-full hover:scale-110 transition-all shadow-lg active:scale-95 ${
                                isWishlisted 
                                ? "bg-red-500 text-white hover:bg-red-600" 
                                : "bg-white text-black hover:bg-gray-100"
                            }`}
                            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                          >
                            <IconHeart size={20} stroke={1.5} fill={isWishlisted ? "currentColor" : "none"} />
                          </button>
                      </div>
                   </div>
                   <div className="flex justify-between items-start">
                      <div>
                         <h3 className="font-medium text-charcoal text-base group-hover:underline decoration-1 underline-offset-4 transition-all line-clamp-1">
                            {variant?.displayName || product.shortDescription || variant?.variantName}
                         </h3>
                         <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                      </div>
                      <span className="font-medium text-black">
                         {currencySymbol}{price.toFixed(0)}
                      </span>
                   </div>
                </Link>
              );
           })}
        </div>
      </div>
    </section>
  );
}
