"use client"

import Heading from "@/components/Heading";
import Status from "@/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";
import { Order } from "@prisma/client";

type Props = {
    order: Order;
};

const OrderDetails = ({order}: Props) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
        <div className="mt-8">
        <Heading title="Order Details" />
        </div>
        <div className="">Order ID: {order.id}</div>
        <div className="">Total Amount <span className="font-bold">{formatPrice(order.amount)}</span>
        </div>
        <div className="flex gap-2 items-center">
            <div className="">Payment status</div>
            <div className="">
                {order.status === 'pending' ? (
                    <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
                ) : 
                    order.status === 'complete' ?
                    <Status text="completed" icon={MdDone} bg="bg-green-200" color="text-green-700" />
                 : (
                    <></>
                )}
            </div>
        </div>

        <div className="flex gap-2 items-center">
            <div className="">Delivery status</div>
            <div className="">
                {order.deliveryStatus === 'pending' ? (
                    <Status text="pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
                ) : 
                    order.deliveryStatus === 'dispatched' ? (
                    <Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
                 ) : order.deliveryStatus === 'delivered' ? (
                    <Status text="delivered" icon={MdDone} bg="bg-green-200" color="text-green-700" />
                 ) : (
                    <></>
                )}
            </div>
        </div>

        <div className="">Date: {moment(order.createdDate).fromNow()}</div>
        <div className="">
            <h2 className="font-semibold mt4 mb-2">Product ordered</h2>
            <div className="grid grid-cols-5 text-sm gap-4 pb-2 items-center">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QTY</div>
                <div className="justify-self-end">TOTAL</div>
            </div>
            {order.products && order.products.map((item: any) => {
                return (
                    <>
                        <OrderItem key={item.id} item={item} />
                    </>
                )
            })}
        </div>
    </div>
  )
}

export default OrderDetails