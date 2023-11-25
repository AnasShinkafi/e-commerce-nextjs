"use client"

import { CartProductType, SelectedImgType } from "@/app/product/[id]/ProductDetails"
import Image from "next/image"

type Props = {
    cartProduct: CartProductType,
    product: any,
    handleColorSelect: (value: SelectedImgType) => void,
}

const ProductImage = ({ cartProduct, product, handleColorSelect}: Props) => {
  return (
    <div className="grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px">
            {product.image.map((image: SelectedImgType) => {
                return (
                    <div className={`relative w-[80%] aspect-square rounded border-teal-300 ${cartProduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none"}` } key={image.color} onClick={() => handleColorSelect(image )}>
                        <Image src={image.image} alt={image.color} fill className="object-contain" />
                    </div>
                )
            })}
        </div>
        <div className="col-span-5 relative aspect-square">
            <Image src={cartProduct.selectedImg.image} fill className="w-full h-full object-contain ax-h-[500px] min-h-[300px] sm:min-h-[400px]" alt={cartProduct.name} />
        </div>
    </div>
  )
}

export default ProductImage