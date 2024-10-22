import AdminCategory from '@/components/AdminCategory';
import prisma from '@/utils/connection';
import React from 'react'

const CategoryPage = async () => {
    const query = {
        take: 10,
        skip: 0,
    }
    const catList = await prisma.category.findMany(query) 

    return <div className="w-full flex flex-col min-h-screen mx-2 md:mx-12">
      <AdminCategory catList={catList} />
    </div>;
}

export default CategoryPage