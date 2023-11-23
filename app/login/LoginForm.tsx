"use client"

import Button from "@/components/Button"
import Heading from "@/components/Heading"
import Input from "@/components/input/Input"
import { SafeUser } from "@/types"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { AiOutlineGoogle } from "react-icons/ai"

type Props = {
    currentUser: SafeUser | null;
}

const LoginForm = ({currentUser}: Props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        if(currentUser) {
            router.push(`/cart`);
            router.refresh();
        }
    },[currentUser, router]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if(callback?.ok) {
                router.push('/cart');
                router.refresh();
                toast.success('Logged in');   
            } 
            if(callback?.error) {
                toast.error(callback.error)
            } 
        });
    };

    if(currentUser) {
        return <p className=" text-center">Logged in, Redirecting...</p>
    }
  return (
    <>
        <Heading title="Login In to E~Shop" />
        <Button outline label="Continue With Google" icon={AiOutlineGoogle} onClick={() => {signIn('google')}} />
         <hr className=" bg-slate-300 w-full h-px" />
        <Input id="email" label="email" disabled={isLoading} register={register} errors={errors} required />
        <Input id="password" label="password" disabled={isLoading} register={register} errors={errors} required type="password"/>
        <Button label={isLoading ? "Loading" : "Login"} onClick={handleSubmit(onSubmit)} />
        <p className=" text-sm">Don not have an account?{" "}
            <Link className=" underline" href={'/register'}>Sign Up</Link>
        </p>
    </>
  )
}

export default LoginForm