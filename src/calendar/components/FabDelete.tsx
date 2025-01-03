import { useCalendarStore } from "../../hooks/useCalendarStore";
import { TiDeleteOutline } from "react-icons/ti";

export const FabDelete = () => {
    const { onDeleteEvent, hasEventSelect } = useCalendarStore()
    const handleDelete = async () => {
        if (hasEventSelect) {
            await onDeleteEvent();
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
