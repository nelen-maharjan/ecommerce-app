import Carousels from "@/components/Carousels";
import CategoryList from "@/components/CategoryList";
import Enhancement from "@/components/Enhancement";
import Featured from "@/components/Featured";
import Flashsales from "@/components/Flashsales";
import { Separator } from "@/components/ui/separator";
import prisma from "@/utils/connection";

export default async function Home() {
  const query = {
    take:6,
    skip:0,
  }
  const [products, popularProducts, categories] = await prisma?.$transaction([
    prisma.product.findMany(query),
    prisma.product.findMany({...query, orderBy:{views:'desc'}}),
    prisma.order.findMany(query),
  ]);
  return (
    <div className="">
      <Carousels />
      <div className='px-[10%]'>
        <Flashsales 
        title="Today's" 
        heading="Flash sales" 
        products={products} 
        />
        <Separator className='my-4' />
        <CategoryList />
        <Enhancement className='my-4' />
        <Flashsales 
        title="Our Products" 
        heading="Explore Our Products" 
        />
        <Featured />
      </div>
    </div>
  );
}
