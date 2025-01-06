import { IoIosExit } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useAuthStore } from "../../hooks";


export const NavBar = (): JSX.Element => {
    const { logoutUser, user } = useAuthStore()
    return (
        <header>
            <div className="w-full p-2 flex justify-between items-center bg-gray-800 text-white">
                <div className="flex items-center mx-2">
                    <IoCalendarClearOutline size={20} />
                    <h1 className="font-medium text-sm mx-2">{user.name}</h1>
                </div>

                <button className="w-24 h-7 flex items-center 
                justify-center font-medium border border-dashed 
                border-red-600 text-red-600 rounded-md"
                    onClick={logoutUser}
                >

                    <IoIosExit size={16} />
                    <span className="text-xs mx-2">salir</span>
                </button>
            </div>
        </header>
    );
};
