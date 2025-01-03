import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUIStore } from "../../hooks/useUIStore";

export const FabAdd = () => {
    const { openDateModal } = useUIStore()
    const { setActiveEvents } = useCalendarStore()
    const handleClick = () => {
        setActiveEvents({
            title: "",
            notes: "",
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: "#fafafa",
            user: {
                _id: "123s",
                name: "Augusto",
            },
        })
        openDateModal();
    }
    return (
        <button
            className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 focus:outline-none"
            aria-label="Add"
            onClick={handleClick}
        >
            +
        </button>
    );
};
