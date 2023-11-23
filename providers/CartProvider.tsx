"use client"

import { CartContextProvider } from "@/hooks/useCart"
import React from "react"

type Props = {
    children: React.ReactNode
}

const CartProvider = ({children}: Props) => {
  return (
    <CartContextProvider>{children}</CartContextProvider>
  )
}

export default CartProvider