export const dynamic = "force-dynamic";
import Branch from "@/components/homepage/Branch";
import Footer from "@/components/homepage/Footer";
import HeroBanner from "@/components/homepage/HeroBanner";
import HowItWorks from "@/components/homepage/HowItWorks";
import ProductList from "@/components/homepage/ProductList";
import BlogCard from "@/components/modules/homepage/BlogCard";



// w-full md:w-11/12 mx-auto

export default async function Home() {

  return (
    <div className="">
      <HeroBanner 
        title="Your Health, Delivered to Your Door."
        subtitle="Access 20,000+ authentic medicines and healthcare products from certified pharmacies across the country."
        ctaText="Shop Now"
        ctaLink="/medicine"
        imageUrl="../../assests/banner.jpg" 
      />
      <ProductList></ProductList>
      <HowItWorks></HowItWorks>
      <Branch></Branch>
      
    </div>
  );
}
