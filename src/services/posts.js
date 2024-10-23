'use server';

import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addUpdatePost = async(formData, images, categoryId, id) =>{
    const session = await getSession()

    if(!session?.isLoggedIn){
        return {error: 'User not found'}
    }

    const name = formData.get('name')
    const description = formData.get('description')
    const price = parseInt(formData.get('price'))

    if(!name || !description || !price || !images.length || !categoryId){
        return {error: "Please fill all the fields!"}
    } 

    const imageList = images.length && !id ? images.map(({url}) => url) : images;

    let product;
    try {
        if(id){
            product = await prisma.product.update({
                where: {id},
                data:{name, description, price, images:imageList, categoryId}
            })
        }else{
            product = await prisma.product.create({
                data:{name, description, price, images:imageList, categoryId}
            })
        }
        if(!product){
            return {error: "product not created"}
        }
    } catch (error) {
        return {error: "product not created"}
    }

    revalidatePath('/dashboard/products')
    return {result: product}
}

//update product views
export const updateProductViews = async (id) =>{
    if(!id){
        return {error: "Product not found!"}
    }

    let product;

    try {
        product = await prisma.product.update({
            where:{id},
            data:{views:{increment:1}}
        })
    } catch (error) {
        return {error: "Product not updated!"}
    }

    redirect(`/products/${product?.id}`)
    return {result: product};
}