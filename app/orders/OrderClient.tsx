"use client"

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/components/Heading";
import Status from "@/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/components/ActionBtn";
import { useRouter } from "next/navigation";
import moment from "moment";

type Props = {
    orders: ExtendedOrder[];
};

type ExtendedOrder = Order & {
  user: User
};

const OrdersClient = ({ orders }: Props) => {
    const router = useRouter();

    let rows: any = []
    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createdDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            };
        });
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'customer', headerName: 'Customer Name', width: 130 },
        {
            field: 'amount', headerName: 'Amount(USD)', width: 130, renderCell: (params) => {
                return (
                    <div className=" font-bold text-slate-800">{params.row.amount}</div>
                );
            }
        },
        {field: 'paymentStatus', headerName: 'Payment Status', width: 130, renderCell: (params) => {
          return (
              <div>
                {params.row.paymentStatus === 'pending' ? (
                <Status text="is pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
                ): 
                params.row.paymentStatus === 'complete' ? (<Status text="complete" icon={MdDone} bg="bg-purple-200" color="text-purple-700" />
                ) : ( 
                <></> 
                )}
                </div>
          );
      },
     },
     {field: 'deliveryStatus', headerName: 'Delivery Status', width: 130, renderCell: (params) => {
      return (
          <div>
            {params.row.deliveryStatus === 'pending' ? ( <Status text="is pending" icon={MdAccessTimeFilled} bg="bg-slate-200" color="text-slate-700" />
            ): 
            params.row.deliveryStatus === 'dispatched' ? (<Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200" color="text-purple-700" />
            ): params.row.deliveryStatus === 'delivered' ? (
              <Status text="dispatched" icon={MdDeliveryDining} bg="bg-green-200" color="text-green-700" />
            ) : (
            <></>
            ) }
            </div>
      );
  },
},
{field: 'date', headerName: "Date", width: 130},
        {
            field: 'action', headerName: 'Action', width: 100, renderCell: (params) => {
                return (
                    <div className=" flex justify-between gap-4 w-full">
                        
                        <ActionBtn icon={MdRemoveRedEye} onClick={() => {router.push(`order/${params.row.id}`)}} />
                    </div>
                );
            }
        },
    ];

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className=" mb-4 mt-8">
                <Heading title="Manage Orders" />
            </div>
            <div className="" style={{ height: 600, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default OrdersClient;