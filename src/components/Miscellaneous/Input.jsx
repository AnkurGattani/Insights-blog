import React, { useId, forwardRef } from 'react'

const Input = forwardRef(function Input({ label, type = 'text', className = '', ...props }, ref) {
  const id = useId();
  return (
    <div className='w-full mt-2'>
      {
        label && <label className='block mb-1 pl-1 text-sm font-medium' htmlFor={id}>
          {label}
        </label>
      }
      <input type={type} className={`w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-black focus:border-2 ${className}`} id={id} ref={ref} {...props}
      />
    </div>
  )
}
);

export default Input