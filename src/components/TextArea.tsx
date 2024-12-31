import React from "react"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {

}

export const TextArea: React.FC<TextAreaProps> = ({ ...props }): JSX.Element => {
    return (
        <>
            <textarea {...props} className={` block w-full p-4 
             placeholder:text-gray-600 border border-gray-400 text-gray-900 text-sm mb-2 ${props.className}`}></textarea>
        </>
    )
}
