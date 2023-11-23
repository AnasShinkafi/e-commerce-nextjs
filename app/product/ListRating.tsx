"use client"

import moment from "moment";
import { Rating } from "@mui/material";
import Heading from "@/components/Heading";
import Avatar from "@/components/Avatar";

type Props = {
    product: any;
}

const ListRating = ({product}: Props) => {

    if(product.reviews.length === 0) return null
  return (
    <div>
        <Heading title="Product Review" />
        <div className=" text-sm mt-2">
            {product.reviews && product.reviews.map((review: any) => {
                return (
                    <div className=" max-w-[300px]" key={review.id}>
                        <div className=" flex gap-2 items-center">
                        <Avatar src={review.user.image} />
                        <div className=" font-semibold">{review?.user.name}</div>
                        <div className=" font-light">{moment(review.createdDate).fromNow()}</div>
                        </div>
                        <div className=" mt-2">
                            <Rating value={review.rating} readOnly />
                            <div className=" ml-2">{review.comment}</div>
                            <hr className=" mt-4 mb-4" />
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ListRating