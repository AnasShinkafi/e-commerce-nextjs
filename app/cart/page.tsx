import Container from '@/components/Container'
import React from 'react'
import CartClient from './CartClient'
import { getCurrentUser } from '@/actions/getCurrentUser'

type Props = {
   
}

const CartPage = async (props: Props) => {
  const currentUser = await getCurrentUser();

  return (
    <div className='pt-8'>
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  )
}

export default CartPage