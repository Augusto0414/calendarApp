import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { addEvent, setActiveEvent, updateEvent, deleteEvent, loadEvents } from "../store/calendar/calendarSlice";
import calendartApi from "../api/calendarApi";
import { convertDate } from "../helpers";
import Swal from "sweetalert2";

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
  const { user } = useSelector((state: RootState) => state.auth);
  const setActiveEvents = (calendarEvent: Event) => {
    dispatch(setActiveEvent(calendarEvent));
  };
  const saveCalendart = async (calendarEvent: Partial<Event>) => {
    if (!calendarEvent.title || !calendarEvent.start || !calendarEvent.end || !calendarEvent.user) {
      console.error("Error: Missing required properties in calendarEvent");
      return;
    }
    if (calendarEvent.user?._id !== user.uid) {
      Swal.fire("Error", "usuario no autorizado", "error");
      return;
    }
    try {
      if (calendarEvent._id) {
        calendartApi.put(`/calendar/${calendarEvent._id}`, calendarEvent);
        await dispatch(
          updateEvent({
            ...calendarEvent,
            title: calendarEvent.title || "Untitled Event",
            notes: calendarEvent.notes || "",
            start: calendarEvent.start || new Date(),
            end: calendarEvent.end || new Date(),
            user: { _id: user.uid || "default", name: user.name || "Anonymous" },
          })
        );
        return;
      }
      const { data } = await calendartApi.post("/calendar", calendarEvent);
      await dispatch(
        addEvent({
          ...calendarEvent,
          _id: data.saveCalendar._id,
          user,
        } as Event)
      );
    } catch (error) {
      Swal.fire("Error al guardar", (error as Error).message || "Error desconocido", "error");
    }
  };
  const loadingEvents = async () => {
    try {
      const { data } = await calendartApi.get("/calendar");
      const events = convertDate(data.events).map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
        user: {
          _id: event.user._id || "error in loading user",
          name: event.user.name || "not-found",
        },
        notes: event.notes!,
      }));
      dispatch(loadEvents(events));
      console.log(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const onDeleteEvent = async (calendarEvent: Partial<Event>) => {
    try {
      const { data } = await calendartApi.delete(`/calendar/${calendarEvent._id}`);
      console.log({ data });
    } catch (error) {
      Swal.fire("Error al eliminar", (error as Error).message || "Error desconocido", "error");
    }
    dispatch(deleteEvent());
  };

  return {
    events,
    setActiveEvents,
    activeEvent,
    saveCalendart,
    onDeleteEvent,
    hasEventSelect: !!activeEvent,
    loadingEvents,
  };
};
