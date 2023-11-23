import { getCurrentUser } from "@/actions/getCurrentUser";
import { CartProductType } from "@prisma/client";
import { NextResponse } from "next/server";
import { it } from "node:test";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (item: CartProductType[]) => {
  const totalPrice = item.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;

    return acc + itemTotal;
  }, 0);

  const price: any = Math.floor(totalPrice);

  return price;
};

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await req.json();
  const { item, payment_intent_id } = body;
  const total = calculateOrderAmount(item) * 100;
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    product: item,
  };

  if (payment_intent_id) {
    // update the order
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (current_intent) {
      const update_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );
      // update the order
      const [existing_order, update_order] = await Promise.all([
        prisma?.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma?.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: item,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.error();
      }
      return NextResponse.json({ paymentIntent: update_intent });
    }
  } else {
    // create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    // create the order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma?.order.create({
      data: orderData,
    });

    return NextResponse.error();
  }
}
