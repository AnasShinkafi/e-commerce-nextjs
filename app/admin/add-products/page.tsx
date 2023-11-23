import Container from '@/components/Container'
import FormWrap from '@/components/FormWrap'
import React from 'react'
import AddProductForm from './AddProductForm'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title='Oops! Access denied' />
  }
  return (
    <div className=' p-8'>
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  )
}

export default AddProducts