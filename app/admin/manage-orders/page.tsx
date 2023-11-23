import Container from "@/components/Container"
import getProducts from "@/actions/getProducts"
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/NullData";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";

const MangeOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();

  if(!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title='Oops! Access denied' />
  }

  return (
    <div className=" pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  )
}

export default MangeOrders