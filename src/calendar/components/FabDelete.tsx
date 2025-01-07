import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { TiDeleteOutline } from "react-icons/ti";

export const FabDelete = () => {
    const { onDeleteEvent, hasEventSelect, activeEvent } = useCalendarStore()
    const user = useAuthStore().user
    const handleDelete = async () => {
        if (hasEventSelect && activeEvent?.user._id === user?.uid) {
            await onDeleteEvent(activeEvent!);
        } else {
            Swal.fire("Error", "No tienes permisos para eliminar este evento", "error");
        }
    }
    return (
        <button
            className="fixed bottom-4 left-4 w-14 h-14 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 focus:outline-none"
            aria-label="Add"
            onClick={handleDelete}
            style={{
                display: hasEventSelect ? '' : "none",
            }}
        >
            <TiDeleteOutline />

        </button>
    );
};
