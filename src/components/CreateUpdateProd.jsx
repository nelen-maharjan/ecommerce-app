"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import FormInput from "./FormInput";
import SelectForm from "./SelectForm";
import { getCategories } from "@/services/categories";
import { UploadDropzone } from "@/lib/uploadthing";
import { addUpdatePost } from "@/services/posts";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

export function CreateUpdateProd({ children, product }) {
  const form = useForm();
  const [getCat, setCat] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if(product?.images) setImages(product.images)
    categories();
  }, []);
  const categories = async () => {
    const res = await getCategories();
    setCat(res.result);
  };

  const handleSubmit = async (formData) => {
    const categoryId = form.getValues().categoryId || product.categoryId;
    const res = await addUpdatePost(formData, images, categoryId, product?.id)
    console.log("images", images);
    
    if(res?.result){
      toast({
        title: `Product ${product?.id ? 'updated' : 'created'} successfully.`
      })
    }else{
      toast({
        title: "Product not created!"
      })
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action={handleSubmit}>
            <div className="grid gap-2 py-2">
              
              <FormInput
                id="name"
                label="Name"
                placeholder="Product name"
                type="text"
                defaultValue={product?.name || ''}
                className="h-10"
              />
              <FormInput
                id="description"
                label="Description"
                placeholder="Product description"
                type="text"
                defaultValue={product?.description || ''}
                className="h-16"
              />
              <FormInput
                id="price"
                label="Price"
                placeholder="Enter price"
                type="number"
                defaultValue={product?.price || ''}
                className="h-10"
              />
              <SelectForm
                id="categoryId"
                label="Select Category"
                placeholder="Select Category"
                list={getCat}
                control={form.control}
              />
              {!images?.length ? (
                <UploadDropzone
                  endpoint="imageUploader"
                  appearance={{
                    button:
                      "ut-uploading:cursor-not-allowed bg-slate-600 mt-2 w-full text-xl after:bg-orange-400 max-w-[700px]",
                    allowedContent: "hidden",
                  }}
                  onClientUploadComplete={(res) => {
                    setImages(res);
                  }}
                  onUploadError={(error) => {
                    alert(`ERROR ${error.message}`);
                  }}
                />
              ) : (
                <div className="flex items-center gap-2">
                  {images?.map((img, index) => (
                    <div key={index}>
                      <Image
                        src={img?.url || img}
                        width={100}
                        height={80}
                        alt="category-img"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
