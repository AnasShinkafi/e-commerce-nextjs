"use client"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { CiShoppingCart } from 'react-icons/ci'

type Props = {}

const CartCount = (props: Props) => {
    const {cartTotalQty} = useCart()
    const router = useRouter()
  return (
    <div className=" relative cursor-pointer" onClick={() => router.push(`/cart`)}>
        <div className=" text-3xl">
            <CiShoppingCart />
        </div>
        <span className=" absolute top-[-10xp] right-[-10px] bg-slate-700 h-6 w-6 rounded-full flex items-center justify-center text-sm">
            {cartTotalQty}
        </span>
    </div>
  )
}

export default CartCount