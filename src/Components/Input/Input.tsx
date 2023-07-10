import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";
interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  register: any;
  label: string;
}
const Input: React.FC<Props> = ({
  errorMessage,
  placeholder,
  className,
  type,
  name,
  register,
  label,
}) => {
  return (
    <div className="w-full items-center">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        {...register}
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
      />
      <p className="text-red-600 max-h-6 min-h-[25px]">{errorMessage}</p>
    </div>
  );
};

export default Input;
