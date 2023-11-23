"use client"

import { CartProductType, SelectedImgType } from "./ProductDetails"

type Props = {
    images: SelectedImgType[],
    cartProduct: CartProductType,
    handleColorSelect: (value: SelectedImgType) => void, 
}

const SetColor = ({ images, cartProduct, handleColorSelect}: Props) => {
  return (
    <div>
        <div className=" flex gap-4 items-center">
            <span className=" font-semibold">COLOR:</span>
            <div className=" flex gap-1">
                {images.map((image) => {
                    return (
                        <div className={` h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${cartProduct.selectedImg.color === image.color ? "border-[1.5px]" : "border-none"}`} key={image.color} onClick={() => handleColorSelect(image)}>
                            <div className=" h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer" style={{background: image.colorCode}}></div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default SetColor