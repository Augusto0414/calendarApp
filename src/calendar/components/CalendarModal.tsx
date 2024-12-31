import React from 'react'
import { IoIosClose } from 'react-icons/io'

interface CalendarProp {
    children: React.ReactNode,
    isOpen: boolean,
    onClose: () => void,
}


export const CalendarModal = ({ isOpen, onClose, children }: CalendarProp) => {
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 z-50 flex justify-center items-center transition-colors 
                ${isOpen ? 'visible bg-black/20' : 'invisible'}`
            }
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-4 transition-all 
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}`
                }
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white 
                    hover:bg-gray-50 hover:text-gray-600"
                >
                    <IoIosClose size={27} />
                </button>
                {children}
            </div>
        </div>
    );
};