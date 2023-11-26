"use client"

import { ImageType } from "@/app/admin/add-products/AddProductForm"
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
    item?: ImageType;
    handleFileChange: (value: File) => void;
};

const SelectImage = ({item, handleFileChange}: Props) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length > 0) {
            handleFileChange(acceptedFiles[0]);
        };
    }, [handleFileChange]);

    const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop, 
        accept: {'image/*': [".jpeg", ".png"] },
     });

  return (
    <div {...getRootProps()} className="border-2 border-slate-400 p-2 border-dashed cursor-pointer text-sm font-normal text-slate-400 items-center justify-center flex">
        <input type="text" className="" {...getRootProps()} />
        {isDragActive ? (
            <p>Drop the image here...</p>
        ) : (
            <p className="">{item?.color} Image</p>
        ) }
    </div>
  )
};

export default SelectImage;