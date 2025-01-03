import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { addEvent, setActiveEvent, updateEvent, deleteEvent } from "../store/calendar/calendarSlice";

export interface User {
  _id: string;
  name: string;
}

export interface Event {
  _id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: User;
}

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar);
  const setActiveEvents = (calendarEvent: Event) => {
    dispatch(setActiveEvent(calendarEvent));
  };
  const saveCalendart = async (calendarEvent: Partial<Event>) => {
    if (!calendarEvent.title || !calendarEvent.start || !calendarEvent.end || !calendarEvent.user) {
      console.error("Error: Missing required properties in calendarEvent");
      return;
    }

    if (calendarEvent._id) {
      await dispatch(
        updateEvent({
          ...calendarEvent,
          title: calendarEvent.title || "Untitled Event",
          notes: calendarEvent.notes || "",
          start: calendarEvent.start || new Date(),
          end: calendarEvent.end || new Date(),
          user: calendarEvent.user || { _id: "default", name: "Anonymous" },
        })
      );
    } else {
      await dispatch(
        addEvent({
          ...calendarEvent,
          _id: new Date().getTime().toString(),
          title: calendarEvent.title,
          start: calendarEvent.start,
          end: calendarEvent.end,
          user: calendarEvent.user || { _id: "default", name: "Anonymous" },
        } as Event)
      );
    }
  };

  const onDeleteEvent = async () => {
    dispatch(deleteEvent());
  };

  return {
    events,
    setActiveEvents,
    activeEvent,
    saveCalendart,
    onDeleteEvent,
    hasEventSelect: !!activeEvent,
  };
};
