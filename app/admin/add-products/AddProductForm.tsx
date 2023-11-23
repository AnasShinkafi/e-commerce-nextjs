"use client"

import Button from "@/components/Button"
import Heading from "@/components/Heading"
import CategoryInput from "@/components/input/CategoryInput"
import CustomCheckbox from "@/components/input/CustomCheckbox"
import Input from "@/components/input/Input"
import SelectColor from "@/components/input/SelectColor"
import TextArea from "@/components/input/TextArea"
import firebaseApp from "@/libs/firebase"
import { categories } from "@/utils/Categories"
import { colors } from "@/utils/Colors"
import axios from "axios"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { getFontDefinitionFromNetwork } from "next/dist/server/font-utils"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export type ImageType = {
    color: string;
    colorCode: string;
    image?: File | null;
}

export type UploadedImageType = {
    color: string;
    colorCode: string;
    image: string;
}

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    // const [customValue, setCustomValue] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>();
    const [isProductCreated, setIsProductCreated] = useState(false);
    const {register, handleSubmit, setValue , watch, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '', 
            price: '', 
            brand: '', 
            category: false, 
            inStock: '', 
            images: [],
        }
    });
    const router = useRouter()

    useEffect(() => {
        setCustomValue("image", images);
    }, [images]);

    useEffect(() => {
        if(isProductCreated) {
            reset();
            setImages(null);
            setIsProductCreated(false);
        }
    }, [isProductCreated, reset]);

    const onsubmit: SubmitHandler<FieldValues> = async (data) => {
        // upload image to firebase
       // save the product to mongodb
       setIsLoading(true);
       let uploadedImages: UploadedImageType[] = [];

       if(!data.category) {
        setIsLoading(false);
        return toast.error('Category is not selected!')
       }

       if(!data.images || data.images.length === 0) {
        setIsLoading(false);
        return toast.error('No selected image!');
       }

       const handleImageUploads = async () => {
        toast("Creating product, please wait...");
        try {
            for(const item of data.images) {
                if(item.image) {
                    const fileName = new Date().getTime() + '-' + item.image.name;
                    const storage = getStorage(firebaseApp);
                    const storageRef = ref(storage, `product/${fileName}`);
                    const uploadTask = uploadBytesResumable(storageRef, item.image);

                    await new Promise<void>((resolve, reject) => {
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                switch (snapshot.state) {
                                    case 'paused':
                                        break;
                                    case "running":
                                        break;
                                }
                            },
                            (error) => {
                                reject(error);
                            },
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    uploadedImages.push({
                                        ...item,
                                        image: downloadURL,
                                    })
                                    console.log("File available at", downloadURL); 
                                    resolve()         
                                }).catch((error) => {
                                    reject(error);
                                });
                            }
                        )
                    })
                }
            }
        } catch (error) {
            setIsLoading(false);
            return toast.error("Error handling image uploads.");
        }
       };

       await handleImageUploads();
       const productData = {...data, image: uploadedImages};
       console.log("product data", productData);

       axios.post(`/api/product`, productData).then(() => {
        toast.success('Product created');
        setIsProductCreated(true);
        router.refresh();
       }).catch((error) => {
        toast.error('Something went wrong when saving product to db');
       }).finally(() => {
        setIsLoading(false);
       });
       
    }; 

    const category = watch('category');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(!prev) {
                return [value]
            }

            return [...prev, value]
        })
    }, []);

    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if(prev) {
                const filteredImages = prev.filter((item) => item.color !== value.color);

                return filteredImages;
            }

            return prev;
        })
    }, []);

  return (
    <>
        <Heading title="Add a Product" center />
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
        <Input id="price" label="Price" type="number" disabled={isLoading} register={register} errors={errors} required />
        <Input id="brand" label="Brand" disabled={isLoading} register={register} errors={errors} required />
        <TextArea id="description" label="dDescription" disabled={isLoading} register={register} errors={errors} required />
        <CustomCheckbox id="inStock" register={register} label="This Product is in stock"/>
        <div className=" w-full font-medium">
            <div className=" mb-2 font-semibold">Select a Category</div>
            <div className=" grid grid-cols-2 md:grid-cols-3 max-h-[50vh] gap-3 overflow-y-auto">
                {categories.map((item) => {
                    if(item.label === "All") {
                        return null ;
                    }
                    return (
                        <div className=" col-span" key={item.label}>
                            <CategoryInput onClick={(category) => setCustomValue('category', category)}  selected={category === item.label} label={item.label} icon={item.icon} />
                        </div>
                    )
                })}
            </div>
        </div>
        <div className=" w-full flex flex-col flex-wrap gap-4">
            <div className="">
                <div className=" font-bold">
                    Select the available product colors and upload their images,
                </div>
                <div className=" text-sm">
                    You must upload an image for each of the color selected otherwise your color selection will be ignored.
                </div>
            </div>
            <div className=" grid grid-cols-2 gap-3">
                {colors.map((item, index) => {
                    return <SelectColor key={index} item={item} addImageToState={addImageToState} removeImageFromState={removeImageFromState} isProductCreated={isProductCreated} />
                })}
            </div>
        </div>
        <Button label={isLoading ? 'Loading...' : 'Add Product' } onClick={handleSubmit(onsubmit)} />
    </>
  )
}

export default AddProductForm