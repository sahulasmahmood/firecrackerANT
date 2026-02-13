import { HeroSection } from '@/components/Lumera/Sections/HeroSection';
import { FeaturedProductsSection } from '@/components/Lumera/Sections/FeaturedProducts';
import { NewArrivalsSection } from '@/components/Lumera/Sections/NewArrivals';
import { EditorialSection } from '@/components/Lumera/Sections/Editorial';
import { NewsletterSection } from '@/components/Lumera/Sections/Newsletter';
import { generatePageMetadata } from '@/lib/seo';
import { 
  fetchBanners, 
  fetchCategories, 
  fetchHomepageProducts 
} from '@/lib/server-fetch';

export async function generateMetadata() {
  return await generatePageMetadata({
    pagePath: "/",
    defaultTitle: "Home - ECommerce Store",
    defaultDescription: "Welcome to our online store. Shop quality products at great prices.",
    defaultKeywords: "ecommerce, online shopping, home, products",
  });
}

export default async function Home() {
  // Fetch all data in parallel on server-side using server-fetch utilities
  const [banners, categories, bestsellerProducts, trendingProducts, newArrivalProducts, hotDealsProducts] = await Promise.all([
    fetchBanners(),
    fetchCategories(),
    fetchHomepageProducts({ badge: 'Bestseller', limit: 10 }),
    fetchHomepageProducts({ badge: 'Trending', limit: 10 }),
    fetchHomepageProducts({ badge: 'New Arrival', limit: 10 }),
    fetchHomepageProducts({ badge: 'Hot Deal', limit: 10 }),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection banners={banners} />
      
      <FeaturedProductsSection 
        initialProducts={bestsellerProducts} 
        categories={categories}
        title="Best Sellers"
        subtitle="Our most popular products this week"
      />
      
      <NewArrivalsSection products={newArrivalProducts} />
      
      <EditorialSection />
      
      <FeaturedProductsSection 
        initialProducts={trendingProducts} 
        categories={categories}
        title="Trending Now"
        subtitle="What everyone is talking about"
      />

      <NewsletterSection />
    </div>
  );
}
