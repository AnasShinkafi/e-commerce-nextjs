"use client"

import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
    id: string;
    label: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
}

const CustomCheckbox = ({id, label, disabled, register}: Props) => {
  return (
    <div className=" w-full flex flex-row items-center gap-2">
        <input id={id} disabled={disabled} {...register(id,)} placeholder="" className=" cursor-pointer" />
        <label htmlFor={id} className=" font-medium cursor-pointer">{label}</label>
    </div>
  )
}

export default CustomCheckbox