import React from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children?: React.ReactNode
}


export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
    return (
        <label {...props} className={`block text-sm  text-gray-800 font-medium ${props.className}`}>
            {children}
        </label>
    )
}
