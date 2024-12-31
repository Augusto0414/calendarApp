import React from "react"

interface InputProp extends React.InputHTMLAttributes<HTMLInputElement> {

}

export const Input: React.FC<InputProp> = ({ ...props }) => {
    return (
        <input {...props} className={`block w-full p-4 mb-2
             placeholder:text-gray-600 border border-gray-400 text-gray-900 text-sm ${props.className}`} />
    )
}
