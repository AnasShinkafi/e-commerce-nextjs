"use client"
import { useCart } from '@/hooks/useCart'
import { Elements } from '@stripe/react-stripe-js'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CheckoutForm from './CheckoutForm'
import Button from '@/components/Button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

type Props = {}

const CheckoutClient = ({}: Props) => {
    const {cartProducts, paymentIntent, handleSetPaymentIntent} = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const router = useRouter(); 

    useEffect(() => {
        // create a paymentIntent as soon as the page load
        if(cartProducts) {
            setLoading(true);
            setError(false);

            fetch(`/api/create-payment-intent`, {
                method: "POST",
                headers: {"Content-Type": 'Application/json'},
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent,
                })
            }).then((res) => {
                setError(false);
                if(res.status === 401) {
                    return router.push(`/login`)
                }

                return res.json()
            }).then((data) => {
                setClientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id);
            }).catch((error) => {
                setError(true);
                toast.error("Something went wrong")
            })
        };
    },[cartProducts, handleSetPaymentIntent, paymentIntent, router]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: 'floating',
        },
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value)
    }, []);

  return (
    <div className=' w-full'>
        {clientSecret && cartProducts && (
            <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} handleSetPaymentSuccess={handleSetPaymentSuccess} />
        </Elements>
        )}
        {loading && (
            <div className=" text-center">Loading Checkout...</div>
        )}
        {error && (
            <div className=" text-center text-rose-500">Something went wrong...</div>
        )}
        {paymentSuccess && (
            <div className=" flex items-center flex-col gap-4">
                <div className="
                text-teal-500 text-center">Payment Success</div>
                <div className=" max-w-[220px] end-full">
                    <Button label='View Your Order' onClick={() => router.push(`/orders`)} />
                </div>
            </div>
        )}
    </div>
  )
}

export default CheckoutClient