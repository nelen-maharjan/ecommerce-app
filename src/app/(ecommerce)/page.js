import Carousels from "@/components/Carousels";
import CategoryList from "@/components/CategoryList";
import Enhancement from "@/components/Enhancement";
import Flashsales from "@/components/Flashsales";
import { Separator } from "@/components/ui/separator";
import prisma from "@/utils/connection";  // Import the Prisma client

export default async function Home() {

  if (!prisma) {
    console.error('Prisma client is not initialized.');
    return <div>Error: Prisma client is not available.</div>;
  }

  const query = {
    take: 6,
    skip: 0,
  };

  try {
    const [products, popularProducts, categories] = await prisma.$transaction([
      prisma.product.findMany(query),
      prisma.product.findMany({ ...query, orderBy: { views: 'desc' } }),
      prisma.category.findMany(query),
    ]);

    return (
      <div className="">
        <Carousels />
        <div className="px-[10%]">
          <Flashsales title="Today's" heading="Flash sales" products={products} />
          <Separator className="my-4" />
          <CategoryList categories={categories} />
          <Enhancement className="my-4" />
          <Flashsales title="Our Products" heading="Explore Our Products" products={popularProducts} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="error">
        <h2>Something went wrong while loading the page. Please try again later.</h2>
      </div>
    );
  }
}
